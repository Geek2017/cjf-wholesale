angular.module('cjfw').controller('billsofladingCtrl', function($scope, $timeout) {


    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 4000
    });

    let dfrom;
    let duntil;

    $scope.resetdate = function() {
        window.location.href = "#/";
        window.location.href = "#/billsoflading";
    }

    $scope.datefrom = new Date();

    $scope.dateuntil = new Date();

    $scope.from = function() {

        var dfromiso = new Date($scope.datefrom).toISOString();
        console.log(dfromiso);
        dfrom = dfromiso;

        if ($scope.datefrom > $scope.dateuntil) {
            Toast.fire({
                icon: 'error',
                title: 'DATE FROM MUST > UNTIL DATE'
            })

        } else {

        }
    }

    $scope.until = function() {
        var duntiliso = new Date($scope.dateuntil).toISOString();
        console.log(duntiliso);
        duntil = duntiliso;

        if ($scope.datefrom > $scope.dateuntil) {
            Toast.fire({
                icon: 'error',
                title: 'DATE FROM MUST > UNTIL DATE'
            })
        }
    }

    $scope.applyfilter = function() {

        firebase.database().ref('/storage/').orderByChild('date').startAt(dfrom).endAt(duntil).on("value", function(snapshot) {
            $timeout(function() {
                $scope.$apply(function() {

                    let returnArr = [];

                    let ndata;


                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;

                        console.log(item)
                        angular.forEach(item.details, function(value, key) {
                            ndata = [{
                                "keyid": item.key,
                                "date": item.date,
                                "billofland": item.billofland,
                                "vendor": item.vendor,
                                "Carrier": item.details[key].Carrier,
                                "Description": item.details[key].Description,
                                "Length": item.details[key].Length,
                                "MaterialType": item.details[key]['Material Type'],
                                "OrderNumber": item.details[key]['Order No'],
                                "PONumber": item.details[key]['PO No'],
                                "QuantitySqFt": item.details[key]['Qty SqFt'],
                                "RollNumber": item.details[key]['Roll No'],
                                "SideMark": item.details[key].SideMark,
                                "Store": item.details[key].Store,
                                "Width": item.details[key].Width
                            }]

                            returnArr.push(ndata[0]);
                        });

                    });

                    $scope.tags = returnArr;

                    console.log(returnArr);

                });
            })
        });
    }

    firebase.database().ref('/storage/').orderByChild('date').on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {

                let returnArr = [];

                let ndata;

                console.log(snapshot.numChildren())

                let repeat = snapshot.numChildren();

                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    console.log(item)

                    ndata = [{
                        "keyid": item.key,
                        "date": item.date,
                        "billofland": item.billofland,
                        "vendor": item.vendor,
                        "bolurl":item.bolurl
                        }]
                returnArr.push(ndata[0]);

                  




                });

                $scope.tags = returnArr;

                console.log($scope.tags);

            });
        })
    });

    $('.overlay').hide();

    $scope.upload = function(tag) {
        $('#upload').modal('toggle');

        console.log(tag.key)

        let uidkey = tag.key;

        $("#files").change(function() {
            var storage = firebase.storage();

            var file = document.getElementById("files").files[0];
            console.log(file);

            var storageRef = firebase.storage().ref();

            //dynamically set reference to the file name
            var thisRef = storageRef.child(file.name);

            //put request upload file to firebase storage
            thisRef.put(file).then(function(snapshot) {
                console.log(snapshot);
            });

            //get request to get URL for uploaded file
            $('.overlay').show();


            setTimeout(() => {
                thisRef.getDownloadURL().then(function(url) {
                    console.log(url);
                    if (url) {

                        var storage = {
                            timstamp: tag.date,
                            date: tag.date,
                            billofland: tag.billofland,
                            vendor: tag.vendor,
                            details: tag.mdata,
                            file: url
                        }

                        console.log(storage, uidkey)



                        var updates = {};
                        updates['/storage/' + uidkey] = storage;
                        firebase.database().ref().update(updates);

                        if (updates) {
                            Toast.fire({
                                icon: 'success',
                                title: 'PDF UPLOADED'
                            }, $('.overlay').hide())

                            window.location.reload();

                        }

                    }
                })
            }, 5000);


        });



    }

    $scope.viewpdf = function(tag) {
        
        console.log(tag.bolurl);

        if (tag.bolurl) {
            var win = window.open(tag.bolurl, '_blank');
            if (win) {
                win.focus();
            }
        } else {
            Toast.fire({
                icon: 'error',
                title: 'NO PDF UPLOADED'
            })
        }
    }






});