(function () {

    var primeAlertDialogService = ['$rootScope', function ($rootScope) {
        var defaultkey = 'defaultBroadcastKeyShouldNotBeCaught';
        var dialogOptions = new function () {

            var headerText = '';
            var messageText = '';
            var showBlue = false;
            var button1Text = 'Yes';
            var button2Text = 'No';
            var showDialog = false;
            var hideButton2 = true;
            var showInput = false;
            var textInputValue = null;
            var textInputMaxLength = 32;
            var regEx = '';
            var isNumeric = false;
            var defaultkey = 'defaultBroadcastKeyShouldNotBeCaught';
            return {
                headerText: headerText,
                messageText: messageText,
                showBlue: showBlue,
                button1Text: button1Text,
                button2Text: button2Text,
                showDialog: showDialog,
                hideButton2: hideButton2,
                showInput: showInput,
                textInputValue: textInputValue,
                textInputMaxLength: textInputMaxLength,
                key: defaultkey,
                regEx: regEx,
                isNumeric: isNumeric
            };

        };

        var setShowOkOptions = function (showBlue, button1Text) {
            if (typeof showBlue !== 'undefined')
                dialogOptions.showBlue = showBlue;
            if (typeof button1Text !== 'undefined') {
                dialogOptions.button1Text = button1Text;
            }
            else {
                dialogOptions.button1Text = 'OK';
            }

            dialogOptions.showDialog = true;
            dialogOptions.hideButton2 = true;
            $rootScope.$broadcast('showDialogChanged');
        };

        var setShowConfirmOptions = function (key, showBlue, button1Text, button2Text) {
            if (typeof showBlue !== 'undefined')
                dialogOptions.showBlue = showBlue;

            if (typeof button1Text !== 'undefined')
                dialogOptions.button1Text = button1Text;

            if (typeof button2Text !== 'undefined')
                dialogOptions.button2Text = button2Text;

            dialogOptions.showDialog = true;
            dialogOptions.key = key;
            dialogOptions.hideButton2 = false;
            $rootScope.$broadcast('showDialogChanged');
        };

        var showConfirm = function (systemMessage, key, showBlue, button1Text, button2Text) {
            reset();
            dialogOptions.headerText = systemMessage.Header;
            dialogOptions.messageText = systemMessage.Text;
            setShowConfirmOptions(key, showBlue, button1Text, button2Text);
        };
        
        var showOk = function (systemMessage, showBlue, button1Text) {
            reset();
            dialogOptions.headerText = systemMessage.Header;
            dialogOptions.messageText = systemMessage.Text;
            setShowOkOptions(showBlue, button1Text);

        }

        var showCustomizedConfirm = function (header, message, key, showBlue, button1Text, button2Text) {
            reset();
            dialogOptions.headerText = header;
            dialogOptions.messageText = message;
            setShowConfirmOptions(key, showBlue, button1Text, button2Text);
        };

        var showCustomizedOk = function (header, message, showBlue, button1Text) {
            reset();
            dialogOptions.headerText = header;
            dialogOptions.messageText = message;
            setShowOkOptions(showBlue, button1Text);
        };

        var showCustomNumericInputOk = function (header, message, key, numericValue, showBlue, button1Text) {
            reset();
            dialogOptions.headerText = header;
            dialogOptions.messageText = message;
            dialogOptions.key = key;
            dialogOptions.textInputValue = numericValue;
            dialogOptions.regEx = '\\d+';
            dialogOptions.isNumeric = true;
            dialogOptions.showInput = true;
            setShowOkOptions(showBlue, button1Text);
        };

        var showCustomTextInputOk = function (header, message, key, textValue, regEx, textMaxLength, showBlue, button1Text) {
            reset();
            dialogOptions.headerText = header;
            dialogOptions.messageText = message;
            dialogOptions.key = key;
            dialogOptions.textInputValue = textValue;
            dialogOptions.showInput = true;
            dialogOptions.regEx = regEx;
            dialogOptions.textInputMaxLength = textMaxLength;
            setShowOkOptions(showBlue, button1Text);
        };

        var reset = function () {
            dialogOptions.headerText = '';
            dialogOptions.messageText = '';
            dialogOptions.showBlue = false;
            dialogOptions.button1Text = 'Yes',
            dialogOptions.button2Text = 'No',
            dialogOptions.showDialog = false;
            dialogOptions.hideButton2 = true;
            dialogOptions.showInput = false;
            dialogOptions.textInputValue = null;
            dialogOptions.textInputMaxLength = 32;
            dialogOptions.key = 'defaultBroadcastKeyShouldNotBeCaught';
            dialogOptions.regEx = '';
        };

        return {
            showConfirm: showConfirm,
            showOk: showOk,
            showCustomizedConfirm: showCustomizedConfirm,
            showCustomizedOk: showCustomizedOk,
            showCustomNumericInputOk: showCustomNumericInputOk,
            showCustomTextInputOk: showCustomTextInputOk,
            dialogOptions: dialogOptions,
            reset: reset
        };
    }];

    var module = angular.module("primeApp");
    module.factory("primeAlertDialogService", primeAlertDialogService);

}());