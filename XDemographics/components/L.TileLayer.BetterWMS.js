L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
    Popup: function (err,latlng,data)
    {
        console.log("Popup needs to be overridden");

        showResults1(err, EVT.latlng, data);
    },

    onAdd: function (map) {
        pp = L.Util.bind(this.Popup, this);
        // Triggered when the layer is added to a map.
        //   Register a click listener, then do all the upstream WMS things
        L.TileLayer.WMS.prototype.onAdd.call(this, map);
        map.on('click', this.getFeatureInfo, this);
    },

    onRemove: function (map) {
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        L.TileLayer.WMS.prototype.onRemove.call(this, map);
        map.off('click', this.getFeatureInfo, this);
    },
  
  
    getFeatureInfo: function (evt) {
        EVT = evt;
       // sp = showPopup;
        // Make an AJAX request to the server and hope for the best
        var url = this.getFeatureInfoUrl(evt.latlng),
            showResults = L.Util.bind(this.showGetFeatureInfo, this);
       

        url += '&format_options=callback:' + 'parsebwm';
        $.ajax({
            url: url,
            dataType: "jsonp",
           // success: function (xhr, status, error) {
            //         showResults(error);
            //     },
           // error: function (xhr, status, error) {
           //     showResults(error);
           // }
        });
    },


    getFeatureInfoUrl: function (latlng) {
        // Construct a GetFeatureInfo request URL given a point
        var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
            size = this._map.getSize(),

            params = {
                request: 'GetFeatureInfo',
                service: 'WMS',
                srs: 'EPSG:4326',
                styles: this.wmsParams.styles,
                transparent: this.wmsParams.transparent,
                version: this.wmsParams.version,
                format: this.wmsParams.format,
                bbox: this._map.getBounds().toBBoxString(),
                height: size.y,
                width: size.x,
                layers: this.wmsParams.layers,
                query_layers: this.wmsParams.layers,
                info_format:'text/javascript'// 'text/html'
            };

        params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
        params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

        return this._url + L.Util.getParamString(params, this._url, true);
    },

    showGetFeatureInfo: function (err, latlng, content) {
        if (err) { console.log(err); return; } // do nothing if there's an error

        // Otherwise show the content in a popup, or something.
        L.popup({ maxWidth: 800 })
          .setLatLng(latlng)
          .setContent(content)
          .openOn(this._map);
    }
   
});
var EVT = [];
var pp;
function parsebwm(data, status, xhr) {
    //var err = typeof data === 'string' ? null : data;
    //if (getScope().ShowPopup)
    //{
    //    getScope().ShowPopup(err, EVT.latlng, data);
    //}
    //else
    //showResults1(err, EVT.latlng, data);
    pp(status,EVT.latlng, data);
}

var sp;
var selectedFeature;
function showResults1(err, latlng, data) {
    // if (err) { console.log(err); return; } // do nothing if there's an error
    if (getScope().selectedFeature)
        if (getScope().MYMAP.hasLayer(getScope().selectedFeature))
        {
            getScope().MYMAP.removeLayer(getScope().selectedFeature);
        }

    content =  '<h1>' +
       data.features[0].properties.name
       + '</h1>';
    var myStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    };
    getScope().selectedFeature = L.geoJson(data.features[0], { style: myStyle });
    getScope().selectedFeature.addTo(getScope().MYMAP);
    // Otherwise show the content in a popup, or something.
    var popup1 = L.popup()
.setLatLng(latlng)
                    .setContent(content);
    
    popup1.openOn(getScope().MYMAP);
}


L.tileLayer.betterWms = function (url, options) {
    var bwms = new L.TileLayer.BetterWMS(url, options);
  //  bwms.Popup = options.Popup;
    return bwms;
};