/// <reference path="../../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../../scripts/global.ts" />

module app {
    "use strict";
    interface IdemographicsLayersScope extends ng.IScope {
        dFilters: any;
        Apply(filter: any);
    }
    class DemographicsLayers implements ng.IDirective {
        public restrict: string = "E";
      

        constructor() {
            console.log("DemographicsLayers constructor");
        }
        templateUrl: string = "/app/Features/Demographics/demographicsLayers.html";
        controller = ["$scope", "demographicsLayersService", "$http", "leafletData",
            function ($scope: IdemographicsLayersScope, DemographicsLayersService: DemographicsLayersService,
                $http: ng.IHttpService, leafletData: any) {

            DemographicsLayersService.$scope = $scope;
            function GetFilters() {

            $http.get(Api + "api/filter/getDemographicFilters").
                success(function (data: Object) {
                console.log(data);

                $scope.dFilters  = data;

            }
                ).
                error(function (data: any, status: any) {
                console.log("Error loading demographicLayers.");
            });
            }
             GetFilters();
            leafletData.getMap().then(function (map: L.Map) {
                map.on("zoomend", function (e: any) {
                    
                    DemographicsLayersService.setZoomLayer(map);

                });
            });

            $scope.Apply = function (filter: any) {
                DemographicsLayersService.ApplyZoom(filter);
            };

        }];

        public static getInstance(): DemographicsLayers {
            return new DemographicsLayers();
        }
    }

    angular.module("app").directive("demographicslayers", () => DemographicsLayers.getInstance());
} 