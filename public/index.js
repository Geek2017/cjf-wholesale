angular.module('cjfw').controller('indexCtrl', function($scope, $timeout) {

    const session = sessionStorage.getItem('stat');

    if (!session) {
        window.location.href = "login.html"
    }

    $scope.logout = function() {
        sessionStorage.clear();
        window.location.reload();
    }

});