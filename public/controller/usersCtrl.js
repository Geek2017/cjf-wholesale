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
            var uid = firebase.database().ref().child('/users').push().key;

            var storage = {
                timstamp: firebase.database.ServerValue.TIMESTAMP,
                fullname: $scope.fullname,
                email: $scope.email,
                password: $scope.password,
                role: $scope.role
            }


            var updates = {};
            updates['/users/' + uid] = storage;
            firebase.database().ref().update(updates);

            console.log(updates)

            if (updates) {
                Toast.fire({
                    icon: 'success',
                    title: 'Data saved'
                }, $('#adduser').modal('toggle'))

            }
        }


    }

});