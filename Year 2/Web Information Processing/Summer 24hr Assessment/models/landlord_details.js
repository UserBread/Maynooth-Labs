const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const landlordSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    dob: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    homeAddress: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String, default: '-' },
        town: { type: String, required: true },
        countycity: { type: String, required: true },
        eircode: { type: String, default: '-' }
    },
    permissionToRent: {
        type: String,
        required: true,
        enum: ['Yes', 'No']
    },
    permissionToContact: {
        type: String,
        required: true,
        enum: ['Yes', 'No']
    }
});

module.exports = mongoose.model('landlord_details', landlordSchema);
