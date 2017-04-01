(function () {
    var notifications = function () {
        return {
            restrict: "E",
            controller: 'notificationsController',
            templateUrl: "app/templates/alerts/notifications.html",
        };
    };
    angular.module("primeApp").directive("notifications", notifications);
}());