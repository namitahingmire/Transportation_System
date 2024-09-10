const mongoose = require('mongoose');

const TransportationRequestSchema = new mongoose.Schema({
    goodsDescription: {
        type: String,
        required: true
    },
    sourceLocation: {
        type: String,
        required: true
    },
    destinationLocation: {
        type: String,
        required: true
    },
    pickupDate: {
        type: String,
        required: true
    },
    estimatedDropDate: {
        type: String,
        required: true
    },
    initialPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String
    },
    providerId: {
        type: String,
        required: true
    },
    transporterId: {
        type: String,
    }
});

const TransportationRequestModel = mongoose.model('transportation-request', TransportationRequestSchema);

module.exports = TransportationRequestModel;