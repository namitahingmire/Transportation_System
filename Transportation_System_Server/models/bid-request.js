const mongoose = require('mongoose');

BidRequestSchema = new mongoose.Schema({
    transportation_request_id: {
        type: String,
        required: true,
        unique: true
    },
    bids: [{
        transporterId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    acceptedBid: {
        transporterId: {
            type: String,
        },
        amount: Number
    }
});

const BidRequestModel = mongoose.model('bid-request', BidRequestSchema);

module.exports = BidRequestModel;