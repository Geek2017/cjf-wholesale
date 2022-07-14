angular.module('cjfw').controller('storageCtrl', function ($scope, $timeout) {





    var obj0, obj1;

    var marray;

    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 4000
    });

    $('.overlay').hide();

    $scope.upload = function () {
        $('#upload').modal('toggle');

        // console.log(tag.key)

        // let uidkey = tag.key;

        $("#files").change(function () {
            var storage = firebase.storage();

            var file = document.getElementById("files").files[0];
            console.log(file);

            var storageRef = firebase.storage().ref();

            //dynamically set reference to the file name
            var thisRef = storageRef.child(file.name);

            //put request upload file to firebase storage
            thisRef.put(file).then(function (snapshot) {
                console.log(snapshot);
            });

            //get request to get URL for uploaded file
            $('.overlay').show();

            thisRef.getDownloadURL().then(function (url) {
                console.log(url);


                Toast.fire({
                    icon: 'success',
                    title: 'PDF UPLOADED'
                }, $('.overlay').hide(), $('#upload').modal('toggle'))

            })
        });



    }

    let cnt0 = 0;

    $('.spinloading').hide()

    $scope.addmaterial = function () {
        $("#dtsdata").append('<div class="card"> <div class="card-header"><h3 class="card-title">Details:</h3> <div class="card-tools"> <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i class="fas fa-minus"></i> </button> </div></div><div class="card-body"> <div class="row"> <div class="col-md-2"> <div class="form-group"> <label>PO No</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." required> </div></div><div class="col-md-2"> <div class="form-group"> <label>Order No</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." required> </div></div><div class="col-md-2"> <div class="form-group"> <label>SideMark</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." required> </div></div><div class="col-md-2"> <div class="form-group"> <label>Width</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." required> </div></div><div class="col-md-2"> <div class="form-group"> <label>Length</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." required> </div></div><div class="col-md-2"> <div class="form-group"> <label>Qty SqFt</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." required> </div></div><div class="col-md-2"> <div class="form-group"> <label>Roll No</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." required> </div></div><div class="col-md-2"> <div class="form-group"> <label>Store</label> <select name="txtd" class="form-control" style="font-size:14px;" required> <option disabled value="">SELECT</option> <option value="Carpet Yard">Carpet Yard</option> <option value="EB-Carpets &amp; More East Brunswick"> EB-Carpets &amp; More East Brunswick</option> <option value="Warehouse">Warehouse</option> <option value="SI-Carpets &amp; More Staten Island"> SI-Carpets &amp; More Staten Island</option> <option value="OB-Carpets &amp; More Old Bridge">OB-Carpets &amp; More Old Bridge</option> </select> </div></div><div class="col-md-2"> <div class="form-group"> <label>Material Type</label> <select name="txtd" class="form-control" ng-model="materialtype" style="font-size:14px;" required> <option disabled value="">SELECT</option> <option value="Acessories">Acessories</option> <option value="Area Rugs">Area Rugs</option> <option value="Cabinet">Cabinet</option> <option value="Carpet">Carpet</option> <option value="Carpet Tile">Carpet Tile</option> <option value="Ceilings">Ceilings</option> <option value="Ceramic Tile">Ceramic Tile</option> <option value="Displays">Displays</option> <option value="Fixtures">Fixtures</option> <option value="Installation Materials">Installation Materials </option> <option value="Laminates">Laminates</option> <option value="Pad">Pad</option> <option value="Rubber Tile">Rubber Tile</option> <option value="Runner">Runner</option> <option value="Stone">Stone</option> <option value="Training">Training</option> <option value="Unclassified">Unclassified</option> <option value="Vinyl">Vinyl</option> <option value="Vinyl Sheet">Vinyl Sheet</option> <option value="Vinyl Tile">Vinyl Tile</option> <option value="Wall Base">Wall Base</option> <option value="Wall Coverings">Wall Coverings</option> <option value="wood">wood</option> </select> </div></div><div class="col-md-2"> <div class="form-group"> <label>Carrier</label> <select name="txtd" class="form-control" style="font-size:14px;" required> <option value="0" selected disabled>SELECT</option> <option value="UPS">UPS</option> <option value="DHL">DHL</option> <option value="FedEx">FedEx</option> </select> </div></div><div class="col-md-4"> <div class="form-group"> <label>Description</label> <input type="text" name="details" class="form-control" placeholder="Enter ..." required> </div></div></div></div></div>');


        cnt0++;
        console.log(cnt0)
    }

    $scope.revmaterial = function () {
        console.log(cnt0)
        if (cnt0 !== 0) {


            $("#adtsdata").children("div[id=append]:last").fadeOut();

            cnt0--;
        }
    }

    $("#tblm").keyup(function () {

        $('#tblm tr').each(function (i, row) {
            var $quant = $(row).find('.val0').val();
            var $unitPrice = $(row).find('.val1').val();

            $(row).find('.qty').val($quant * $unitPrice);
        });

    });


    let txtb = [];




    $scope.savematerial = function () {

        $('.spinloading').show()

        $(":submit").attr("disabled", true);

        $('#dtsdata .form-group').each(function () {
            var d0 = $(this).find('input').val();
            var d1 = $(this).find('option:selected').val();

            if (d0) {
                txtb.push(d0);
                console.log('d0: ' + d0);

            } else {
                if (d1) {
                    txtb.push(d1);
                    console.log('d1: ' + d1);
                }

            }

        });

        try {
            setTimeout(() => {

                console.log(txtb)

                if (txtb.length > 4) {


                    function createGroups(arr, numGroups) {
                        try {
                            const perGroup = Math.ceil(arr.length / numGroups);
                            return new Array(numGroups)
                                .fill('')
                                .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
                        } catch (error) {
                            txtb = [];
                            console.log(txtb);
                            $('input').val("");
                        }

                    }


                    console.log(createGroups(txtb, txtb.length / 11));

                    var fval = createGroups(txtb, txtb.length / 11);

                    var frtval = [];
                    var frt
                    angular.forEach(fval, function (value, key) {
                        console.log(value)

                        frt = {
                            PONo: value[0],
                            OrderNo: value[1],
                            Sidemark: value[2],
                            Width: value[3],
                            Length: value[4],
                            QtySqft: value[5],
                            RollNo: value[6],
                            Store: value[7],
                            Material: value[8],
                            Carrier: value[9],
                            Description: value[10]
                        }

                        console.log(frt);

                        frtval.push(frt);
                    });

                    var uid = firebase.database().ref().child('/storage').push().key;

                    var storage = {
                        timstamp: firebase.database.ServerValue.TIMESTAMP,
                        date: $scope.curdate,
                        billofland: $scope.billofland,
                        vendor: $scope.vendor,
                        details: frtval,
                        keyid: uid
                    }

                    $scope.lads = angular.merge(frtval);

                    $scope.recvdate = $scope.curdate


                    var updates = {};
                    updates['/storage/' + uid] = storage;
                    firebase.database().ref().update(updates);

                    let repeat = fval.length;

                    console.log(repeat)


                    if (updates) {
                        var inHTML = "";
                        $.each(frtval, function (index, value) {
                            var newItem = '<tr> <td colspan="2"> <h1 class="text-right" style="font-size: 100px;"><strong>' + value.PONo + '</strong> </h1> </td></tr><tr> <td class="text-left" style="font-size: 40px;"><strong>' + value.OrderNo + '</strong> <br></td><td></td></tr><tr> <td class="text-left" style="font-size: 20px;"><strong>CARRIER:' + value.Carrier + '</strong> </td><td></td></tr><tr> <td class="text-left" style="font-size: 20px;"><strong>STORE:' + value.Store + '</strong> </td><td class="text-right" style="font-size: 20px;"><strong>PO NUMBER:' + value.PONo + '</strong> </td></tr> <tr> <td class="text-left" style="font-size: 20px;"><strong>MATERIAL DESC:' + value.Description + '</strong> </td><td></td></tr><tr> <td class="text-left" style="font-size: 20px;">WAREHOUSE POSITION:<strong> 60-2</strong> </td><td></td></tr> <tr> <hr> </tr><tr> <td colspan="2"> <hr> <div class="float-right"> <div id="container' + parseInt(index + 1) + '"> </div></div></td></tr>'

                            inHTML += newItem;

                            console.log(parseInt(index + 1))
                        });

                        console.log(inHTML)

                        $("#dynamicTable").html(inHTML);

                        $('#modal-xl').modal('toggle');

                        console.log(updates);

                        setTimeout(() => {
                            if (repeat) {

                                var cntr = '#container';
                                var bids = 'barcode';

                                angular.forEach(frtval, function (value, key) {
                                    console.log(key + 1)

                                    let nc = cntr + parseInt(key + 1);

                                    var ids = bids + key;

                                    console.log(nc, ids);

                                    $(nc).append($("<div id='" + ids + "'></div>"));

                                    setTimeout(() => {
                                        $('#' + ids).barcode(
                                            frtval[key].PONo,
                                            "code39", {
                                            barWidth: 4,
                                            barHeight: 100,
                                            fontSize: 14
                                        }
                                        );

                                        console.log(frtval[key].PONo);
                                        $('.spinloading').hide()
        
                                        $(":submit").attr("disabled", false);
                                    }, 100);


                                });
                            }
                        }, 1000);

                    }

                    $scope.printhis = function () {
                        $('#pmodal').kinziPrint({
                            importCSS: true,
                            loadCSS: 'dist/css/print.css'
                        });
                    }

                } else {
                    txtb = [];
                    console.log(txtb)
                }







            }, 3000);
        } catch (error) {
            Toast.fire({
                icon: 'success',
                title: error
            }, setTimeout(() => {
                window.location.reload();
            }, 2000))
        }





    }


});