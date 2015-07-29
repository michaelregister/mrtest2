angular.module('lib/Demographics/Layers/layer.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/Demographics/Layers/layer.html',
    "<input type=checkbox ng-if=true class=js-switch ui-switch=\"{color:'#39bcf6', secondaryColor:  '#D8D8D8'}\" ng-model=filter.isApplied ng-change=\"applyFilter(filter)\"><label>{{filter.DisplayName}}</label><div ng-show=\"allowfilter && filter.Name !==''\"><slider ng-model=filter.newRange min={{filter.Min}} max={{filter.Max}} ng-mouseup=applyFilter(filter) ng-if=\"filter.isApplied == true\" style=width:90%></slider><div><input ng-if=\"filter.isApplied == true\" type=number ng-model=filter.newRange[0] ng-change=applyFilter(filter) style=\"float:left;position:relative;width:45%;margin-top:5px\"> <input ng-if=\"filter.isApplied == true\" type=number ng-model=filter.newRange[1] ng-change=applyFilter(filter) style=\"float:right;position:relative;width:45%;margin-top:5px\"></div></div>"
  );

}]);
;/// <reference path="../../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../../scripts/global.ts" />
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