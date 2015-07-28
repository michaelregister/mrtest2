/// <reference path="../../../scripts/typings/leaflet/leaflet.tilelayer.ts" />
var AppName;
(function (AppName) {
    var moduleName;
    (function (moduleName) {
        "use strict";
        var WebMap = (function () {
            function WebMap($rootScope) {
                this.$rootScope = $rootScope;
                // static $inject = ["$rootScope"];
                this.selectedFeature = this.$rootScope.selectedFeature;
                var vm = this;
            }
            WebMap.prototype.getWMSLayer = function (map, layername, popupfunction, opacity, style, cqlfilter) {
                if (!style) {
                    style = "";
                }
                if (!opacity) {
                    opacity = 0.6;
                }
                if (this.webMapLayer) {
                    if (map.hasLayer(this.webMapLayer)) {
                        map.removeLayer(this.webMapLayer);
                    }
                }
                var url = Geoserver + "/geoserver/xceligent/wms?";
                if (cqlfilter != null) {
                    this.webMapLayer = L.tileLayer.betterWms(url, {
                        layers: layername,
                        CQL_FILTER: cqlfilter,
                        format: "image/png",
                        transparent: true,
                        version: "1.1.0",
                        srs: "EPSG:4326",
                        zIndex: "999",
                        styles: style
                    });
                }
                else {
                    this.webMapLayer = L.tileLayer.betterWms(url, {
                        layers: layername,
                        format: "image/png",
                        transparent: true,
                        version: "1.1.0",
                        srs: "EPSG:4326",
                        zIndex: "999",
                        styles: style
                    });
                }
                this.webMapLayer.Popup = popupfunction;
                // this.$rootScope.ShowPopup = popupfunction;
                this.webMapLayer.options.tiles = true;
                map.addLayer(this.webMapLayer);
                this.webMapLayer.setOpacity(opacity);
                return this.webMapLayer;
            };
            WebMap.prototype.getWMS = function (map, url, layername, popupfunction, opacity, style) {
                if (!style) {
                    style = "";
                }
                if (!opacity) {
                    opacity = 0.6;
                }
                if (this.webMapLayer) {
                    if (map.hasLayer(this.webMapLayer)) {
                        map.removeLayer(this.webMapLayer);
                    }
                }
                this.webMapLayer = L.tileLayer.betterWms(url, {
                    layers: layername,
                    format: "image/png",
                    transparent: true,
                    version: "1.1.0",
                    srs: "EPSG:4326",
                    zIndex: "999",
                    styles: style
                });
                this.webMapLayer.options.tiles = true;
                map.addLayer(this.webMapLayer);
                this.webMapLayer.setOpacity(opacity);
            };
            return WebMap;
        })();
        angular.module("lba.Demographics").factory("webMap", function ($rootScope) {
            return new WebMap($rootScope);
        });
    })(moduleName = AppName.moduleName || (AppName.moduleName = {}));
})(AppName || (AppName = {}));
//# sourceMappingURL=webMap.service.js.map