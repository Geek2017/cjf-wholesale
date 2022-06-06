angular.module('cjfw').controller('storageCtrl', function($scope, $timeout) {

    var obj0, obj1;

    var marray;

    $scope.tojson0 = function(obj0) {
        var table0 = $('#tblstorage0').tableToJSON({
            extractor: function(cellIndex, $cell) {

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
        $("#addmaterial0").append(' <tr> <td><input type="text" class="form-control" ng-model="ponumber" placeholder="PO Number"></td><td><input type="text" class="form-control" ng-model="odernumber" placeholder="Order Number"></td><td><input type="text" class="form-control" ng-model="sidemark" placeholder="Side Mark"></td><td><input type="text" class="form-control" ng-model="width" placeholder="Width"></td><td><input type="text" class="form-control" ng-model="length" placeholder="Length"></td><td><input type="text" class="form-control" ng-model="rollnumber" placeholder="Roll Number"></td><td><input type="text" class="form-control" ng-model="quantity" placeholder="Quantity"></td></tr>');

        $("#addmaterial1").append('<tr><td><select class="form-control"><option value="0" selected>SELECT</option> <option value="A.P.T. Distributing">A.P.T. Distributing </option> <option value="Accurate Transport">Accurate Transport </option> <option value="AllState">AllState</option> <option value="APT">APT</option> <option value="Belknap">Belknap</option> <option value="Calhoun Distributio">Calhoun Distributio </option> <option value="Carpenter">Carpenter</option> <option value="Classic Tile">Classic Tile</option> <option value="Couristan Carpets">Couristan Carpets</option> <option value="Dalyn">Dalyn</option> <option value="Dedicated LLC">Dedicated LLC</option> <option value="Dixie">Dixie</option> <option value="Elias Wilf">Elias Wilf</option> <option value="Engineered">Engineered</option> <option value="Fabrica">Fabrica</option> <option value="Fishman">Fishman</option> <option value="JJ Haines">JJ Haines</option> <option value="Kane">Kane</option> <option value="knae">knae</option> <option value="Mannington">Mannington</option> <option value="Masland">Masland</option> <option value="Mohawk">Mohawk</option> <option value="Nourtex/Nourison RU">Nourtex/Nourison RU </option> <option value="PCC Ringgold">PCC Ringgold</option> <option value="Phenix">Phenix</option> <option value="Shaw">Shaw</option> <option value="Southwind">Southwind</option> <option value="Stanton">Stanton</option> <option value="Stark">Stark</option> <option value="UPS">UPS</option> <option value="Urato">Urato</option> </select></td><td> <select class="form-control" ng-model="materialtype"> <option disabled value="">SELECT</option> <option value="Acessories">Acessories</option> <option value="Area Rugs">Area Rugs</option> <option value="Cabinet">Cabinet</option> <option value="Carpet">Carpet</option> <option value="Carpet Tile">Carpet Tile</option> <option value="Ceilings">Ceilings</option> <option value="Ceramic Tile">Ceramic Tile</option> <option value="Displays">Displays</option> <option value="Fixtures">Fixtures</option> <option value="Installation Materials">Installation Materials</option> <option value="Laminates">Laminates</option> <option value="Pad">Pad</option> <option value="Rubber Tile">Rubber Tile</option> <option value="Runner">Runner</option> <option value="Stone">Stone</option> <option value="Training">Training</option> <option value="Unclassified">Unclassified</option> <option value="Vinyl">Vinyl</option> <option value="Vinyl Sheet">Vinyl Sheet</option> <option value="Vinyl Tile">Vinyl Tile</option> <option value="Wall Base">Wall Base</option> <option value="Wall Coverings">Wall Coverings</option> <option value="wood">wood</option> </select> </td><td> <select class="form-control" ng-model="store"> <option disabled value="">SELECT</option> <option value="Carpet Yard">Carpet Yard</option> <option value="EB-Carpets &amp; More East Brunswick">EB-Carpets &amp; More East Brunswick</option> <option value="Warehouse">Warehouse</option> <option value="SI-Carpets &amp; More Staten Island">SI-Carpets &amp; More Staten Island</option> <option value="OB-Carpets &amp; More Old Bridge">OB-Carpets &amp; More Old Bridge</option> </select> </td><td> <input type="text" class="form-control" ng-model="description" placeholder="Description"></td></tr>');
        cnt0++;
        console.log(cnt0)
    }

    $scope.revmaterial = function() {
        console.log(cnt0)
        if (cnt0 !== 0) {

            $('#addmaterial0 tr:last').remove();
            $('#addmaterial1 tr:last').remove();
            cnt0--;
        }
    }

    $scope.savematerial = function() {

        const mdata = angular.merge($scope.tojson0(obj0), $scope.tojson1(obj1));

        console.log(mdata);


        var uid = firebase.database().ref().child('/storage').push().key;

        var storage = {
            timstamp: firebase.database.ServerValue.TIMESTAMP,
            date: $scope.curdate,
            billofland: $scope.billofland,
            vendor: $scope.vendor,
            details: mdata,
        }



        var updates = {};
        updates['/storage/' + uid] = storage;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(storage);
            $scope.PONumber = mdata[0]["PO Number"];
            $scope.sidemark = mdata[0].SideMark
            $scope.Carrier = mdata[0].Carrier
            $scope.MaterialType = mdata[0]['Material Type']
            $scope.size = mdata[0].Width + "x" + mdata[0].Length
            $scope.recvdate = $scope.curdate
            $scope.OrderNumber = mdata[0]['Order Number']
            $scope.Store = mdata[0].Store


            $("#barcode").barcode(
                $scope.PONumber,
                "code39", {
                    barWidth: 5,
                    barHeight: 100,
                    fontSize: 14
                }
            );

            console.log($scope.PONumber)

            $('#modal-xl').modal('toggle');


        }

        $scope.printhis = function() {
            $('#pmodal').kinziPrint({
                importCSS: true,
                importStyle: false,
                loadCSS: 'dist/css/print.css'
            });
        }
    }
});