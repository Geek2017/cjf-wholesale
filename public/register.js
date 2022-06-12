angular.module('cjfw').controller('registerCtrl', function($scope, $timeout) {
    $scope.backlogin = function() {
        window.location.href = "login.html"
    }

    $scope.register = function() {
        var uid = firebase.database().ref().child('/users').push().key;

        var users = {
            timstamp: firebase.database.ServerValue.TIMESTAMP,
            fullname: $scope.fullname,
            password: $scope.password,
            email: $scope.email
        }


        var updates = {};
        updates['/users/' + uid] = users;
        firebase.database().ref().update(updates);


        if (updates) {
            console.log(updates)
            window.location.href = "login.html"
        }
    }
});