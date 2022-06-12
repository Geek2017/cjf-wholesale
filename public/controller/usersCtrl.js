angular.module('cjfw').controller('usersCtrl', function($scope, $timeout) {

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


});