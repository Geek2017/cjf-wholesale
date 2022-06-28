angular.module('cjfw').controller('resetCtrl', function($scope, $timeout) {

    var config = {
        apiKey: "AIzaSyCAG1P1ioOD5tdaxjPWcphdUyksk55uJ9k",
        authDomain: "cjfwholesale.firebaseapp.com",
        databaseURL: "https://cjfwholesale-default-rtdb.firebaseio.com/",
        projectId: "cjfwholesale"
    };

    firebase.initializeApp(config);


    $scope.login = function() {
        window.location.href = "login.html"
    }


    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 3000
    });



    $scope.reset = function() {
        firebase.auth().sendPasswordResetEmail($scope.email)
            .then(function() {
                Toast.fire({
                    icon: 'success',
                    title: 'Reset link haave been sent to your email!'
                })
                setTimeout(() => {
                    window.location.replace("login.html");
                }, 3000);
            })

    }

});