angular.module('cjfw').controller('usersCtrl', function($scope, $timeout) {

    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 3000
    });

    firebase.database().ref('/users/').orderByChild('date').on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {

                let returnArr = [];



                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    console.log(item)

                    returnArr.push(item);


                });

                $scope.users = returnArr;

                console.log(returnArr);

            });
        })
    });

    $scope.adduser = function() {

        $('#adduser').modal('toggle');

        $scope.saveuser = function() {

            console.log($scope.password, $scope.email)


            var secondaryApp = firebase.initializeApp(config, "Secondary");

            secondaryApp.auth().createUserWithEmailAndPassword($scope.password, $scope.email).then(function(firebaseUser) {

                console.log(firebaseUser.uid);

                secondaryApp.auth().signOut();

                try {

                    var uid = firebase.database().ref().child('/users').push().key;

                    var storage = {

                        timestamp: firebase.database.ServerValue.TIMESTAMP,
                        fullname: $scope.fullname,
                        email: $scope.email,
                        role: $scope.role
                    }

                    var updates = {};
                    updates['/users/' + uid] = storage;
                    firebase.database().ref().update(updates);

                    console.log(updates)

                    if (updates) {

                        Toast.fire({
                            icon: 'success',
                            title: 'User Created Successfully!'
                        })

                        setTimeout(() => {
                            $('#adduser').modal('toggle');
                            window.location.reload();
                        }, 2000);

                    }

                } catch (error) {
                    Toast.fire({
                        icon: 'error',
                        title: 'ERROR:' + error
                    })
                }

            });



        }


    }

});