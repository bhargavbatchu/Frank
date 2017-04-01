(function () {
    var shake = ['$animate', function ($animate) {
        return {
            restrict: "A",
            scope: {
                shake: '='
            },
            link: function (scope, element, attrs, form) {
                scope.$watch('shake', function (newValue) {
                    if (newValue) {
                        $animate.addClass(element, 'shake').then(function () {
                            element.removeClass('shake');
                        });
                        scope.shake = false;
                    }
                });
            }

        };
    }];
    angular.module("primeApp").directive("shake", shake);
}());