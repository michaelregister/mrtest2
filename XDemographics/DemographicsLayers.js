/// <reference path="../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../scripts/global.ts" />
var app;
(function (app) {
    "use strict";
    var DemographicsLayers = (function () {
        function DemographicsLayers() {
            this.restrict = "E";
            this.templateUrl = "lib/Demographics/demographicsLayers.html";
            this.controller = ["$scope", "demographicsLayersService", "$http", "leafletData", "$attrs", function ($scope, DemographicsLayersService, $http, leafletData, $attrs) {
                DemographicsLayersService.$scope = $scope;
                $scope.HideFilters = function (value) {
                    if (value == null) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                function GetFilters() {
                    if ($attrs.application === undefined)
                        $attrs.application = "LBA";
                    $http.get(Api + "api/filter/getDemographicFilters?application=" + $attrs.application).success(function (data) {
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
    angular.module("lba.Demographics").directive("demographicslayers", function () { return DemographicsLayers.getInstance(); });
})(app || (app = {}));
//# sourceMappingURL=DemographicsLayers.js.map