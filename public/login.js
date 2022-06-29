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


    $scope.showpass = function() {
        var passInput = $(".pass");
        if (passInput.attr('type') === 'password') {
            passInput.attr('type', 'text');
        } else {
            passInput.attr('type', 'password');
        }
    }

    $scope.login = function() {

        console.log($scope.email, $scope.password);

        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(authData) {
                console.log(authData.user);
                if (authData.user) {

                    Toast.fire({
                        icon: 'success',
                        title: 'Authenticated'
                    })

                    setTimeout(() => {
                        sessionStorage.setItem('useremail', authData.email)
                        window.location.href = 'index.html'
                    }, 1000);
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: ' EMAIL NOT VERIFIED'
                    })
                }
            }).catch(function(error) {
                // Toast.fire({
                //     icon: 'error',
                //     title: 'Ow something went wrong: ' + error
                // })

                console.log(error)

            })
    }

});