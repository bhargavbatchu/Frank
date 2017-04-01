(function () {
    var primeAlertDialog = function () {
        return {
            restrict: "E",
            controller: 'primeAlertsDialogController',
            templateUrl: "app/templates/alerts/primeAlertDialog.html",
        };
    };
    angular.module("primeApp").directive("primeAlertDialog", primeAlertDialog);
}());