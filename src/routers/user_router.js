const express = require('express');
const router = new express.Router();

router.post('/users', async (req, res) => {
    res.send('CREATE USERS');
});

router.get('/users', async (req, res) => {
    res.send('READ USERS');
});

router.patch('/users', async (req, res) => {
    res.send('UPDATE USER');
});

router.delete('/users', async (req, res) => {
    res.send('DELETE USER');
});

module.exports = router;