const express = require('express');
const router = express.Router();
const TransportationRequestModel = require('../models/transportation-request');

router.post('/', async (req, res) => {
    const data = req.body;

    try {
        const createdDetails = await TransportationRequestModel.create(data);
        res.json(createdDetails);
    } catch (err) {
        console.log(err);
        res.json({ message: "Failed To Create Goods Details!!!" });
    }
})


router.get('/', (req, res) => {
    TransportationRequestModel
        .find()
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    TransportationRequestModel
        .find({ userId })
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

router.post('/getByStatus', (req, res) => {
    const { status } = req.body;
    TransportationRequestModel
        .find({ status })
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

router.post('/getByStatusAndIdForProvider', async (req, res) => {
    try {
        const providerId = req.body.providerId;
        const status = req.body.status;
        const data = await TransportationRequestModel.find({ status, providerId });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/getByStatusAndIdForTransporter', async (req, res) => {
    try {
        const transporterId = req.body.transporterId;
        const status = req.body.status;
        console.log(transporterId, status);
        const data = await TransportationRequestModel.find({ status, transporterId });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateStatus', async (req, res) => {
    const { id, status } = req.body;
    try {
        const updatedData = await TransportationRequestModel.findByIdAndUpdate(id,
            {

                $set: {
                    'status': status,
                }

            },
            {
                new: true
            }
        )
        res.json(updatedData);
    } catch (err) {
        res.json(err);
    }
});

router.post('/updateRequest', async (req, res) => {
    const { id, status, transporterId } = req.body;
    try {
        const updatedData = await TransportationRequestModel.findByIdAndUpdate(id,
            {

                $set: {
                    'status': status,
                    'transporterId': transporterId
                }

            },
            {
                new: true
            }
        )
        res.json(updatedData);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;