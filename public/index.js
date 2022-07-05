angular.module('cjfw').controller('indexCtrl', function($scope, $location) {

    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         console.log(user)

    //         firebase.database().ref('/users').orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
    //             $scope.$apply(function() {
    //                 snapshot.forEach(childSnapshot => {
    //                     let item = childSnapshot.val();
    //                     item.key = childSnapshot.key;

    //                     console.log(item.role)

    //                     if (item.role == 'manager') {
    //                         $('.invoices').remove()
    //                     }

    //                     if (item.role == 'viewer') {
    //                         $('.storage').remove();
    //                         $('.invoices').remove();
    //                         $('.users').remove();
    //                         $('.customers').remove();
    //                     }
    //                 });
    //             });
    //         });

    //     } else {
    //         window.location.href = './login.html';
    //     }
    // });

    if (!localStorage.getItem('auth')) {
        window.location.href = './login.html';
    }

    if (localStorage.getItem('auth')) {
        if (localStorage.getItem('role') == 'manager') {
            $('.invoices').hide()
        }

        if (localStorage.getItem('role') == 'viewer') {

            $('.storage').hide();
            $('.invoices').hide();
            $('.users').hide();
            $('.customers').hide();
            $('.tags').hide();
            $('.shelf').hide();
        }
    }


    $scope.logout = function() {
        localStorage.clear();
        window.location.href = './login.html';
    }

});