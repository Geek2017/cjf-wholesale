angular.module('cjfw').controller('registerCtrl', function($scope, $timeout) {




    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 3000
    });


    $scope.backlogin = function() {
        window.location.href = "login.html"
    }



    $scope.signup = function() {

        console.log($scope.password, $scope.email)

        if ($scope.password && $scope.email) {
            firebase.auth().createUserWithEmailAndPassword($scope.password, $scope.email)
                .then(userData => {
                    userData.user.sendEmailVerification();
                    console.log(userData);

                    if (userData.user.email) {
                        try {
                            var uid = firebase.database().ref().child('/users').push().key;

                            var user = {
                                date: firebase.database.ServerValue.TIMESTAMP,
                                email: $scope.email,
                                fullname: $scope.fullname,
                                role: 'viewer'
                            }

                            var updates = {};
                            updates['/users/' + uid] = user;
                            firebase.database().ref().update(updates);

                            if (updates) {
                                console.log(updates)
                                Toast.fire({
                                        icon: 'success',
                                        title: 'Register succesful, check your email'
                                    })
                                    // setTimeout(() => {
                                    //     window.location.href = 'login.html'
                                    // }, 3000);


                            }
                        } catch (error) {

                            Toast.fire({
                                icon: 'error',
                                title: 'Ow something went wrong: ' + error
                            })
                        }
                    }

                })
                .catch(err => {
                    console.log(err);
                    Toast.fire({
                        icon: 'error',
                        title: 'Ow something went wrong: ' + err
                    })
                });

        }

    }
});