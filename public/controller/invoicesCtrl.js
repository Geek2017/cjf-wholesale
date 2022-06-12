angular.module('cjfw').controller('invoicesCtrl', function($scope, $timeout) {

    // $('#modal-xl').modal('toggle');

    firebase.database().ref('/storage/').orderByChild('date').on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {

                let returnArr = [];

                let ndata;

                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                });

                $scope.tags = returnArr;

                console.log(returnArr);

            });
        })
    });


    $scope.printhis = function() {
        $('#invoice').kinziPrint({
            importCSS: true,
            importStyle: false,
            loadCSS: 'dist/css/print.css'
        });
    }




});