'use strict';

// Application Modules and Routing
angular
    .module('cjfw', ['ngRoute', 'angularUtils.directives.dirPagination'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCrtl'
            }).when('/storage', {
                templateUrl: 'views/storage.html',
                controller: 'storageCtrl'
            }).when('/tag', {
                templateUrl: 'views/tag.html',
                controller: 'tagCtrl'
            }).when('/material', {
                templateUrl: 'views/material.html',
                controller: 'materialCtrl'
            }).when('/shelf', {
                templateUrl: 'views/shelf.html',
                controller: 'shelfCtrl'
            }).when('/billsoflading', {
                templateUrl: 'views/billsoflading.html',
                controller: 'billsofladingCtrl'
            })
    });