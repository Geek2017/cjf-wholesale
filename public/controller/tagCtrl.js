angular.module('cjfw').controller('tagCtrl', function($scope, $timeout) {


    let dfrom;
    let duntil;

    $scope.from = function() {


        var dfromiso = new Date($scope.datefrom).toISOString();
        console.log(dfromiso);
        dfrom = dfromiso;
    }

    $scope.until = function() {


        var duntiliso = new Date($scope.dateuntil).toISOString();
        console.log(duntiliso);
        duntil = duntiliso;

        console.log(dfrom, duntil)
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
                                "OrderNumber": item.details[key]['Order Number'],
                                "PONumber": item.details[key]['PO Number'],
                                "QuantitySqFt": item.details[key]['Quantity SqFt'],
                                "RollNumber": item.details[key]['Roll Number'],
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



                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    console.log(item)
                    angular.forEach(item.details, function(value, key) {
                        ndata = [{
                            "date": item.date,
                            "billofland": item.billofland,
                            "vendor": item.vendor,
                            "Carrier": item.details[key].Carrier,
                            "Description": item.details[key].Description,
                            "Length": item.details[key].Length,
                            "MaterialType": item.details[key]['Material Type'],
                            "OrderNumber": item.details[key]['Order Number'],
                            "PONumber": item.details[key]['PO Number'],
                            "QuantitySqFt": item.details[key]['Quantity SqFt'],
                            "RollNumber": item.details[key]['Roll Number'],
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


});