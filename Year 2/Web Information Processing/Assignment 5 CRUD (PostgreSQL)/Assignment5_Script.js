$(document).ready(() => {

    //hide other forms when page is ready
    $('#addItemForm').hide();
    $('#getItemData').hide();
    $('#updateItemData').hide();
    $('#deleteItemData').hide();

    $('#button1id').click(() => {
        $('#addUserForm').show();
        $('#getUserData').show();
        $('#updateUserData').show();
        $('#deleteUserData').show();

        $('#addItemForm').hide();
        $('#getItemData').hide();
        $('#updateItemData').hide();
        $('#deleteItemData').hide();
    });
    $('#button2id').click(() => {
        $('#addUserForm').hide();
        $('#getUserData').hide();
        $('#updateUserData').hide();
        $('#deleteUserData').hide();

        $('#addItemForm').show();
        $('#getItemData').show();
        $('#updateItemData').show();
        $('#deleteItemData').show();
    });
    $('#button3id').click(() => {
        $('#addUserForm').hide();
        $('#getUserData').hide();
        $('#updateUserData').hide();
        $('#deleteUserData').hide();

        $('#addItemForm').hide();
        $('#getItemData').hide();
        $('#updateItemData').hide();
        $('#deleteItemData').hide();
    });

    $('#addUserForm').submit((e) => {
        var user = {
            title: $('#title').val(),
            firstName: $('#firstname').val(),
            surname: $('#surname').val(),
            mobileNumber: $('#mobile').val(),
            emailAddress: $('#email').val(),
            homeDetails: {
                addressLine1: $('#homeaddress1').val(),
                addressLine2: $('#homeaddress2').val(),
                town: $('#hometown').val(),
                countycity: $('#homecountycity').val(),
                HomeEircode: $('#homeeircode').val(),
            },
            ShippingDetails: {
                addressLine1: $('#homeaddress1').val(),
                addressLine2: $('#homeaddress2').val(),
                town: $('#hometown').val(),
                countycity: $('#homecountycity').val(),
                HomeEircode: $('#homeeircode').val(),
            },
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/users',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: () => {
                alert('Data sent successfully!');
            }
        })
        e.preventDefault();
    });
    $('#addItemForm').submit((e) => {
        e.preventDefault();

        var item = {
            manufacturer: $('#manufacturer').val(),
            model: $('#model').val(),
            price: $('#price').val()
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/items',
            contentType: 'application/json',
            data: JSON.stringify(item),
            success: () => {
                alert('Data sent successfully!');
            }
        })
    });
    $('#getUserData').submit((e) => {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/users',
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
    $('#getItemData').submit((e) => {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/items',
            success: (data) => {
                const showItemDatabase = document.getElementById('showItemDatabase');
                showItemDatabase.value = JSON.stringify(data, null, 2);
            }
        })
            .done(function (data) {
                $('#showItemDatabase').val(JSON.stringify(data, null, 2)).trigger('input');
            });
        e.preventDefault();
    });

    //TODO: create ajax for U & D for users & items
    //TODO: create ajax for CRUD for orders
})