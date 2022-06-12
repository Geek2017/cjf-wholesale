angular.module('cjfw').controller('registerCtrl', function($scope, $timeout) {
    $scope.backlogin = function() {
        window.location.href = "login.html"
    }


    $scope.registeruser = function() {



        var uid = firebase.database().ref().child('/users').push().key;

        var users = {
            timstamp: firebase.database.ServerValue.TIMESTAMP,
            fullname: $scope.fullname,
            password: $scope.password,
            email: $scope.email
        }

        console.log(users)

        var updates = {};
        updates['/users/' + uid] = users;
        firebase.database().ref().update(updates);


        if (updates) {
            console.log(updates)
            alert('Success your regitered pls. login')
            setTimeout(() => {
                window.location.href = "login.html"
            }, 2000);

        }
    }
});