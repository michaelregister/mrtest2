/// <reference path="../../scripts/typings/leaflet/leaflet.d.ts" />
var app;
(function (app) {
    "use strict";
    var DemographicsLayersService = (function () {
        // static $inject = ['$rootScope','$http',  'leafletData', 'webMap', '$compile','$q'];
        function DemographicsLayersService($rootScope, $http, leafletData, webMap, $compile, $q) {
            //  DemographicsLayersService.setinstance(this);
            var _this = this;
            this.$rootScope = $rootScope;
            this.$http = $http;
            this.leafletData = leafletData;
            this.webMap = webMap;
            this.$compile = $compile;
            this.$q = $q;
            this.charExt = "s";
            // static DLS: any;
            // static setinstance(dls)
            // {
            //     this.DLS = dls;
            // }
            // static getinstance()
            // {
            //    return this.DLS;
            // }
            this.popupfunc = function (err, latlng, data) {
                if (data.features[0] === undefined) {
                    return;
                }
                var dls = _this;
                dls.leafletData.getMap().then(function (map) {
                    if (dls.webMap.SelectedFeature) {
                        if (map.hasLayer(dls.webMap.SelectedFeature)) {
                            map.removeLayer(dls.webMap.SelectedFeature);
                        }
                    }
                    var myStyle = {
                        "color": "#7CBF51",
                        "weight": 5,
                        "opacity": 0.65
                    };
                    dls.webMap.SelectedFeature = L.geoJson(data.features[0], myStyle);
                    dls.webMap.SelectedFeature.addTo(map);
                    dls.$rootScope.$emit("ShowLayerPopup", [dls.webMap.SelectedFeature, data.features[0], map, dls, latlng]);
                });
            };
        }
        DemographicsLayersService.prototype.getstyleExt = function (filter) {
            var value = filter.Name;
            if (filter.LayerName === "ZoomLayers") {
                value += "_" + this.charExt;
            }
            return value;
        };
        DemographicsLayersService.prototype.GetFiltersAsync = function () {
            var filters = this.$q.defer();
            this.$http.get(Api + "api/filter/getDemographicFilters").success(function (data) {
                console.log(data);
                filters.resolve(data);
            }).error(function (data, status) {
                var error = "Error loading demographicLayers.";
                filters.reject(error);
                console.log(error);
            });
            return filters.promise;
        };
        DemographicsLayersService.prototype.ApplyZoom = function (filter) {
            if (filter === undefined) {
                return;
            }
            var dls = this;
            this.leafletData.getMap().then(function (map) {
                if (dls.activeWMS !== undefined) {
                    if (map.hasLayer(dls.activeWMS)) {
                        dls.activeWMS._container.className += " removed-item";
                        $(dls.activeWMS._container).bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                            map.removeLayer(dls.activeWMS);
                        });
                        dls.$rootScope.$broadcast("DemographicsRemoved");
                    }
                }
                if (dls.webMap.SelectedFeature) {
                    if (map.hasLayer(dls.webMap.SelectedFeature)) {
                        map.removeLayer(dls.webMap.SelectedFeature);
                    }
                }
                if (filter.isApplied) {
                    if (dls.currentFilter !== undefined) {
                        if (filter !== dls.currentFilter) {
                            dls.currentFilter.isApplied = false;
                        }
                    }
                    var cqlfilter = null;
                    if (filter.newRange[0] != -1 && filter.newRange[1] != -1) {
                        cqlfilter = dls.getstyleExt(filter) + " between " + filter.newRange[0] + " and " + filter.newRange[1];
                    }
                    dls.activeWMS = dls.webMap.getWMSLayer(map, "xceligent:" + dls.getLayerName(filter.LayerName), dls.popupfunc, .6, dls.getstyleExt(filter), cqlfilter);
                    dls.currentFilter = filter;
                    dls.$rootScope.$broadcast("createlegend", [dls.getstyleExt(filter), dls.getLayerName(filter.LayerName), filter.DisplayName]);
                }
            });
        };
        DemographicsLayersService.prototype.setZoomLayer = function (map) {
            var zoomlevel = map.getZoom();
            switch (zoomlevel) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    if (this.charExt !== "s") {
                        // alert("Change to state");
                        this.charExt = "s";
                        this.ApplyZoom(this.currentFilter);
                    }
                    break;
                case 7:
                case 8:
                case 9:
                    if (this.charExt !== "c") {
                        // alert("Change to county");
                        this.charExt = "c";
                        this.ApplyZoom(this.currentFilter);
                    }
                    break;
                case 10:
                case 11:
                case 12:
                    if (this.charExt !== "z") {
                        // alert("Change to zip");
                        this.charExt = "z";
                        this.ApplyZoom(this.currentFilter);
                    }
                    break;
                case 13:
                case 14:
                case 15:
                    if (this.charExt !== "b") {
                        // alert("Change to blockgroup");
                        this.charExt = "b";
                        this.ApplyZoom(this.currentFilter);
                    }
                    break;
            }
        };
        DemographicsLayersService.prototype.endsWith = function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        };
        DemographicsLayersService.prototype.getLayerName = function (current) {
            var value = "";
            if (current === "ZoomLayers") {
                switch (this.charExt) {
                    case "s":
                        value = "state_data";
                        this.geoType = "State";
                        break;
                    case "c":
                        value = "county_data";
                        this.geoType = "County";
                        break;
                    case "z":
                        value = "zip_data";
                        this.geoType = "Zip code";
                        break;
                    case "b":
                        value = "blockgroup_data";
                        this.geoType = "Block groups";
                        break;
                    default:
                        value = "state_data";
                        this.geoType = "State";
                        break;
                }
            }
            else {
                value = current;
            }
            return value;
        };
        return DemographicsLayersService;
    })();
    app.DemographicsLayersService = DemographicsLayersService;
    angular.module("lba.Demographics").service("demographicsLayersService", DemographicsLayersService);
})(app || (app = {}));
// angular.module('app').factory('demographicsLayersService',($rootScope,$http, leafletData, webMap, $compile, $q)
//    => { return new demographics.DemographicsLayersService($rootScope,$http, leafletData, webMap, $compile, $q); }); 
//# sourceMappingURL=demographicsLayersService.js.map