/// <reference path="typings/leaflet.tilelayer.ts" />
module AppName.moduleName {
    "use strict";

    interface IwebMapScope {
        SelectedFeature: any;
        WebMapLayer: L.ILayer;
    }
    interface IwebMapRootScope extends ng.IRootScopeService
    {
        selectedFeature: any;
        ShowPopup: any;
    }
   
    class webMap implements IwebMapScope {
        static $inject = ["$rootScope"];
        SelectedFeature: any = this.$rootScope.selectedFeature;
        WebMapLayer:any;
        constructor(private $rootScope:IwebMapRootScope) {
            var vm = this;
        }
        
        public getWMSLayer(map:L.Map,layername, popupfunction, opacity, style) {
        if (!style)
            style = ''
        if (!opacity)
            opacity = 0.6;
        if (this.WebMapLayer) {
            if (map.hasLayer(this.WebMapLayer))
                map.removeLayer(this.WebMapLayer);
        }
        var url = Geoserver + '/geoserver/xceligent/wms?';

        this.WebMapLayer = L.tileLayer.betterWms(url, {
            layers: layername,

            format: 'image/png',
            transparent: true,
            version: '1.1.0',
            srs: 'EPSG:4326',
            zIndex: '999',
            styles: style
        });
        this.$rootScope.ShowPopup = popupfunction;
        this.WebMapLayer.options.tiles = true;
        map.addLayer(this.WebMapLayer);
        this.WebMapLayer.setOpacity(opacity);
        return this.WebMapLayer;
    }
           

    public getWMS(map:L.Map,url, layername, popupfunction, opacity, style) {
        if (!style)
            style = ''
        if (!opacity)
            opacity = 0.6;
        if (this.WebMapLayer) {
            if (map.hasLayer(this.WebMapLayer))
                map.removeLayer(this.WebMapLayer);
        }
        this.WebMapLayer = L.tileLayer.betterWms(url, {
            layers: layername,
            format: 'image/png',
            transparent: true,
            version: '1.1.0',
            srs: 'EPSG:4326',
            zIndex: '999',
            styles: style
        });
        this.WebMapLayer.options.tiles = true;
        map.addLayer(this.WebMapLayer);
        this.WebMapLayer.setOpacity(opacity);
    }
    }
    angular.module(NameSpace).factory('webMap',($rootScope) => { return new webMap($rootScope); });
} 