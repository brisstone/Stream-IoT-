const mongoose = require('mongoose');

// define an empty schema on order to get all the data from the collection
const dataSchema = new mongoose.Schema({
    voltage: Number,
    current: Number,
    temperature: Number,
    batteryVoltage :Number,
    count: {type: Number, default: 0}
},{
    timestamps: { createdAt: '_created_at', updatedAt: '_updated_at' }
});

// define the data model based on an existing collection
const dataModel = mongoose.model('details', dataSchema);

module.exports = dataModel;
