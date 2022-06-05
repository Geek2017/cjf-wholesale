angular.module('cjfw').controller('tagCtrl', function($scope, $timeout) {

    // $('#modal-xl').modal('toggle');

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
        $('.hidef').hide()
        $('modal,.modal').printThis();
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
                barWidth: 5,
                barHeight: 100,
                fontSize: 14
            }
        );

    }

    // $('#textInput').on('click', function() {
    //     $("#barcode").barcode(
    //         this.value,
    //         "code39", {
    //             barWidth: 2,
    //             barHeight: 100,
    //             fontSize: 14
    //         }
    //     );
    // });
    // $('#textInput').trigger('click');


    //window.print();
});