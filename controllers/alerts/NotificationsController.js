(function () {
    var app = angular.module("primeApp");

    var notificationsController = [
        '$scope', 'OrderService', '$location', '$interval', 'storeService', '$rootScope', function ($scope, OrderService, $location, $interval, storeService, $rootScope) {
            var storeId = 0; 

            var getOrdersAboutToTransmit = function () {
                OrderService.getOrdersThatAreAboutToTransmit($rootScope.userData.storeId).then(onOrdersReceived, onError);
            };

            var onOrdersReceived = function (data) {
                if (data.length > 0) {
                    removeOldNotifications(data);
                    for (var i = 0; i < data.length; i++) {
                        var orderId = data[i].Id;
                        if (!doesOrderNotificationAlreadyExist(orderId)) {
                            data[i].isHidden = false;
                            $scope.orders.push(data[i]);
                        }
                    }

                    $scope.hiddenOrderscounter = getAmountOfHiddenOrders();
                    $scope.notificationsCollapsed = false;
                }
                else {
                    $scope.orders = [];
                    $scope.hiddenOrderscounter = 0;
                    $scope.notificationsCollapsed = true;
                }
            };

            var doesOrderNotificationAlreadyExist = function (orderId) {
                for (var i = 0; i < $scope.orders.length; i++) {
                    if ($scope.orders[i].Id == orderId)
                        return true;
                }
                return false;
            };

            var removeOldNotifications = function (data) {
                var orders = angular.copy($scope.orders);
                for (var i = 0; i < orders.length; i++) {
                    var result = Enumerable.From(data).Where(function (x) { return x.Id == orders[i].Id }).ToArray();
                    if (result.length == 0) {
                        $scope.orders.splice(i, 1);
                    }
                }
            };

            var onError = function (message) {
                //just swallow the error for now.
            };

            $scope.hideAlert = function (order) {
                order.isHidden = true;
                $scope.hiddenOrderscounter = getAmountOfHiddenOrders();
            }

            var getAmountOfHiddenOrders = function () {
                var counter = 0;
                for (var i = 0; i < $scope.orders.length; i++) {
                    if ($scope.orders[i].isHidden)
                        counter++;
                }

                return counter;
            }

            $scope.hideAll = function () {
                if ($scope.orders.length > 0) {
                    for (i = 0; i < $scope.orders.length; i++) {
                        if ($scope.orders[i].isHidden == false) {
                            $scope.orders[i].isHidden = true;
                        }
                    }

                    $scope.hiddenOrderscounter = getAmountOfHiddenOrders();
                }
            }

            $scope.showHidden = function () {
                if ($scope.hiddenOrderscounter > 0) {
                    for (i = 0; i < $scope.orders.length; i++) {
                        $scope.orders[i].isHidden = false;
                    }

                    $scope.hiddenOrderscounter = getAmountOfHiddenOrders();
                }
            }

            $scope.viewOrder = function (order) {
                $location.url('/Orders/OrderReview/' + order.Id);
                order.isHidden = true;
                $scope.hiddenOrderscounter = getAmountOfHiddenOrders();
            };

            $scope.orders = [];

            $scope.hiddenOrderscounter = 0;
            if ($rootScope.userData.userRole === "store") {
                $interval(getOrdersAboutToTransmit, 60000);
                getOrdersAboutToTransmit();
            }
        }];
    app.controller("notificationsController", notificationsController);

})();