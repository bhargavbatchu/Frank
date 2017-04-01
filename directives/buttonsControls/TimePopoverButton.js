(function () {
    var timePopoverButton = function () {
        return {
            controller: 'TimePopoverController',
            restrict: "E",
            templateUrl: "app/templates/buttonControls/TimePopoverButton.html",
            scope: {
                buttonText: '@',
                primaryTimeCaption: '@',
                secondaryTimeCaption: '@',
                popupTitle: '@',
                state: '@',
                primaryDbTimeValue: "=",
                secondaryDbTimeValue: "=",
                reportNewDate: '&updateCallback'
            },
            link: function(scope, element, attrs)
            {
                scope.secondaryTimeSupplied = ($(element).attr('secondary-db-time-value') !== undefined);
                scope.timePickerProperties.initMinsAndMaxes(scope.secondaryTimeSupplied, true);

                if (scope.primaryDbTimeValue !== null && scope.primaryDbTimeValue !== undefined) {
                    scope.timePickerProperties.primaryTimePickerValue = new Date(scope.primaryDbTimeValue);
                    scope.dynamicPopover.state = true;
                }
                if (scope.secondaryDbTimeValue !== null && scope.secondaryDbTimeValue !== undefined) {
                    scope.timePickerProperties.secondaryTimePickerValue = new Date(scope.secondaryDbTimeValue);
                }
            }
        };
    };
    angular.module("primeApp").directive("timePopoverButton", timePopoverButton);
}());