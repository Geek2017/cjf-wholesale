angular.module('cjfw').controller('loginCtrl', function($scope, $timeout) {

    $('.fa-spin').hide()

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

        $('.fa-spin').show()
        $('.singin').prop("disabled", true);

        firebase.database().ref('/users').orderByChild('email').equalTo($scope.email).on("value", function(snapshot) {
            $timeout(function() {
                $scope.$apply(function() {


                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;

                        console.log(item)

                        if (item.password === $scope.password) {
                            localStorage.setItem('auth', 1);
                            localStorage.setItem('role', item.role);

                            Toast.fire({
                                icon: 'success',
                                title: 'Authenticated Hurray!'
                            })

                            setTimeout(() => {
                                window.location.href = 'index.html'
                            }, 2000);


                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: 'INVALID CREDENTIALS'
                            })

                            setTimeout(() => {
                                window.location.reload()
                            }, 2000);

                        }

                    });
                });
            })
        });



        // firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
        //     .then(function(authData) {
        //         console.log(authData.user);
        //         if (authData.user) {

        //             Toast.fire({
        //                 icon: 'success',
        //                 title: 'Authenticated'
        //             })

        //             setTimeout(() => {
        //                 sessionStorage.setItem('useremail', authData.email)
        //                 window.location.href = 'index.html'
        //             }, 1000);
        //         } else {
        //             Toast.fire({
        //                 icon: 'error',
        //                 title: ' EMAIL NOT VERIFIED'
        //             })
        //         }
        //     }).catch(function(error) {
        //         // Toast.fire({
        //         //     icon: 'error',
        //         //     title: 'Ow something went wrong: ' + error
        //         // })

        //         console.log(error)

        //     })
    }

});