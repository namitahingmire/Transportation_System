const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

// Check User By email
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res.json({ message: "Email and Password Are Required" });
    }

    UserModel
        .findOne({ email, password })
        .then(user => {
            if (!user) {
                return res.json({ message: "Login Failed: Please Enter Correct email and password" });
            }
            res.json(user);
        })
        .catch(err =>
            res.json({ message: "Internal Server Error" })
        );
});


// Get All Users
router.get('/', (req, res) => {
    UserModel
        .find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// Get User By ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await UserModel.findById(id);
        res.json(data);
    } catch (err) {
        res.json(err);
    }
});

// Create New User
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const createdUser = await UserModel.create(req.body);
        res.status(201).json(createdUser);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error!!" });
    }
});

// Update Perticular User By Using ID;
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User Not Found!!!" });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!!" });
    }
});


// Delete Perticular User By Using ID;
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status("404").json({ error: "User Not Found" });
        }

        res.status(200).json({ message: "User Deleted Successfully!!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!!" });
    }
});

module.exports = router;