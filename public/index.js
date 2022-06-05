angular.module('cjfw').controller('indexCtrl', function($scope, $timeout) {

    var config = {
        apiKey: "AIzaSyCAG1P1ioOD5tdaxjPWcphdUyksk55uJ9k",
        authDomain: "cjfwholesale.firebaseapp.com",
        databaseURL: "https://cjfwholesale-default-rtdb.firebaseio.com/",
        projectId: "cjfwholesale"
    };

    firebase.initializeApp(config);

});