var primeApp;
(function (primeApp) {
    var Controls;
    (function (Controls) {
        "use strict";
        var ActionSelectDirective = (function () {
            function ActionSelectDirective() {
                this.restrict = "E";
                this.templateUrl = "app/templates/dropdowns/actionSelect.html";
                this.replace = false;
                this.scope = {
                    canCancel: "=",
                    canPrint: "=",
                    canReopen: "=",
                    canPrintupcs: "=",
                    canZeroclose: "=",
                    actionSelected: '&'
                };
            }
            ActionSelectDirective.instance = function () {
                return new ActionSelectDirective();
            };
            ActionSelectDirective.$inject = [];
            return ActionSelectDirective;
        }());
        angular.module("primeApp").directive("actionSelect", ActionSelectDirective.instance);
    })(Controls = primeApp.Controls || (primeApp.Controls = {}));
})(primeApp || (primeApp = {}));
//# sourceMappingURL=ActionSelect.Directive.js.map