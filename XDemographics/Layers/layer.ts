/// <reference path="../../../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../../../scripts/global.ts" />
module app {
    "use strict";
    interface ILayerScope extends ng.IScope {
        applyFilter(filter: any);
        $parent: any;
    }
    class Layer implements ng.IDirective {
        public restrict: string = "E";
        constructor() {
            console.log("layer constructor");
        }
        
        templateUrl: string = "~/../bower_components/mrtest2/XDemographics/Layers/layer.html";
        controller = ["$scope", "leafletData", function ($scope: ILayerScope, leafletData: any) {
            
            $scope.applyFilter = function (filter: any) {
                $scope.$parent.Apply(filter);
            };

        }];

        public static getInstance(): Layer {
            return new Layer();
        }
    }

    angular.module(NameSpace).directive("layer", () => Layer.getInstance());
}