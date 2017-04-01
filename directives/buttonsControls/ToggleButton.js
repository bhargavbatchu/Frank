(function () {
    var toggleButton = function () {
        return {
            controller: 'ToggleButtonController',
            restrict: "E",
            templateUrl: "app/templates/buttonControls/ToggleButton.html",
            scope: {
                buttonText: '@',
                popupCaption: '@',
                popupTitle: '@',
                state: '=',
                disableToggle: '='

            },
            replace: true
        };
    };
    angular.module("primeApp").directive("toggleButton", toggleButton);
}());