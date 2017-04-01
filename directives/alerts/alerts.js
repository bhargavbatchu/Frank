(function(){
    var module = angular.module("primeApp");
    var alerts = function (alerting) {
        return {
            restrict: "AE",
            templateUrl: "app/templates/alerts/alerts.html",
            scope: true, 
            controller: function ($scope) {
                $scope.removeAlert = function(alert){
                    alerting.removeAlert(alert);
                };
            },
            link: function (scope){
                scope.currentAlerts = alerting.currentAlerts;
            }
        };
    };
        module.directive("alerts",alerts);
}());