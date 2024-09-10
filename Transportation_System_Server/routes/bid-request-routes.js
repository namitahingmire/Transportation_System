const express = require('express');
const router = express.Router();
const BidRequestModel = require('../models/bid-request');

router.post('/', async (req, res) => {
    const data = req.body;
    const { transportation_request_id } = req.body;

    // console.log(request_id);
    const existingData = await BidRequestModel.findOne({ transportation_request_id });
    console.log(existingData);
    if (existingData) {
        const id = existingData._id;
        existingData.bids.push(...req.body.bids);

        BidRequestModel.findByIdAndUpdate(id, existingData)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
    else {
        console.log(data);
        BidRequestModel
            .create(data)
            .then(r => res.json(r))
            .catch(err => res.json(err));
    }
    console.log(data);
});

router.post('/getRequestById', async (req, res) => {
    const transportation_request_id = req.body.transportation_request_id;
    console.log(transportation_request_id);
    try {
        const data = await BidRequestModel.find({ transportation_request_id });
        console.log(data);
        res.json(data);
    } catch (err) { res.json(err) };
})

router.get('/', (req, res) => {
    BidRequestModel
        .find()
        .then(r => res.json(r))
        .catch(err => res.json(err));
})

router.post('/acceptBid', async (req, res) => {
    const { acceptedBid, request_id } = req.body;

    try {
        const existingData = await BidRequestModel.findOne({ request_id });

        if (existingData) {
            const id = existingData._id;
            const updatedData = await BidRequestModel.findByIdAndUpdate(id, {
                $set: {
                    'acceptedBid': acceptedBid,
                }
            }, { new: true });
            console.log(updatedData);
            res.json(updatedData);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

module.exports = router;