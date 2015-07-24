/// <reference path="../../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../../scripts/global.ts" />

angular.module("lib/Demographics/layers/layer.html", []).run(["$templateCache", function (a) {
    a.put("lib/Demographics/layers/layer.html",
        "<input type=checkbox ng-if=true class=js-switch ui-switch=\"{color:'#39bcf6', secondaryColor:  '#D8D8D8'}\" ng-model=filter.isApplied ng-change=applyFilter(filter)><label>{{filter.DisplayName}}</label>")
}]);

var app;
(function (app) {
    "use strict";
    var Layer = (function () {
        function Layer() {
            this.restrict = "E";
            this.templateUrl = "lib/Demographics/Layers/layer.html";
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
    angular.module("lba.Demographics").directive("layer", function () { return Layer.getInstance(); });
})(app || (app = {}));
//# sourceMappingURL=layer.js.map