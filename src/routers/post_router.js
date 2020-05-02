const express = require('express');
const router = new express.Router();

router.post('/posts', async (req, res) => {
    res.send('CREATE POSTS');
});

router.get('/posts', async (req, res) => {
    res.send('READ POSTS');
});

router.patch('/posts', async (req, res) => {
    res.send('UPDATE POSTS');
});

router.delete('/posts', async (req, res) => {
    res.send('DELETE POSTS');
});

module.exports = router;