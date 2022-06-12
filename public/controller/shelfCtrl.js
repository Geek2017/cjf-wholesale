angular.module('cjfw').controller('shelfCtrl', function($scope, $timeout) {

    firebase.database().ref('/sheft/').orderByChild('date').on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {

                let returnArr = [];



                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    console.log(item)

                    returnArr.push(item);


                });

                $scope.shelfs = returnArr;

                console.log(returnArr);

            });
        })
    });


    $scope.printhis = function() {
        $('#pmodal').kinziPrint({
            importCSS: true,
            importStyle: false,
            loadCSS: 'dist/css/print.css'
        });
    }

    $scope.addshelf = function(tag) {

        $('#modal-xl').modal('toggle');
    }

    $scope.saveshelf = function() {
        var uid = firebase.database().ref().child('/sheft').push().key;

        var shelf = {
            timstamp: firebase.database.ServerValue.TIMESTAMP,
            Shelf: $scope.shelf,
            rollnumber: $scope.rollnumber

        }

        var updates = {};
        updates['/sheft/' + uid] = shelf;
        firebase.database().ref().update(updates);

        console.log(updates);

    }
});