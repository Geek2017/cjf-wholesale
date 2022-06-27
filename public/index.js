angular.module('cjfw').controller('indexCtrl', function($scope, $timeout) {

    const session = sessionStorage.getItem('stat');
    var role = sessionStorage.getItem('role');

    if (!session) {
        window.location.href = "login.html"
    }

    if (role == 'manager') {
        $('.invoices').remove()
    }




    if (role == 'viewer') {
        $('.storage').hide();
        $('.invoices').hide();
        $('.users').hide();
        $('.customers').hide();
    }

    $scope.logout = function() {
        sessionStorage.clear();
        window.location.reload();
    }

});