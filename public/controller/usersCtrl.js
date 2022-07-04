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

            // var secondaryApp = firebase.initializeApp(config, "Secondary");

            // secondaryApp.auth().createUserWithEmailAndPassword($scope.password, $scope.email).then(function(firebaseUser) {

            //     console.log(firebaseUser.uid);

            //     secondaryApp.auth().signOut();


            // });

            try {

                var uid = firebase.database().ref().child('/users').push().key;

                var storage = {
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
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

        }


    }

    $scope.delete = function(user) {
        console.log(user)
        var adaRef = firebase.database().ref('users/' + user.key);
        adaRef.remove()
            .then(function() {
                console.log("Remove succeeded.")
                Toast.fire({
                    icon: 'success',
                    title: 'User Deleted'
                })
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
    }

    $scope.reset = function(user) {
        console.log(user)

        let r = (Math.random() + 1).toString(36).substring(7);
        console.log("random", r);

        $(document).Toasts('create', {
            class: 'bg-info',
            title: 'NEW PASSWORD',
            body: 'Password is reset to: ' + '<b class="text-red">' + r + '</b>'
        })

        var storage = {
            timestamp: user.timestamp,
            fullname: user.fullname,
            email: user.email,
            password: r,
            role: user.role
        }

        var updates = {};
        updates['/users/' + user.key] = storage;
        firebase.database().ref().update(updates);
    }

    $scope.edit = function(user) {
        $('#edituser').modal('toggle');
        console.log(user)
        $scope.efullname = user.fullname
        $scope.eemail = user.email
        $scope.erole = user.role

        $scope.update = function() {
            var storage = {
                timestamp: user.timestamp,
                fullname: $scope.efullname,
                email: $scope.eemail,
                password: user.password,
                role: $scope.erole
            }

            var updates = {};
            updates['/users/' + user.key] = storage;
            firebase.database().ref().update(updates);

            if (updates) {
                Toast.fire({
                    icon: 'success',
                    title: 'Data Updated!'
                })
            }
        }
    }

});