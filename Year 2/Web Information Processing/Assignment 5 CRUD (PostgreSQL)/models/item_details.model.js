const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
    manufacturer: {type: String, required: true},
    model: {type: String, required: true},
    price: {type: Number, required: true}
})

module.exports = mongoose.model('item_detail', itemSchema)