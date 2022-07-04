angular.module('cjfw').controller('resetCtrl', function($scope, $timeout, ) {

    $('.fa-spin').hide()

    var config = {
        apiKey: "AIzaSyCAG1P1ioOD5tdaxjPWcphdUyksk55uJ9k",
        authDomain: "cjfwholesale.firebaseapp.com",
        databaseURL: "https://cjfwholesale-default-rtdb.firebaseio.com/",
        projectId: "cjfwholesale"
    };

    firebase.initializeApp(config);


    $scope.login = function() {
        window.location.href = "login.html"
    }


    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 3000
    });



    let positive;

    $scope.execute = function() {
        const email = $("#to_name").val();
        console.log(email);

        $('.fa-spin').show()

        $('#button').prop("disabled", true);



        firebase.database().ref('/users').orderByChild('email').equalTo(email).on("value", function(snapshot) {

            console.log(snapshot.val());

            let rv = snapshot.val();

            if (rv != null) {
                $scope.$apply(function() {
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;

                        console.log(item)

                        let r = (Math.random() + 1).toString(36).substring(7);
                        console.log("random", r);

                        $("#message").val('your new password is:' + r);

                        var storage = {
                            timestamp: item.timestamp,
                            fullname: item.fullname,
                            email: item.email,
                            password: r,
                            role: item.role
                        }

                        var updates = {};
                        updates['/users/' + item.key] = storage;
                        firebase.database().ref().update(updates);

                        if (updates) {
                            console.log(updates);
                            positive = 1;
                        }

                    });
                });
            } else {
                positive = 0;
            }


        });
    }



    const btn = document.getElementById('button');

    document.getElementById('form')
        .addEventListener('submit', function(event) {
            event.preventDefault();
            $scope.execute();


            setTimeout(() => {

                if (positive === 1) {
                    btn.value = '';

                    const serviceID = 'default_service';
                    const templateID = 'template_7us2kbp';

                    emailjs.sendForm(serviceID, templateID, this)
                        .then(() => {
                            btn.value = 'Proceed';
                            Toast.fire({
                                icon: 'success',
                                title: 'Reset info been sent to your email!'
                            }, $('.fa-spin').hide())

                            setTimeout(() => {
                                window.location.replace("login.html");
                            }, 1000);
                            console.log(this)
                        }, (err) => {
                            btn.value = 'Proceed';
                            Toast.fire({
                                icon: 'error',
                                title: err
                            })
                        });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'EMAIL INVALID'
                    })

                    setTimeout(() => {
                        window.location.replace("login.html");
                    }, 1000);
                }


            }, 2000);
        });

});