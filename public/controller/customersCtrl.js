angular.module('cjfw').controller('customersCtrl', function($scope, $timeout) {


    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 3000
    });

    firebase.database().ref('/customer/').orderByChild('date').on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {

                let returnArr = [];



                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    console.log(item)

                    returnArr.push(item);


                });

                $scope.customers = returnArr;

                console.log(returnArr);

            });
        })
    });


    $scope.addcust = function() {

        $('#addcust').modal('toggle');
        $scope.savecust = function() {
            var uid = firebase.database().ref().child('/customer').push().key;

            var storage = {
                timstamp: firebase.database.ServerValue.TIMESTAMP,
                cfname: $scope.cfname,
                clname: $scope.clname,
                ccomname: $scope.ccomname,
                ccontact: $scope.ccontact,
                comadd: $scope.comadd
            }


            var updates = {};
            updates['/customer/' + uid] = storage;
            firebase.database().ref().update(updates);

            if (updates) {
                Toast.fire({
                    icon: 'success',
                    title: 'Data saved'
                })
                setTimeout(() => {
                    $('#addcust').modal('toggle');
                }, 3000);
            }
        }


    }

});