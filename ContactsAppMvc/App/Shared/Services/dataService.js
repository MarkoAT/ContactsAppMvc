(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getContacts = function () {
                var deferred = $q.defer();
                $http.get('/Contact/Index').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.getContactById = function (id) {
                var deferred = $q.defer();
                $http.get('/Contact/Details/' + id).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addContact = function (contact) {
                var deferred = $q.defer();
                $http.post('/Contact/Create', contact).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.editContact = function (contact) {
                var deferred = $q.defer();
                $http.post('/Contact/Edit', contact).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.deleteContact = function (id) {
                var deferred = $q.defer();
                $http.post('/Contact/Delete', { id: id }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            return service;
        }]);
})();