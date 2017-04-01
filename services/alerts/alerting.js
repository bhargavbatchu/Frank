(function () {

    var alerting = ['$timeout', function ($timeout) {
        var currentAlerts = [];
        var alertTypes = ["success", "info", "warning", "danger", "error", "debug"];

        var addWarning = function (message) {
            addAlert("warning", message);
        };

        var addDanger = function (message) {
            addAlert("danger", message);
        };

        var addInfo = function (message) {
            addAlert("info", message);
        };

        var addSuccess = function (message) {
            addAlert("success", message);
        };

        var addError = function (message) {
            addAlert("error", message);
        };

        var addDebug = function (message) {
            addAlert("debug", message);
        };

        var addAlert = function (type, message) {
            var alert = { type: type, message: message };
            currentAlerts.push(alert);
           $timeout(function () { removeAlert(alert); },5000);
        };

        var removeAlert = function (alert) {
            for (var i = 0; i < currentAlerts.length; i++) {
                if (currentAlerts[i] == alert) {
                    currentAlerts.splice(i, 1);
                    break;
                }
            }
        };

        var errorHandler = function(description)
        {
            return function () {
                addDanger(description);
            };
        }

        return {
            addWarning: addWarning,
            addDanger: addDanger,
            addInfo: addInfo,
            addSuccess: addSuccess,
            addError: addError,
            addDebug: addDebug,
            addAlert: addAlert,
            currentAlerts: currentAlerts,
            alertTypes: alertTypes,
            removeAlert: removeAlert
        };
    }];

    var module = angular.module("primeApp");
    module.factory("alerting", alerting);
}());
