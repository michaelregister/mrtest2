/// <reference path="typings/leaflet.tilelayer.ts" />
var AppName;
(function (AppName) {
    var moduleName;
    (function (moduleName) {
        "use strict";
        var webMap = (function () {
            function webMap($rootScope) {
                this.$rootScope = $rootScope;
                this.SelectedFeature = this.$rootScope.selectedFeature;
                var vm = this;
            }
            webMap.prototype.getWMSLayer = function (map, layername, popupfunction, opacity, style) {
                if (!style)
                    style = '';
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
            };
            webMap.prototype.getWMS = function (map, url, layername, popupfunction, opacity, style) {
                if (!style)
                    style = '';
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
            };
            webMap.$inject = ["$rootScope"];
            return webMap;
        })();
        angular.module(NameSpace).factory('webMap', function ($rootScope) {
            return new webMap($rootScope);
        });
    })(moduleName = AppName.moduleName || (AppName.moduleName = {}));
})(AppName || (AppName = {}));
//# sourceMappingURL=webMap.service.js.map