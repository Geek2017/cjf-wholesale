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
                    window.location.href = "#/";
                    window.location.href = "#/customers";
                }, 2000);
            }
        }


    }

    $scope.edit = function(customer) {

        $('#editcustomer').modal('toggle');

        console.log(customer);

        $scope.cfname = customer.cfname;
        $scope.clname = customer.clname;
        $scope.ccomname = customer.ccomname;
        $scope.ccontact = customer.ccontact;
        $scope.comadd = customer.comadd;

        $scope.update = function() {
            var storage = {
                timstamp: firebase.database.ServerValue.TIMESTAMP,
                cfname: $scope.cfname,
                clname: $scope.clname,
                ccomname: $scope.ccomname,
                ccontact: $scope.ccontact,
                comadd: $scope.comadd
            }

            var updates = {};
            updates['/customer/' + customer.key] = storage;
            firebase.database().ref().update(updates);

            if (updates) {
                Toast.fire({
                    icon: 'success',
                    title: 'Data Updated!'
                })

                setTimeout(() => {
                    $('#editcustomer').modal('toggle');
                    window.location.href = "#/";
                    window.location.href = "#/customers";
                }, 2000);
            }
        }
    }

    $scope.delete = function(customer) {
        console.log(customer)
        var adaRef = firebase.database().ref('customer/' + customer.key);
        adaRef.remove()
            .then(function() {
                console.log("Remove succeeded.")
                Toast.fire({
                    icon: 'success',
                    title: 'customer Deleted'
                })
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
    }
});