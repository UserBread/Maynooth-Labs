const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractSchema = new mongoose.Schema({
    contractDate: { type: Date, required: true },
    propertyAddress: { type: String, required: true },
    tenants: {
        type: Array,
        required: true,
        validate: {
            validator: function (v) {
                if (Array.isArray(v) && v.length >= 1 && v.length <= 3) {
                    return true;
                }
                return false;
            },
            message: props => `${props.value} must be an array with between 1 and 3 items!`
        }
    },
    landlord: { type: String, required: true, },
    fee: { type: Number, required: true },
    propertyDoorNumber: { type: Number, required: true },
    contractLength: {
        type: String,
        required: true,
        enum: ['Month', 'Year', 'Permanent']
    },
    propertyType: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('tenat-landlord_contracts', contractSchema);
