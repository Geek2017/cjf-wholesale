angular.module('cjfw').controller('storageCtrl', function ($scope, $timeout) {



    $scope.curdate = new Date();



    var Toast = Swal.mixin({
        toast: true,
        position: 'middle-center',
        showConfirmButton: false,
        timer: 4000
    });

    $('.overlay').hide();

    let bolurl;

    $scope.closemodal = function () {
        $('#upload').modal('toggle');
    }

    $('.progress-sm').hide()

    $scope.upload = function () {
        $('#upload').modal('toggle');

        // console.log(tag.key)

        // let uidkey = tag.key;

        $("#files").change(function (e) {
            // var storage = firebase.storage();
            $('.progress-sm').show();

            var file = e.target.files[0];

            var storageRef = firebase.storage().ref('bol_files/' + file.name).put(file)

            $scope.cancel = function () {
                storageRef.cancel();
                window.location.reload()
            }



            storageRef.on('state_changed',
                (snapshot) => {

                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    $('.progress-bar').css('width', progress + '%');
                },
                (error) => {
                    Toast.fire({
                        icon: 'error',
                        title: 'OPS:' + 'UPLOAD BOL FIRST'
                    })
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        bolurl = downloadURL;
                        Toast.fire({
                            icon: 'success',
                            title: 'Upload Successful'
                        })
                        setTimeout(() => {
                            $('#upload').modal('toggle');
                        }, 1000);
                    });
                }
            );


        });



    }

    let cnt0 = 0;

    $('.spinloading').hide()

    $scope.data = [
        { wth: "", lth: "", qty: "" }];


    $scope.addmaterial = function () {

        var data = {};
        data.wth = $scope.wth;
        data.lth = $scope.lth;
        $scope.data.push(data);

        $scope.wth = "";
        $scope.lth = "";

        cnt0++;
        console.log(cnt0)
    }



    // $("#dtsdata").keyup(function () {

    //     $('#dtsdata .form-group').each(function (i) {
    //         let width = $(this).find('input[name=wth]').val();
    //         let length = $(this).find('input[name=lth]').val();

    //         console.log(i)

    //         var v0=$scope.wth+i;
    //         var v1=$scope.lth+i;

    //         console.log(v0,v1)

    //         // $scope.qty+i == v0*v1;

    //         // console.log($scope.qty+i == v0*v1)


    //     });

    //     // $('#tblm tr').each(function (i, row) {
    //     //     var $quant = $(row).find('.val0').val();
    //     //     var $unitPrice = $(row).find('.val1').val();

    //     //     $(row).find('.qty').val($quant * $unitPrice);
    //     // });

    // });

    let txtb = [];

    $scope.savematerial = function () {

        if (bolurl) {

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
                            keyid: uid,
                            bolurl: bolurl
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
        } else {
            Toast.fire({
                icon: 'error',
                title: 'OPS:' + 'UPLOAD BOL FIRST'
            })
        }
    }


}).filter('limitDigit', function() {
    return function(num) {
        var str = ("" + parseFloat(num)).substring(0, 6);
        var lastChar = str[str.length - 1];
        return (lastChar === '.') ? str.substring(0, str.length - 1) : str;
    };
}).directive("forceMaxlength", [function() {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        var limit = parseInt(attrs.mdMaxlength);
        angular.element(elem).on("keydown", function() {
          if (this.value.length >= limit) {
            this.value = this.value.substr(0,limit-1);
            return false;
          }
        });
      }
    }
  }]);
 