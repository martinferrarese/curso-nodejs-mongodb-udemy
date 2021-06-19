const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    }
}, {timestamps: true});

const Items = mongoose.model('Item', itemSchema);
module.exports = Items;