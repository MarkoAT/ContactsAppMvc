(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute'
        ])

        // All routing
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/', {
                    controller: 'contactController',
                    templateUrl: '/App/Templates/contact.html'
                })
                .when('/addcontact', {
                    controller: 'contactAddController',
                    templateUrl: '/App/Templates/contactAdd.html'
                })
                .when('/editcontact/:id', {
                    controller: 'contactEditController',
                    templateUrl: '/App/Templates/contactEdit.html'
                })
                .otherwise({ redirectTo: '/' });
        }]);
})();