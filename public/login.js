angular.module('cjfw').controller('loginCtrl', function($scope, $timeout) {

    $scope.register = function() {
        window.location.href = "register.html"
    }

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        firebase.database().ref('/users').orderByChild('email').equalTo($scope.email).on("value", function(snapshot) {

            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item.key = childSnapshot.key;

                if (item.email) {

                    const pwd0 = item.password;
                    const pwd1 = $scope.password;

                    console.log(pwd0, pwd1);
                    if (pwd0 == pwd1) {
                        window.location.href = "index.html"
                        sessionStorage.setItem('stat', 1)
                    }
                }

            });
        });
    })

});