angular.module('cjfw').controller('storageCtrl', function($scope, $timeout) {

    var obj0, obj1;

    var marray;

    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 4000
    });

    var jsond=[];
    let txtb=[];

    $scope.showme=function(){

        let drop=[];

        $('#dtsdata .form-group').each(function() {
            var d0 = $(this).find('input').val();
            var d1 = $(this).find('option:selected').val();
        
           
        

            if(d0){
                txtb.push(d0);
            console.log('d0: ' +  d0);

            }else{
                if(d1){
                    txtb.push(d1);
                    console.log('d1: ' +  d1);
                }
               
            }

      });

    //   $('#dtsdata .form-group  option:selected').each(function() {
       
    //     var dropdown = $(this).val();
      
    //     console.log('dropdown: ' + dropdown);

     
    //     if(dropdown){
    //         drop.push(dropdown);
    //     }
    //      });

      setTimeout(() => {
        console.log(txtb)
      }, 3000);
    }


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

    $('.overlay').hide();

    $scope.upload = function() {
        $('#upload').modal('toggle');

        // console.log(tag.key)

        // let uidkey = tag.key;

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

            thisRef.getDownloadURL().then(function(url) {
                console.log(url);
               

                Toast.fire({
                    icon: 'success',
                    title: 'PDF UPLOADED'
                }, $('.overlay').hide(), $('#upload').modal('toggle'))

            })
        });



    }

    let cnt0 = 0;

    $scope.addmaterial = function() {
        $("#dtsdata").append(' <div class="card" > <div class="card-header"> <h3 class="card-title">Details:</h3> <div class="card-tools"> <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i class="fas fa-minus"></i> </button> <button type="button" class="btn btn-tool" data-card-widget="remove"> <i class="fas fa-times"></i> </button> </div></div><div class="card-body"> <div class="row"> <div class="col-md-2"> <div class="form-group"> <label>PO No</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." > </div></div><div class="col-md-2"> <div class="form-group"> <label>Order No</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." > </div></div><div class="col-md-2"> <div class="form-group"> <label>SideMark</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." > </div></div><div class="col-md-2"> <div class="form-group"> <label>Width</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." > </div></div><div class="col-md-2"> <div class="form-group"> <label>Length</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." > </div></div><div class="col-md-2"> <div class="form-group"> <label>Qty SqFt</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." > </div></div><div class="col-md-2"> <div class="form-group"> <label>Roll No</label> <input type="text" name="txtd" class="form-control" placeholder="Enter ..." > </div></div><div class="col-md-2"> <div class="form-group"> <label>Store</label> <select name="txtd" class="form-control" style="font-size:14px;"> <option disabled value="" >SELECT</option> <option value="Carpet Yard">Carpet Yard</option> <option value="EB-Carpets &amp; More East Brunswick">EB-Carpets &amp; More East Brunswick</option> <option value="Warehouse">Warehouse</option> <option value="SI-Carpets &amp; More Staten Island">SI-Carpets &amp; More Staten Island</option> <option value="OB-Carpets &amp; More Old Bridge">OB-Carpets &amp; More Old Bridge</option> </select> </div></div><div class="col-md-2"> <div class="form-group"> <label>Material Type</label> <select name="txtd" class="form-control" ng-model="materialtype" style="font-size:14px;"> <option disabled value="">SELECT</option> <option value="Acessories">Acessories</option> <option value="Area Rugs">Area Rugs</option> <option value="Cabinet">Cabinet</option> <option value="Carpet">Carpet</option> <option value="Carpet Tile">Carpet Tile</option> <option value="Ceilings">Ceilings</option> <option value="Ceramic Tile">Ceramic Tile</option> <option value="Displays">Displays</option> <option value="Fixtures">Fixtures</option> <option value="Installation Materials">Installation Materials</option> <option value="Laminates">Laminates</option> <option value="Pad">Pad</option> <option value="Rubber Tile">Rubber Tile</option> <option value="Runner">Runner</option> <option value="Stone">Stone</option> <option value="Training">Training</option> <option value="Unclassified">Unclassified</option> <option value="Vinyl">Vinyl</option> <option value="Vinyl Sheet">Vinyl Sheet</option> <option value="Vinyl Tile">Vinyl Tile</option> <option value="Wall Base">Wall Base</option> <option value="Wall Coverings">Wall Coverings</option> <option value="wood">wood</option> </select> </div></div><div class="col-md-2"> <div class="form-group"> <label>Carrier</label> <select name="txtd" class="form-control" style="font-size:14px;"> <option value="0" selected disabled>SELECT</option> <option value="UPS">UPS</option> <option value="DHL">DHL</option> <option value="FedEx">FedEx</option> </select> </div></div><div class="col-md-4"> <div class="form-group"> <label>Description</label> <input type="text" name="details" class="form-control" placeholder="Enter ..." > </div></div></div></div></div>');


        cnt0++;
        console.log(cnt0)
    }

    $scope.revmaterial = function() {
        console.log(cnt0)
        if (cnt0 !== 0) {


            $("#adtsdata").children("div[id=append]:last").fadeOut();

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


        // var uid = firebase.database().ref().child('/storage').push().key;

        // var storage = {
        //     timstamp: firebase.database.ServerValue.TIMESTAMP,
        //     date: $scope.curdate,
        //     billofland: $scope.billofland,
        //     vendor: $scope.vendor,
        //     details: mdata,
        // }


        // $scope.ladings = mdata;

        // console.log(storage);

        // $scope.recvdate = $scope.curdate
        // $('#modal-xl').modal('toggle');

        // var updates = {};
        // updates['/storage/' + uid] = storage;
        // firebase.database().ref().update(updates);

        // let repeat = mdata.length;

        // console.log(repeat)

        // console.log(mdata);

        // if (updates) {
        //     console.log(updates)
        //     setTimeout(() => {
        //         if (repeat) {

        //             var cntr = '#container';
        //             var bids = 'barcode';

        //             angular.forEach(mdata, function(value, key) {
        //                 console.log(key + 1)

        //                 let nc = cntr + parseInt(key + 1);

        //                 var ids = bids + key;

        //                 console.log(nc, ids);

        //                 $(nc).append($("<div id='" + ids + "'></div>"));

        //                 setTimeout(() => {
        //                     $('#' + ids).barcode(
        //                         mdata[key]['Roll No'],
        //                         "code39", {
        //                             barWidth: 4,
        //                             barHeight: 100,
        //                             fontSize: 14
        //                         }
        //                     );

        //                     console.log(mdata[key]['Roll No']);
        //                 }, 500);


        //             });
        //         }
        //     }, 500);
        // }

        // $scope.printhis = function() {
        //     $('#pmodal').kinziPrint({
        //         importCSS: true,
        //         loadCSS: 'dist/css/print.css'
        //     });
        // }
    }


});