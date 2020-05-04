const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedFields = ['name', 'password', 'address', 'telephone', 'picture'];

    const isUpdateValid = updates.every((field) => {
        return allowedFields.includes(field);
    });

    if (!isUpdateValid) {
        return res.status(400).send({ error: 'invalid fields to update.' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) { return res.status(404).send(); }

        updates.forEach((chave) => user[chave] = req.body[chave]);

        await user.save();
        res.send(user);
    } catch (error) {
        return res.status(500).send();
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).send(e);
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;