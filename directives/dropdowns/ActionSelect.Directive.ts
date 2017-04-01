module primeApp.Controls {
    "use strict";

    class ActionSelectDirective implements ng.IDirective {
        static $inject = [];
        static instance(): ng.IDirective {
            return new ActionSelectDirective();
        }

        restrict: string = "E";
        templateUrl: string = "app/templates/dropdowns/actionSelect.html";
        replace: boolean = false;
        scope: any = {
            canCancel: "=",
            canPrint: "=",
            canReopen: "=",
            canPrintupcs: "=",
            canZeroclose: "=",
            actionSelected: '&'
        }

        constructor() {

        }
    }
    angular.module("primeApp").directive("actionSelect", ActionSelectDirective.instance);
}