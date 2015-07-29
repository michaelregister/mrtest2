angular.module('lib/Demographics/demographicsLayers.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/Demographics/demographicsLayers.html',
    "<div style=height:100%;width:100%;background-color:white><accordion class=\"sidebar-tabs filterAccordion\" role=tablist><accordion-group class=filterAccordionGroup ng-repeat=\"(key,value) in dFilters.Filters track by $index\" style=\"margin-top:0 !important\"><accordion-heading class=accordion-head ng-hide=HideFilters(value)><div class=accordion-ico-col><span><i class=\"fa fa-home fa-2x\" ng-if=\"key == 'Housing'\"></i> <i class=\"fa fa-money fa-2x\" ng-if=\"key == 'Income'\"></i> <i class=\"fa fa-users fa-2x\" ng-if=\"key == 'Population'\"></i> <i class=\"fa fa-globe fa-2x\" ng-if=\"key == 'Geography'\"></i> <i class=\"fa fa-question fa-2x\" ng-if=\"key == 'Unknown'\"></i></span></div><div class=accordion-htext-col ng-bind=key></div></accordion-heading><div class=col-md-12 ng-repeat=\"filter in value track by $index\"><layer></layer></div></accordion-group></accordion></div>"
  );

}]);
;angular.module('lib/Demographics/demographicsLayers.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/Demographics/demographicsLayers.html',
    "<div style=height:100%;width:100%;background-color:white><accordion class=\"sidebar-tabs filterAccordion\" role=tablist><accordion-group class=filterAccordionGroup ng-repeat=\"(key,value) in dFilters.Filters track by $index\" style=\"margin-top:0 !important\"><accordion-heading class=accordion-head ng-hide=HideFilters(value)><div class=accordion-ico-col><span><i class=\"fa fa-home fa-2x\" ng-if=\"key == 'Housing'\"></i> <i class=\"fa fa-money fa-2x\" ng-if=\"key == 'Income'\"></i> <i class=\"fa fa-users fa-2x\" ng-if=\"key == 'Population'\"></i> <i class=\"fa fa-globe fa-2x\" ng-if=\"key == 'Geography'\"></i> <i class=\"fa fa-question fa-2x\" ng-if=\"key == 'Unknown'\"></i></span></div><div class=accordion-htext-col ng-bind=key></div></accordion-heading><div class=col-md-12 ng-repeat=\"filter in value track by $index\"><layer></layer></div></accordion-group></accordion></div>"
  );

}]);
;/// <reference path="../../scripts/typings/leaflet/leaflet.d.ts" />
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
                if ($attrs.allowfilter)
                    $scope.allowfilter = $attrs.allowfilter;
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