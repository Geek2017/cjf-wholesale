angular.module('cjfw').controller('storageCtrl', function($scope, $timeout) {

    var obj0, obj1;

    var marray;

    $scope.tojson0 = function(obj0) {
        var table0 = $('#tblstorage0').tableToJSON({
            extractor: function(cellIndex, $cell) {
                if (cellIndex == 7 || cellIndex == 8 || cellIndex == 9) {
                    return $cell.find('select').val()
                }
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table0;
    }

    $scope.tojson1 = function(obj1) {
        var table1 = $('#tblstorage1').tableToJSON({
            extractor: function(cellIndex, $cell) {
                if (cellIndex == 0 || cellIndex == 1 || cellIndex == 2) {
                    return $cell.find('select').val()
                }
                return $cell.find('input').val() || $cell.text();
            }
        })
        return table1;
    }



    let cnt0 = 0;

    $scope.addmaterial = function() {
        $("#addmaterial0").append('<tr><td><strong class="badge badge-danger">' + parseInt(cnt0 + 2) + '</strong></td><td><input type="text" class="form-control" placeholder="PO #" required></td><td><input type="text" class="form-control" placeholder="Order #" required></td><td><input type="text" class="form-control" placeholder="Side Mark" required></td><td><input type="number" class="form-control val0" placeholder="Width" required></td><td><input type="number" class="form-control val1" placeholder="Length" required></td><td><input type="text" class="form-control qty" placeholder="Qty.Sqft" required></td><td><input type="text" class="form-control" placeholder="Roll #" required></td><td><select class="form-control" style="font-size:14px;"> <option value="0" selected disabled>SELECT</option> <option value="UPS">UPS</option> <option value="DHL">DHL</option> <option value="FedEx">FedEx</option> </select></td><td> <select class="form-control" ng-model="materialtype" style="font-size:14px;"> <option disabled value="">SELECT</option> <option value="Acessories">Acessories</option> <option value="Area Rugs">Area Rugs</option> <option value="Cabinet">Cabinet</option> <option value="Carpet">Carpet</option> <option value="Carpet Tile">Carpet Tile</option> <option value="Ceilings">Ceilings</option> <option value="Ceramic Tile">Ceramic Tile</option> <option value="Displays">Displays</option> <option value="Fixtures">Fixtures</option> <option value="Installation Materials">Installation Materials</option> <option value="Laminates">Laminates</option> <option value="Pad">Pad</option> <option value="Rubber Tile">Rubber Tile</option> <option value="Runner">Runner</option> <option value="Stone">Stone</option> <option value="Training">Training</option> <option value="Unclassified">Unclassified</option> <option value="Vinyl">Vinyl</option> <option value="Vinyl Sheet">Vinyl Sheet</option> <option value="Vinyl Tile">Vinyl Tile</option> <option value="Wall Base">Wall Base</option> <option value="Wall Coverings">Wall Coverings</option> <option value="wood">wood</option> </select> </td><td> <select class="form-control" ng-model="store"> <option disabled value="" style="font-size:14px;">SELECT</option> <option value="Carpet Yard">Carpet Yard</option> <option value="EB-Carpets &amp; More East Brunswick">EB-Carpets &amp; More East Brunswick</option> <option value="Warehouse">Warehouse</option> <option value="SI-Carpets &amp; More Staten Island">SI-Carpets &amp; More Staten Island</option> <option value="OB-Carpets &amp; More Old Bridge">OB-Carpets &amp; More Old Bridge</option> </select> </td><td> <input type="text" class="form-control" ng-model="description" placeholder="Description"> </td></tr>');


        cnt0++;
        console.log(cnt0)
    }

    $scope.revmaterial = function() {
        console.log(cnt0)
        if (cnt0 !== 0) {

            $('#addmaterial0 tr:last').remove();

            cnt0--;
        }
    }

    $("#tblm").keyup(function() {

        $('#tblm tr').each(function(i, row) {
            var $quant = $(row).find('.val0').val();
            var $unitPrice = $(row).find('.val1').val();

            $(row).find('.qty').val($quant * $unitPrice);
        });

    });


    $scope.savematerial = function() {

        const mdata = angular.merge($scope.tojson0(obj0));

        console.log(mdata);


        var uid = firebase.database().ref().child('/storage').push().key;

        var storage = {
            timstamp: firebase.database.ServerValue.TIMESTAMP,
            date: $scope.curdate,
            billofland: $scope.billofland,
            vendor: $scope.vendor,
            details: mdata,
        }


        $scope.ladings = mdata;

        console.log(storage);

        $scope.recvdate = $scope.curdate
        $('#modal-xl').modal('toggle');

        var updates = {};
        updates['/storage/' + uid] = storage;
        firebase.database().ref().update(updates);

        let repeat = mdata.length;

        console.log(repeat)

        console.log(mdata);

        if (updates) {
            console.log(updates)
            setTimeout(() => {
                if (repeat) {

                    var cntr = '#container';
                    var bids = 'barcode';

                    angular.forEach(mdata, function(value, key) {
                        console.log(key + 1)

                        let nc = cntr + parseInt(key + 1);

                        var ids = bids + key;

                        console.log(nc, ids);

                        $(nc).append($("<div id='" + ids + "'></div>"));

                        setTimeout(() => {
                            $('#' + ids).barcode(
                                mdata[key]['Roll No'],
                                "code39", {
                                    barWidth: 4,
                                    barHeight: 100,
                                    fontSize: 14
                                }
                            );

                            console.log(mdata[key]['Roll No']);
                        }, 500);


                    });
                }
            }, 500);
        }

        $scope.printhis = function() {
            $('#pmodal').kinziPrint({
                importCSS: true,
                loadCSS: 'dist/css/print.css'
            });
        }
    }


});