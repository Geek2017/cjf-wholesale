angular.module('cjfw').controller('loginCtrl', function($scope, $timeout) {

    var config = {
        apiKey: "AIzaSyCAG1P1ioOD5tdaxjPWcphdUyksk55uJ9k",
        authDomain: "cjfwholesale.firebaseapp.com",
        databaseURL: "https://cjfwholesale-default-rtdb.firebaseio.com/",
        projectId: "cjfwholesale"
    };

    firebase.initializeApp(config);


    $scope.register = function() {
        window.location.href = "register.html"
    }


    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 3000
    });

    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            $scope.login();
        }
    });

    $scope.login = function() {

        console.log($scope.email, $scope.password);

        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(authData) {
                console.log(authData)
                if (authData.emailVerified) {

                    Toast.fire({
                        icon: 'success',
                        title: 'Authenticated'
                    })

                    setTimeout(() => {
                        sessionStorage.setItem('useremail', authData.email)
                        window.location.href = 'index.html'
                    }, 1000);
                }
            }).catch(function(error) {
                Toast.fire({
                    icon: 'error',
                    title: 'Ow something went wrong: ' + error
                })

            })
    }

});