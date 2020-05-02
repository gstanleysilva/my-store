const express = require('express');
const router = new express.Router();

router.post('/products', async (req, res) => {
    res.send('CREATE PRODUCTS');
});

router.get('/products', async (req, res) => {
    res.send('READ PRODUCTS');
});

router.patch('/products', async (req, res) => {
    res.send('UPDATE PRODUCT');
});

router.delete('/products', async (req, res) => {
    res.send('DELETE PRODUCT');
});

module.exports = router;