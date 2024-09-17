const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    userEmail: {type: String, required: true},
    items: Array
})

module.exports = mongoose.model('order_detail', orderSchema)