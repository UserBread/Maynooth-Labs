$(document).ready(() => {

    //hide other forms when page is ready
    $('#addLandLordForm').hide();
    $('#getLandLordData').hide();
    $('#updateLandLordData').hide();
    $('#deleteLandLordData').hide();

    $('#addContractForm').hide();
    $('#getContractForm').hide();
    $('#updateContractForm').hide();
    $('#deleteContractForm').hide();

    //show the form when the button is clicked
    $('#tenantButton').click(() => {
        $('#addTenantForm').show();
        $('#getTenantData').show();
        $('#updateTenantData').show();
        $('#deleteTenantData').show();

        $('#addLandLordForm').hide();
        $('#getLandLordData').hide();
        $('#updateLandLordData').hide();
        $('#deleteLandLordData').hide();

        $('#addContractForm').hide();
        $('#getContractForm').hide();
        $('#updateContractForm').hide();
        $('#deleteContractForm').hide();

    });
    $('#landlordButton').click(() => {
        $('#addTenantForm').hide();
        $('#getTenantData').hide();
        $('#updateTenantData').hide();
        $('#deleteTenantData').hide();

        $('#addLandLordForm').show();
        $('#getLandLordData').show();
        $('#updateLandLordData').show();
        $('#deleteLandLordData').show();

        $('#addContractForm').hide();
        $('#getContractForm').hide();
        $('#updateContractForm').hide();
        $('#deleteContractForm').hide();
    });
    $('#contractButton').click(() => {
        $('#addTenantForm').hide();
        $('#getTenantData').hide();
        $('#updateTenantData').hide();
        $('#deleteTenantData').hide();

        $('#addLandLordForm').hide();
        $('#getLandLordData').hide();
        $('#updateLandLordData').hide();
        $('#deleteLandLordData').hide();

        $('#addContractForm').show();
        $('#getContractForm').show();
        $('#updateContractForm').show();
        $('#deleteContractForm').show();
    });

    //Tenant form
    //hide other title when page is ready
    $('#otherTitleT').hide();

    //show other title when other is selected
    $('#titleT').change(() => {
        if ($('#titleT').val() === 'Other') {
            $('#otherTitleT').show();
        }
        else {
            $('#otherTitleT').hide();
        }
    });

    //submit the form
    $('#addTenantForm').submit((e) => {
        var tenant = {};
        //if other is selected, get the value of the other input field
        if ($('#titleT').val() === 'Other') {
            tenant = {
                title: $('#otherT').val(),
                firstName: $('#firstname').val(),
                surname: $('#surname').val(),
                phoneNumber: $('#phonenumber').val(),
                emailAddress: $('#emailaddress').val(),
                homeAddress: {
                    addressLine1: $('#addressline1').val(),
                    addressLine2: $('#addressline2').val(),
                    town: $('#town').val(),
                    countycity: $('#countycity').val(),
                    Eircode: $('#eircode').val(),
                },
            };
        }

        //if other is not selected, get the value of the selected title
        else {
            tenant = {
                title: $('#titleT').val(),
                firstName: $('#firstname').val(),
                surname: $('#surname').val(),
                phoneNumber: $('#phonenumber').val(),
                emailAddress: $('#emailaddress').val(),
                homeAddress: {
                    addressLine1: $('#addressline1').val(),
                    addressLine2: $('#addressline2').val(),
                    town: $('#town').val(),
                    countycity: $('#countycity').val(),
                    Eircode: $('#eircode').val(),
                },
            };
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/tenant',
            contentType: 'application/json',
            data: JSON.stringify(tenant),
            success: () => {
                alert('Data sent successfully!');
            }
        })
        e.preventDefault();
    });
    $('#getTenantData').submit((e) => {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/tenant',
            success: (data) => {
                const tenantData = document.getElementById('tenantData');
                tenantData.value = JSON.stringify(data, null, 2);
            }
        })
        e.preventDefault();
    });

    //hide other tenant boxes when page is ready   
    $('#newTTitleBox').hide();
    $('#newTFirstnameBox').hide();
    $('#newTSurnameBox').hide();
    $('#newTNumberBox').hide();
    $('#newTAddressLine1Box').hide();
    $('#newTAddressLine2Box').hide();
    $('#newTTownBox').hide();
    $('#newTCountyCityBox').hide();
    $('#newTEircodeBox').hide();

    //show other tenant boxes depending on the boxes checked
    $("#checkboxes-0").change(function () {
        if (this.checked) {
            $("#newTTitleBox").show();
        } else {
            $("#newTTitleBox").hide();
        }
    });
    $("#checkboxes-1").change(function () {
        if (this.checked) {
            $("#newTFirstnameBox").show();
        } else {
            $("#newTFirstnameBox").hide();
        }
    });
    $("#checkboxes-2").change(function () {
        if (this.checked) {
            $("#newTSurnameBox").show();
        } else {
            $("#newTSurnameBox").hide();
        }
    });
    $("#checkboxes-3").change(function () {
        if (this.checked) {
            $("#newTNumberBox").show();
        } else {
            $("#newTNumberBox").hide();
        }
    });
    $("#checkboxes-4").change(function () {
        if (this.checked) {
            $('#newTAddressLine1Box').show();
            $('#newTAddressLine2Box').show();
            $('#newTTownBox').show();
            $('#newTCountyCityBox').show();
            $('#newTEircodeBox').show();
        } else {
            $('#newTAddressLine1Box').hide();
            $('#newTAddressLine2Box').hide();
            $('#newTTownBox').hide();
            $('#newTCountyCityBox').hide();
            $('#newTEircodeBox').hide();
        }
    });
    $('#updateTenantData').submit((e) => {
        var tenant = {
            emailAddress: $('#currentTEmailAddress').val()
        };
        if ($('input[id="checkboxes-0"]:checked').length === 1) {
            tenant.title = $('#newTTitle').val();
        }
        if ($('input[id="checkboxes-1"]:checked').length === 1) {
            tenant.firstName = $('#newTFirstname').val();
        }
        if ($('input[id="checkboxes-2"]:checked').length === 1) {
            tenant.surname = $('#newTSurname').val();
        }
        if ($('input[id="checkboxes-3"]:checked').length === 1) {
            tenant.phoneNumber = $('#newTNumber').val();
        }
        if ($('input[id="checkboxes-4"]:checked').length === 1) {
            tenant.homeAddress.addressLine1 = $('#newTAddressLine1').val();
            tenant.homeAddress.addressLine2 = $('#newTAddressLine2').val();
            tenant.homeAddress.town = $('#newTTown').val();
            tenant.homeAddress.countycity = $('#newTCountyCity').val();
            tenant.homeAddress.eircode = $('#newTEircode').val();
        }
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/api/tenant',
            contentType: 'application/json',
            data: JSON.stringify(tenant),
            success: () => {
                alert('Data updated successfully!');
            }
        })
        e.preventDefault();
    });

    $('#deleteTenantData').submit((e) => {
        var tenant = {
            emailAddress: $('#delTemail').val()
        };
        console.log(tenant);
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/api/tenant',
            contentType: 'application/json',
            data: JSON.stringify(tenant),
            success: () => {
                alert('Data deleted successfully!');
            }
        })
        e.preventDefault();
    });

    //Landlord form
    $('#otherTitleLL').hide();

    //show other title when other is selected
    $('#titleLL').change(() => {
        if ($('#titleLL').val() === 'Other') {
            $('#otherTitleLL').show();
        }
        else {
            $('#otherTitleLL').hide();
        }
    });

    $('#addLandLordForm').submit((e) => {

        //check if the permission to rent and permission to contact is selected 
        if ($('input[name="permissionToRent"]:checked').length !== 1) {
            alert('Please select one option.');
            return;
        }
        if ($('input[name="permissionToContact"]:checked').length !== 1) {
            alert('Please select one option.');
            return;
        }
        var landlord = {}

        //if other is selected, get the value of the other input field
        if ($('#titleLL').val() === 'Other') {
            landlord = {
                title: $('#otherLL').val(),
                firstName: $('#LLfirstname').val(),
                surname: $('#LLsurname').val(),
                phoneNumber: $('#LLnumber').val(),
                emailAddress: $('#LLemailAddress').val(),
                homeAddress: {
                    addressLine1: $('#LLaddressline1').val(),
                    addressLine2: $('#LLaddressline2').val(),
                    town: $('#LLtown').val(),
                    countycity: $('#LLcountycity').val(),
                    Eircode: $('#LLeircode').val(),
                },
                permissionToRent: $('input[name="permissionToRent"]:checked').val(),
                permissionToContact: $('input[name="permissionToContact"]:checked').val(),
            }
        }
        //if other is not selected, get the value of the selected title
        else {
            landlord = {
                title: $('#titleLL').val(),
                firstName: $('#LLfirstname').val(),
                surname: $('#LLsurname').val(),
                dob: $('#LLdob').val(),
                phoneNumber: $('#LLnumber').val(),
                emailAddress: $('#LLemailAddress').val(),
                homeAddress: {
                    addressLine1: $('#LLaddressline1').val(),
                    addressLine2: $('#LLaddressline2').val(),
                    town: $('#LLtown').val(),
                    countycity: $('#LLcountycity').val(),
                    Eircode: $('#LLeircode').val(),
                },
                permissionToRent: $('input[name="permissionToRent"]:checked').val(),
                permissionToContact: $('input[name="permissionToContact"]:checked').val(),
            }
        }
        console.log(landlord);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/landlord',
            contentType: 'application/json',
            data: JSON.stringify(landlord),
            success: () => {
                alert('Data sent successfully!');
            }
        })
        e.preventDefault();
    });
    $('#getLandLordData').submit((e) => {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/landlord',
            success: (data) => {
                const landlordData = document.getElementById('landlordData');
                landlordData.value = JSON.stringify(data, null, 2);
            }
        })
        e.preventDefault();
    });

    //hide other landlord boxes when page is ready
    $('#newLLTitleBox').hide()
    $('#newLLFirstnameBox').hide()
    $('#newLLSurnameBox').hide()
    $('#newLLDobBox').hide()
    $('#newLLNumberBox').hide()
    $('#newLLAddressLine1Box').hide()
    $('#newLLAddressLine2Box').hide()
    $('#newLLTownBox').hide()
    $('#newLLCountyCityBox').hide()
    $('#newLLEircodeBox').hide()
    $('#newLLPermissionToRentBox').hide()
    $('#newLLPermissionToContactBox').hide()

    //show other landlord boxes depending on the boxes checked
    $("#LLcheckboxes-0").change(function () {
        if (this.checked) {
            $("#newLLTitleBox").show();
        } else {
            $("#newLLTitleBox").hide();
        }
    });
    $("#LLcheckboxes-1").change(function () {
        if (this.checked) {
            $("#newLLFirstnameBox").show();
        } else {
            $("#newLLFirstnameBox").hide();
        }
    });
    $("#LLcheckboxes-2").change(function () {
        if (this.checked) {
            $("#newLLSurnameBox").show();
        } else {
            $("#newLLSurnameBox").hide();
        }
    });
    $("#LLcheckboxes-3").change(function () {
        if (this.checked) {
            $("#newLLDobBox").show();
        } else {
            $("#newLLDobBox").hide();
        }
    });
    $("#LLcheckboxes-4").change(function () {
        if (this.checked) {
            $("#newLLNumberBox").show();
        } else {
            $("#newLLNumberBox").hide();
        }
    });
    $("#LLcheckboxes-5").change(function () {
        if (this.checked) {
            $('#newLLAddressLine1Box').show();
            $('#newLLAddressLine2Box').show();
            $('#newLLTownBox').show();
            $('#newLLCountyCityBox').show();
            $('#newLLEircodeBox').show();
        } else {
            $('#newLLAddressLine1Box').hide();
            $('#newLLAddressLine2Box').hide();
            $('#newLLTownBox').hide();
            $('#newLLCountyCityBox').hide();
            $('#newLLEircodeBox').hide();
        }
    });
    $("#LLcheckboxes-6").change(function () {
        if (this.checked) {
            $("#newLLPermissionToRentBox").show();
        } else {
            $("#newLLPermissionToRentBox").hide();
        }
    });
    $("#LLcheckboxes-7").change(function () {
        if (this.checked) {
            $("#newLLPermissionToContactBox").show();
        } else {
            $("#newLLPermissionToContactBox").hide();
        }
    });

    $('#updateLandLordData').submit((e) => {
        var landlord = {
            emailAddress: $('#currentLLEmailAddress').val()
        };
        if ($('input[id="LLcheckboxes-0"]:checked').length === 1) {
            landlord.title = $('#newLLTitle').val();
        }
        if ($('input[id="LLcheckboxes-1"]:checked').length === 1) {
            landlord.firstName = $('#newLLFirstname').val();
        }
        if ($('input[id="LLcheckboxes-2"]:checked').length === 1) {
            landlord.surname = $('#newLLSurname').val();
        }
        if ($('input[id="LLcheckboxes-3"]:checked').length === 1) {
            landlord.dob = $('#newLLDob').val();
        }
        if ($('input[id="LLcheckboxes-4"]:checked').length === 1) {
            landlord.phoneNumber = $('#newLLNumber').val();
        }
        if ($('input[id="LLcheckboxes-5"]:checked').length === 1) {
            landlord.homeAddress.addressLine1 = $('#newLLAddressLine1').val();
            landlord.homeAddress.addressLine2 = $('#newLLAddressLine2').val();
            landlord.homeAddress.town = $('#newLLTown').val();
            landlord.homeAddress.countycity = $('#newLLCountyCity').val();
            landlord.homeAddress.eircode = $('#newLLEircode').val();
        }
        if ($('input[id="LLcheckboxes-6"]:checked').length === 1) {
            landlord.permissionToRent = $('#newPermissionToRent').val();
        }
        if ($('input[id="LLcheckboxes-7"]:checked').length === 1) {
            landlord.permissionToContact = $('#newPermissionToContact').val();
        }
        console.log(landlord);
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/api/landlord',
            contentType: 'application/json',
            data: JSON.stringify(landlord),
            success: () => {
                alert('Data updated successfully!');
            }
        })
        e.preventDefault();
    });
    $('#deleteLandLordData').submit((e) => {
        var landlord = {
            emailAddress: $('#delLLemail').val()
        };
        console.log(landlord);
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/api/landlord',
            contentType: 'application/json',
            data: JSON.stringify(landlord),
            success: () => {
                alert('Data deleted successfully!');
            }
        })
        e.preventDefault();
    });

    //Contract form
    //hide other tenant boxes when page is ready
    $('#tenant2').hide();
    $('#tenant3').hide();

    //show other tenant boxes depending on the value selected
    var selectedValue = 1;
    $('#numoftenants input').on('change', function () {
        selectedValue = $('input[name=numoftenants]:checked', '#numoftenants').val();
        if (selectedValue == '1') {
            $('#tenant2').hide();
            $('#tenant3').hide();
        } else if (selectedValue == '2') {
            $('#tenant2').show();
            $('#tenant3').hide();
        } else if (selectedValue == '3') {
            $('#tenant2').show();
            $('#tenant3').show();
        }
    });
    //hide other type when page is ready
    $('#otherType').hide();

    //show other type when other is selected
    $('#propertyType').change(() => {
        if ($('#propertyType').val() === 'Other') {
            $('#otherType').show();
        } else {
            $('#otherType').hide();
        }
    });

    $('#addContractForm').submit((e) => {
        //get the values of the contract form
        var contract = {
            contractDate: $('#contractdate').val(),
            propertyAddress: $('#propertyaddress').val(),
            tenants: [],
            landlord: $('#landlord').val(),
            fee: $('#fee').val(),
            propertyDoorNumber: $('#doornum').val(),
            contractLength: $('#length').val(),
        };

        console.log(selectedValue);
        //check the number of tenants selected and get the value of the selected tenants
        if (selectedValue == '1') {
            contract.tenants.push($('#tenantnum1').val());
        } else if (selectedValue == '2') {
            contract.tenants.push($('#tenantnum1').val(), $('#tenantnum2').val());
        } else if (selectedValue == '3') {
            contract.tenants.push($('#tenantnum1').val(), $('#tenantnum2').val(), $('#tenantnum3').val());
        }

        //if other is selected, get the value of the other input field
        if ($('#propertyType').val() === 'Other') {
            contract.propertyType = $('#otherPropertyType').val();
        } else {
            contract.propertyType = $('#propertyType').val();
        }
        console.log(contract);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/contract',
            contentType: 'application/json',
            data: JSON.stringify(contract),
            success: () => {
                alert('Data sent successfully!');
            }
        })
        e.preventDefault();
    });
    $('#getContractForm').submit((e) => {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/contract',
            success: (data) => {
                const contracts = document.getElementById('contracts');
                contracts.value = JSON.stringify(data, null, 2);
            }
        })
        e.preventDefault();
    });

    //hide other contract boxes when page is ready
    $('#newContractDateBox').hide()
    $('#newPropertyAddressBox').hide()
    $('#newNumberOfTenantsBox').hide()
    $('#newTenant1Box').hide()
    $('#newTenant2Box').hide()
    $('#newTenant3Box').hide()
    $('#newLandlordBox').hide()
    $('#newFeeBox').hide()
    $('#newDoorNumberBox').hide()
    $('#newContractLengthBox').hide()
    $('#newPropertyTypeBox').hide()

    //show other contract boxes depending on the boxes checked
    var newSelectedValue = 1;
    $("#Ccheckboxes-0").change(function () {
        if (this.checked) {
            $("#newContractDateBox").show();
        } else {
            $("#newContractDateBox").hide();
        }
    });
    $("#Ccheckboxes-1").change(function () {
        if (this.checked) {
            $("#newPropertyAddressBox").show();
        } else {
            $("#newPropertyAddressBox").hide();
        }
    });
    $("#Ccheckboxes-2").change(function () {
        if (this.checked) {
            $("#newNumberOfTenantsBox").show();
            $("#newTenant1Box").show();
            $('#newNumberOfTenantsBox input').on('change', function () {
                newSelectedValue = $('input[name=newTenants]:checked', '#newNumberOfTenantsBox').val();
                if (newSelectedValue == '1') {
                    $('#newTenant2Box').hide();
                    $('#newTenant3Box').hide();
                } else if (newSelectedValue == '2') {
                    $('#newTenant2Box').show();
                    $('#newTenant3Box').hide();
                } else if (newSelectedValue == '3') {
                    $('#newTenant2Box').show();
                    $('#newTenant3Box').show();
                }
            });
        } else {
            $("#newNumberOfTenantsBox").hide();
            $("#newTenant1Box").hide();
            $("#newTenant2Box").hide();
            $("#newTenant3Box").hide();
        }
    });
    $("#Ccheckboxes-3").change(function () {
        if (this.checked) {
            $("#newLandlordBox").show();
        } else {
            $("#newLandlordBox").hide();
        }
    });
    $("#Ccheckboxes-4").change(function () {
        if (this.checked) {
            $("#newFeeBox").show();
        } else {
            $("#newFeeBox").hide();
        }
    });
    $("#Ccheckboxes-5").change(function () {
        if (this.checked) {
            $("#newDoorNumberBox").show();
        } else {
            $("#newDoorNumberBox").hide();
        }
    });
    $("#Ccheckboxes-6").change(function () {
        if (this.checked) {
            $("#newContractLengthBox").show();
        } else {
            $("#newContractLengthBox").hide();
        }
    });
    $("#Ccheckboxes-7").change(function () {
        if (this.checked) {
            $("#newPropertyTypeBox").show();
        } else {
            $("#newPropertyTypeBox").hide();
        }
    });

    $('#updateContractForm').submit((e) => {
        var contract = {
            _id: $('#contractID').val()
        };
        if ($('input[id="Ccheckboxes-0"]:checked').length === 1) {
            contract.contractDate = $('#newContractDate').val();
        }
        if ($('input[id="Ccheckboxes-1"]:checked').length === 1) {
            contract.propertyAddress = $('#newPropertyAddress').val();
        }
        console.log($('#newTenantNum1').val());
        console.log($('#newTenantNum2').val());
        console.log($('#newTenantNum3').val());
        if ($('input[id="Ccheckboxes-2"]:checked').length === 1) {
            contract.tenants = [];
            if (newSelectedValue == '1') {
                contract.tenants.push($('#newTenantNum1').val());
            }
            if (newSelectedValue == '2') {
                contract.tenants.push($('#newTenantNum1').val(), $('#newTenantNum2').val());
            }
            if (newSelectedValue == '3') {
                contract.tenants.push($('#newTenantNum1').val(), $('#newTenantNum2').val(), $('#newTenantNum3').val());
            }
        }
        if ($('input[id="Ccheckboxes-3"]:checked').length === 1) {
            contract.landlord = $('#newLandlord').val();
        }
        if ($('input[id="Ccheckboxes-4"]:checked').length === 1) {
            contract.fee = $('#newFee').val();
        }
        if ($('input[id="Ccheckboxes-5"]:checked').length === 1) {
            contract.propertyDoorNumber = $('#newDoorNumber').val();
        }
        if ($('input[id="Ccheckboxes-6"]:checked').length === 1) {
            contract.contractLength = $('#newContractLength').val();
        }
        if ($('input[id="Ccheckboxes-7"]:checked').length === 1) {
            contract.propertyType = $('#newPropertyType').val();
        }
        console.log(contract);
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/api/contract',
            contentType: 'application/json',
            data: JSON.stringify(contract),
            success: () => {
                alert('Data updated successfully!');
            }
        })
        e.preventDefault();
    });
    $('#deleteContractForm').submit((e) => {
        var contract = {
            _id: $('#delContractID').val()
        };
        console.log(contract);
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/api/contract',
            contentType: 'application/json',
            data: JSON.stringify(contract),
            success: () => {
                alert('Data deleted successfully!');
            }
        })
        e.preventDefault();
    });
});