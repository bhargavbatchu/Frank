interface IAuthorizationRoute extends ng.route.IRoute {
    authorization?: Array<string>;
}

((): void => {
    'use strict';

    angular.module('primeApp').config(config);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
    function config($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider, $httpProvider: ng.IHttpProvider): void {
        $httpProvider.useApplyAsync(true);
        $routeProvider
            .when('/Main',
            {
                templateUrl: 'app/templates/Main/MainLandingPage.html',
                name: 'Main',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/ItemAttributes/:storeId?/:productCategoryId?', <IAuthorizationRoute>
            {
                // title: 'PRIME - Item Attributes',
                templateUrl: 'app/templates/ItemAttributes/main.html',
                controller: 'ItemStoreAttributesMainController',
                name: 'ItemAttributes',
                authorization: ["admin", "divisionAdmin"]

            })
            .when('/KitchenTransfers', <IAuthorizationRoute>
            {
                //title: 'PRIME - Kitchen Transfers',
                templateUrl: 'app/templates/KitchenTransfers/main.html',
                controller: 'KitchenTransfersMainController',
                name: 'KitchenTransfers',
                authorization: ["admin"]
            })
            .when('/VendorManagement', <IAuthorizationRoute>
            {
                //title: 'PRIME - Vendor Management',
                templateUrl: 'app/templates/Main/MainLandingPage.html',
                name: 'Main',
                authorization: ["admin", "divisionAdmin"]
            })
            .when('/VendorManagement/Attributes', <IAuthorizationRoute>
            {
                //title: 'PRIME - Vendor Management',
                templateUrl: 'app/templates/VendorManagement/vendorManagementAttributes.html',
                controller: 'vendorManagementAttributesController',
                name: 'VendorManagementAttributes',
                authorization: ["admin", "divisionAdmin"]
            })
            .when('/VendorManagement/DeliverySchedule', <IAuthorizationRoute>
            {
                //title: 'PRIME - Vendor Management',
                templateUrl: 'app/templates/VendorManagement/vendorManagementDeliverySchedule.html',
                controller: 'vendorManagementDeliveryScheduleController',
                name: 'VendorManagementDeliverySchedule',
                authorization: ["admin", "divisionAdmin"]
            })
            .when('/VendorManagement/Orders', <IAuthorizationRoute>
            {
                //title: 'PRIME - Vendor Management',
                templateUrl: 'app/templates/VendorManagement/vendorManagementOrders.html',
                controller: 'vendorManagementOrdersController',
                name: 'VendorManagementOrders',
                authorization: ["admin", "divisionAdmin"]
            })
            .when('/Orders', <IAuthorizationRoute>
            {
                //title: 'PRIME - Orders',
                templateUrl: 'app/templates/Orders/orders.html',
                controller: 'OrderController',
                name: 'Orders',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/Orders/OrderReview/:orderId',
            {
                //title: 'PRIME - Orders',
                templateUrl: 'app/templates/Orders/orderReview.html',
                controller: 'OrderReviewController',
                name: 'Order Review',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/Orders/OrderReceiving/:orderId',
            {
                //title: 'PRIME - Orders',
                templateUrl: 'app/templates/Orders/orderReceiving.html',
                controller: 'OrderReceivingController',
                name: 'Order Receiving',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/InventoryAdjustments', <IAuthorizationRoute>
            {
                //title: 'PRIME - InventoryAdjustments',
                templateUrl: 'app/templates/InventoryAdjustments/inventoryAdjustment.html',
                controller: 'InventoryAdjustmentController',
                name: 'InventoryAdjustments',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/Transfers', <IAuthorizationRoute>
            {
                //title: 'PRIME - Transfers',
                templateUrl: 'app/templates/Transfers/transfers.html',
                controller: 'TransfersController',
                name: 'Transfers',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/TrueUps', <IAuthorizationRoute>
            {
                //title: 'PRIME - True Ups',
                templateUrl: 'app/templates/TrueUps/TrueUps.html',
                controller: 'TrueUpsController',
                name: 'TrueUps',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/Reports', <IAuthorizationRoute>
            {
                //title: 'PRIME - Vendor Management',
                templateUrl: 'app/templates/Main/MainLandingPage.html',
                name: 'Main',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/Reports/TrueUps',
            {
                //title: 'PRIME - Orders',
                templateUrl: 'app/templates/Reports/trueUpsReport.html',
                controller: 'TrueUpsReportController',
                name: 'True Ups Reporting',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/Reports/InventoryAdjustments',
            {
                //title: 'PRIME - Orders',
                templateUrl: 'app/templates/Reports/inventoryAdjustmentsReport.html',
                controller: 'InventoryAdjustmentsReportController',
                name: 'Inventory Adjustment Reporting',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/Reports/Transfers',
            {
                //title: 'PRIME - Orders',
                templateUrl: 'app/templates/Reports/transfersReport.html',
                controller: 'TransfersReportController',
                name: 'Transfers Reporting',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .when('/Reports/Orders',
            {
                //title: 'PRIME - Orders',
                templateUrl: 'app/templates/Reports/ordersReport.html',
                controller: 'OrdersReportController',
                name: 'Orders Reporting',
                resolve: {
                    storeServiceData: ['storeService', function (storeService) {
                        return storeService.initializeCurrentStore();
                    }]
                },
            })
            .otherwise({
                redirectTo: '/Main'
            });
        $locationProvider.html5Mode(true).hashPrefix('!');

    }




})(); 