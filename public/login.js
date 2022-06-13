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
            $scope.signin();
        }
    });


    $scope.signin = function() {
        console.log('logging in..')
        firebase.database().ref('/users').orderByChild('email').equalTo($scope.email).on("value", function(snapshot) {

            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item.key = childSnapshot.key;

                if (item.email) {

                    const pwd0 = item.password;
                    const pwd1 = $scope.password;

                    console.log(pwd0, pwd1);
                    if (pwd0 == pwd1) {


                        Toast.fire({
                            icon: 'success',
                            title: 'Authenticated'
                        })

                        setTimeout(() => {
                            sessionStorage.setItem('stat', 1)

                            window.location.href = "index.html"
                        }, 1000);

                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: ' Ivalid Entry Check Your Inputs'
                        })
                    }
                }

            });
        });
    }

});