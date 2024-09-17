const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    title: {type: String, default: '-'},
    firstName: {type: String, required: true},
    surname: {type: String, required: true},
    mobileNumber: {type: Number, required: true},
    emailAddress: {type: String, required: true},
    homeDetails: {
        addressLine1: {type: String, required: true},
        addressLine2: {type: String, default: '-'},
        town: {type: String, required: true},
        countycity: {type: String, required: true},
        eircode: {type: String, required: true}
    },
    shippingDetails: {
        addressLine1: {type: String, required: true},
        addressLine2: {type: String, default: '-'},
        town: {type: String, required: true},
        countycity: {type: String, required: true},
        eircode: {type: String, required: true}
    }
});

module.exports = mongoose.model('personal_detail', userSchema);
