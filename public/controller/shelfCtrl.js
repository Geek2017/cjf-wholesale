angular.module('cjfw').controller('shelfCtrl', function($scope, $timeout) {

    let dfrom;
    let duntil;

    $scope.from = function() {

        var dfromiso = new Date($scope.datefrom);
        dfromiso = dfromiso.getTime();
        dfrom = dfromiso;

    }

    $scope.until = function() {

        var duntiliso = new Date($scope.dateuntil);
        duntiliso = duntiliso.getTime();
        duntil = duntiliso;
        console.log(dfrom, duntil)

    }

    $scope.applyfilter = function() {

        firebase.database().ref('/shelf/').orderByChild('timstamp').startAt(dfrom).endAt(duntil).on("value", function(snapshot) {
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
    }

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