$(document).ready(function() {

    $('#addUserForm').submit((e) => {
        var user = {
            Title: $('#title').val(),
            FName: $('#firstname').val(),
            SName: $('#surname').val(),
            Mobile: $('#mobile').val(),
            EmailAddr: $('#email').val(),
            HomeAddrL1: $('#homeaddress1').val(),
            HomeAddrL2: $('#homeaddress2').val(),
            HomeTown: $('#hometown').val(),
            HomeCountyCity: $('#homecountycity').val(),
            HomeEircode: $('#homeeircode').val(),
            ShipAddrL1: $('#homeaddress1').val(),
            ShipAddrL2: $('#homeaddress2').val(),
            ShipTown: $('#hometown').val(),
            ShipCountyCity: $('#homecountycity').val(),
            ShipEircode: $('#homeeircode').val(),
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/',
            data: user,
            success: () => {
                alert('Data sent successfully!');
            }
        })
        e.preventDefault();
    });

    $('#getUserData').submit((e) => {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/',
            success: (data) => {
                const showUserDatabase = document.getElementById('showUserDatabase');
                showUserDatabase.value = JSON.stringify(data, null, 2);
            }
        })
            .done(function (data) {
                $('#showUserDatabase').val(JSON.stringify(data, null, 2)).trigger('input');
            });
        e.preventDefault();
    });

    $("#showUserDatabase").on("input", function () {
        this.style.height = (this.scrollHeight) + "px;overflow-y:hidden;";
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

    $('#updateUserData').submit((e) => {
        var update = {
            EmailAddr: $('#emailupd').val(),
            ShipAddrL1: $('#shippingaddress1').val(),
            ShipAddrL2: $('#shippingaddress2').val(),
            ShipTown: $('#shippingtown').val(),
            ShipCountyCity: $('#shippingcountycity').val(),
            ShipEircode: $('#shippingeircode').val(),
        };
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:5000/',
            data: update,
            success: () => {
                alert('Successfully Updated Shipping Address!');
            }
        });
        e.preventDefault();
    });

    $('#deleteUserData').submit((e) => {
        var del = {
            FName: $('#firstnamedel').val(),
            Mobile: $('#mobiledel').val(),
            EmailAddr: $('#emaildel').val(),
        };
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:5000/',
            data: del,
            success: () => {
                alert('User Deleted!');
            }
        });
        e.preventDefault();
    });
});