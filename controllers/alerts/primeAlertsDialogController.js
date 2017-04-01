(function () {
    var app = angular.module("primeApp");

    var primeAlertsDialogController = [
        '$scope', '$rootScope', 'primeAlertDialogService', '$timeout', '$window', function ($scope, $rootScope, primeAlertDialogService, $timeout, $window) {
            angular.element($window.document.getElementById('primeAlertDialogOverlay')).on('keyup', function (event) {
                if ($scope.dialogOptions.showDialog) {
                    event.stopPropagation();
                }
            });

            //don't allow tabs, or up, or down arrow keys to be held down 
            angular.element($window.document.getElementById('primeAlertDialogOverlay')).on('keydown', function (event) {
                if ($scope.dialogOptions.showDialog) {
                    if (event.keyCode == 9 || event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)
                        event.preventDefault();
                }
            });

            $scope.dialogOptions = {
                showDialog: false,
                showBlue: false,
                headerText: '',
                messageText: '',
                Button1Text: '',
                Button2Text: '',
                hideButton2: true,
                showInput: false,
                textInputValue: null,
                textInputMaxLength: 32,
                regEx: '',
                isNumeric: false
            };

            $scope.$on('showDialogChanged', function () {
                $timeout(function () {//we wrap this in a timeout function to make sure it is digested by angular. without the timeout the focus doesn't take effect.
                    clearSelection();
                    var element = $window.document.getElementById('primeAlertDialogOverlay');
                    if (element)
                        element.focus();
                });
                $timeout(function () {
                    $scope.dialogOptions = angular.copy(primeAlertDialogService.dialogOptions);
                }, 50);//we take a small timeout here, do to an issue we had where multiple dialogs were qued up back to back, and the angular could not digest the showing and hiding properties fast enough



            });

            var clearSelection = function () {
                var sel;
                if ((sel = document.selection) && sel.empty) {
                    sel.empty();
                } else {
                    if (window.getSelection) {
                        window.getSelection().removeAllRanges();
                    }
                    var activeEl = document.activeElement;
                    if (activeEl) {
                        var tagName = activeEl.nodeName.toLowerCase();
                        if (tagName == "textarea" ||
                           (tagName == "input" && activeEl.type == "text") ||
                           (tagName == "input" && activeEl.type == "number"))
                        {
                            // Collapse the selection to the end
                            activeEl.selectionStart = activeEl.selectionEnd;
                        }
                    }
                }
            }

            var reset = function () {
                $scope.dialogOptions.showDialog = false;
                $scope.dialogOptions.showBlue = false;
                $scope.dialogOptions.headerText = '';
                $scope.dialogOptions.messageText = '';
                $scope.dialogOptions.Button1Text = '';
                $scope.dialogOptions.Button2Text = '';
                $scope.dialogOptions.hideButton2 = true;
                $scope.dialogOptions.showInput = false;
                $scope.dialogOptions.textInputValue = null;
                $scope.dialogOptions.textInputMaxLength = 32;
                $scope.dialogOptions.regEx = '';
                $scope.dialogOptions.isNumeric = false;
                //primeAlertDialogService.reset();took out and made the service handles its own reset. sprint 29 --kwarren
            };

            $scope.cancel = function () {
                reset();
            };
            $scope.Button1Click = function (isValid) {
                if ($scope.dialogOptions.showInput) {
                    if (isValid && $scope.dialogOptions.textInputValue.toString().length > 0) {
                        if ($scope.dialogOptions.isNumeric)
                            $rootScope.$broadcast($scope.dialogOptions.key, parseInt($scope.dialogOptions.textInputValue));
                        else
                            $rootScope.$broadcast($scope.dialogOptions.key, $scope.dialogOptions.textInputValue);
                        reset();
                    }
                }
                else {
                    $rootScope.$broadcast($scope.dialogOptions.key, true);
                    reset();
                }
            }

            $scope.Button2Click = function () {
                $rootScope.$broadcast($scope.dialogOptions.key, false);
                reset();
            };
        }];
    app.controller("primeAlertsDialogController", primeAlertsDialogController);

})();