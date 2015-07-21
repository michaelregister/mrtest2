/// <reference path="../../../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../../../scripts/global.ts" />
var app;
(function (app) {
    "use strict";
    var Layer = (function () {
        function Layer() {
            this.restrict = "E";
            this.templateUrl = "/app/Features/Demographics/Layers/layer.html";
            this.controller = ["$scope", "leafletData", function ($scope, leafletData) {
                $scope.applyFilter = function (filter) {
                    $scope.$parent.Apply(filter);
                };
            }];
            console.log("layer constructor");
        }
        Layer.getInstance = function () {
            return new Layer();
        };
        return Layer;
    })();
    angular.module("app").directive("layer", function () { return Layer.getInstance(); });
})(app || (app = {}));
//# sourceMappingURL=layer.js.map