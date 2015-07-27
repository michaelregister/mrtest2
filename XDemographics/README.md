# lba.Demographics

this is a demographic layer manager intended to work with a leaflet map and the xceligent geoserver/ api application.

**Usage**
```html
<div id="sidebar-one"><demographicslayers></demographicslayers></div>
    <leaflet defaults="defaults" center="center" height="480px" width="640px"></leaflet>
```

to  allow selecting and showing in a popup data about a selected geographical area Attach to the "ShowLayerPopup" event using 
```javascript
  $rootScope.$on('ShowLayerPopup', function (event, data) {
  ...
  });
```

This will give you access to the data returned by BetterWMS. 

The data parameter contains several different objects: 
* SelectedFeature
* Raw feature data
* Map reference
* DemographicLayersService reference
* latlng of click event

Here is a working example of using the ShowLayerPopup event
```javascript
   $rootScope.$on('ShowLayerPopup', function (event, data) {

        var SelectedFeature, feature, map, dls, latlng;
        SelectedFeature = data[0];
        feature = data[1];
        map = data[2];
        dls = data[3];
        latlng = data[4];

        console.log("ShowLayerPopup called");
        var pop = "<div>";
        switch (dls.currentFilter.DisplayName)
        {
            case "State":
                pop += "<h1>" + feature.properties.name + "</h1>";
                break;
            case "County":
                pop += "<h1>" + feature.properties.name + "</h1>";
                break;
            case "Zip Code":
                pop += "<h1>" + "AreaName: " + feature.properties.po_name + "</h1></br><h1>";
                pop += "State: " + feature.properties.state + "</h1></br><h1>";
                pop += "Zip: " + feature.properties.zip + "</h1>";
                break;
            case "Block Group":
                pop += "<h1>" + "BlockGroup ID:" + feature.properties.geoname + "</h1>";
                break;
        }
        pop += "</div>";
        var ele = angular.element(pop);
        var newScope = dls.$scope.$new();
        var compiled = dls.$compile(ele)(dls.$scope);
        var popup1 = L.popup().setLatLng(latlng)
            .setContent(compiled[0]);
        popup1.openOn(map);
    });
```
