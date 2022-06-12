'use strict';

// Application Modules and Routing
angular
    .module('cjfw', ['ngRoute', 'angularUtils.directives.dirPagination'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl'
            }).when('/storage', {
                templateUrl: 'views/storage.html',
                controller: 'storageCtrl'
            }).when('/tag', {
                templateUrl: 'views/tag.html',
                controller: 'tagCtrl'
            }).when('/material', {
                templateUrl: 'views/material.html',
                controller: 'materialCtrl'
            }).when('/billsoflading', {
                templateUrl: 'views/billsoflading.html',
                controller: 'billsofladingCtrl'
            }).when('/shelf', {
                templateUrl: 'views/shelf.html',
                controller: 'shelfCtrl'
            }).when('/invoices', {
                templateUrl: 'views/invoices.html',
                controller: 'invoicesCtrl'
            })

    });