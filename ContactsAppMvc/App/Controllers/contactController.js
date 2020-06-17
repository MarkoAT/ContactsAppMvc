(function () {
    'use strict';

    angular
        .module('app')
        .controller('contactController', ['$scope', 'dataService', function ($scope, dataService) {
            $scope.contacts = [];

            // Gets all contacts for table
            getData();

            function getData() {
                dataService.getContacts().then(function (result) {
                    $scope.contacts = result;
                });
            }

            /* Replaces loading message after 10s of page opening
             * (this is pretty crude, I just wanted to make the table loading obvious as it takes a while to load) */
            window.onload = function () {
                setTimeout(function () {
                    document.getElementById("loadingMessage").innerHTML = "You have no contacts";
                }, 10000);
            }

            // Delete contact by id
            $scope.deleteContact = function (id) {
                dataService.deleteContact(id).then(function () {
                    // Simple error handling
                    toastr.success('Contact deleted successfully');
                    getData();
                }, function () {
                    toastr.error('Error deleting contact with Id: ' + id);
                });
            };
        }])

        .controller('contactAddController', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            // Create new contact
            $scope.createContact = function (contact) {
                dataService.addContact(contact).then(function () {
                    toastr.success('Contact created successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error creating contact');
                });
            };
        }])

        .controller('contactEditController', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location, dataService) {
            $scope.contact = {};
            $scope.states = {
                showUpdateButton: false
            };

            // Get existing contact data to be editted
            dataService.getContactById($routeParams.id).then(function (result) {
                $scope.contact = result;
                // Only shows update button if no errors getting contact data
                $scope.states.showUpdateButton = true;
            }, function () {
                toastr.error('Error fetching contact with Id: ' + $routeParams.id);
            });

            // Update contact data
            $scope.updateContact = function (contact) {
                dataService.editContact(contact).then(function () {
                    toastr.success('Contact updated successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error updating contact');
                });
            };
        }]);
})();