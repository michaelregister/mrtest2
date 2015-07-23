/// <reference path="../../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../../scripts/global.ts" />
var app;
(function (app) {
    "use strict";
    var DemographicsLayers = (function () {
        function DemographicsLayers() {
            this.restrict = "E";
            this.templateUrl = "~/../bower_components/mrtest2/XDemographics/demographicsLayers.html";
            this.controller = ["$scope", "demographicsLayersService", "$http", "leafletData", function ($scope, DemographicsLayersService, $http, leafletData) {
                DemographicsLayersService.$scope = $scope;
                function GetFilters() {
                    $http.get(Api + "api/filter/getDemographicFilters").success(function (data) {
                        console.log(data);
                        $scope.dFilters = data;
                    }).error(function (data, status) {
                        console.log("Error loading demographicLayers.");
                    });
                }
                GetFilters();
                leafletData.getMap().then(function (map) {
                    map.on("zoomend", function (e) {
                        DemographicsLayersService.setZoomLayer(map);
                    });
                });
                $scope.Apply = function (filter) {
                    DemographicsLayersService.ApplyZoom(filter);
                };
            }];
            console.log("DemographicsLayers constructor");
        }
        DemographicsLayers.getInstance = function () {
            return new DemographicsLayers();
        };
        return DemographicsLayers;
    })();
    angular.module(NameSpace).directive("demographicslayers", function () { return DemographicsLayers.getInstance(); });
})(app || (app = {}));
//# sourceMappingURL=DemographicsLayers.js.map