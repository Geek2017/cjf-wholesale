angular.module('cjfw').controller('materialCtrl', function($scope, $timeout) {

    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 3000
    });

    if (localStorage.getItem('role') == 'viewer') {
        $('.edit').hide();
    }

    let dfrom;
    let duntil;

    $scope.datefrom = new Date();
    $scope.dateuntil = new Date();

    $scope.resetdate = function() {
        window.location.href = "#/";
        window.location.href = "#/material";
    }



    $scope.from = function() {


        var dfromiso = new Date($scope.datefrom).toISOString();
        console.log(dfromiso);
        dfrom = dfromiso;

        if ($scope.datefrom > $scope.dateuntil) {
            Toast.fire({
                icon: 'error',
                title: 'DATE FROM MUST > UNTIL DATE'
            })
        }
    }

    $scope.until = function() {


        var duntiliso = new Date($scope.dateuntil).toISOString();
        console.log(duntiliso);
        duntil = duntiliso;

        console.log(dfrom, duntil)

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



                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    console.log(item)
                    angular.forEach(item.details, function(value, key) {

                        const start = item.date
                        const end = new Date();

                        let startd = new Date(start).toLocaleDateString('en-us')
                        let endd = new Date(end).toLocaleDateString('en-us')
                        const diffInMs = new Date(endd) - new Date(startd)
                        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                        console.log(diffInDays)

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


    $scope.printhis = function() {
        $('#pmodal').kinziPrint({
            importCSS: true,
            importStyle: false,
            loadCSS: 'dist/css/print.css'
        });
    }

    $scope.getpdata = function(tag) {

        $('#modal-xl').modal('toggle');
        $scope.PONumber = tag.PONumber
        $scope.sidemark = tag.SideMark
        $scope.Carrier = tag.Carrier
        $scope.MaterialType = tag.MaterialType
        $scope.size = tag.Width + "x" + tag.Length
        $scope.recvdate = tag.date
        $scope.OrderNumber = tag.OrderNumber
        $scope.Store = tag.Store
        console.log(tag)
        $("#barcode").barcode(
            tag.PONumber,
            "code39", {
                barWidth: 4,
                barHeight: 100,
                fontSize: 14
            }
        );

    }

    var dtag;

    $scope.viewpdata = function(tag) {
        dtag = tag;
        $('#modalview').modal('toggle');

        console.log($scope.views)
        $scope.PONumber = tag.PONumber
        $scope.sidemark = tag.SideMark
        $scope.Carrier = tag.Carrier
        $scope.MaterialType = tag.MaterialType
        $scope.size = tag.Width + "x" + tag.Length
        $scope.recvdate = tag.date
        $scope.OrderNumber = tag.OrderNumber
        $scope.Store = tag.Store
        console.log(tag)

        $("#barcodeview").barcode(
            tag.PONumber,
            "code39", {
                barWidth: 4,
                barHeight: 100,
                fontSize: 14
            }
        );

    }

    $scope.updatedate = function() {

        // console.log(dtag)
        // var uid = dtag.keyid;

        // var storage = {
        //     timstamp: firebase.database.ServerValue.TIMESTAMP,
        //     date: $scope.curdate,
        //     billofland: $scope.billofland,
        //     vendor: $scope.vendor,
        //     details: mdata,
        // }


        // $scope.ladings = mdata;

        // $scope.recvdate = $scope.curdate
        // $('#modal-xl').modal('toggle');

        // var updates = {};
        // updates['/storage/' + uid] = storage;
        // firebase.database().ref().update(updates);

        Toast.fire({
            icon: 'success',
            title: 'Data Updated'
        })



    }


});