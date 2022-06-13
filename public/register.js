angular.module('cjfw').controller('registerCtrl', function($scope, $timeout) {
    var config = {
        apiKey: "AIzaSyCAG1P1ioOD5tdaxjPWcphdUyksk55uJ9k",
        authDomain: "cjfwholesale.firebaseapp.com",
        databaseURL: "https://cjfwholesale-default-rtdb.firebaseio.com/",
        projectId: "cjfwholesale"
    };

    firebase.initializeApp(config);

    $scope.backlogin = function() {
        window.location.href = "login.html"
    }

    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 3000
    });



    $scope.registeruser = function() {
        console.log(1)

        var uid = firebase.database().ref().child('/users').push().key;

        var users = {
            timstamp: firebase.database.ServerValue.TIMESTAMP,
            fullname: $scope.fullname,
            password: $scope.password,
            email: $scope.email
        }

        console.log(users)

        try {
            var updates = {};
            updates['/users/' + uid] = users;
            firebase.database().ref().update(updates);


            if (updates) {
                console.log(updates)

                Toast.fire({
                        icon: 'success',
                        title: 'Register succesful, Kindly wait for admin to activate your account'
                    })
                    // setTimeout(() => {
                    //     window.location.href = "login.html"
                    // }, 2000);

            }
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: error
            })
        }


        // firebase.database().ref('/users').orderByChild('email').equalTo(email).on("value", function(snapshot) {
        //     var arr = [];

        //     console.log(snapshot.val())

        //     snapshot.forEach(childSnapshot => {
        //         let item = childSnapshot.val();
        //         item.key = childSnapshot.key;

        //         arr.push(item[0]);
        //     });
        // });


    }
});