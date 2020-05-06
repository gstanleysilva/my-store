const express = require('express');
const router = new express.Router();
const Product = require('../models/product');

//Create new Product
router.post('/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.send(product);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Get All Products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Get by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Update by ID
router.patch('/products/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedFields = ['name', 'description', 'situation', 'price', 'type', 'pictures'];

    const isUpdateValid = updates.every((field) => {
        return allowedFields.includes(field);
    });

    if (!isUpdateValid) {
        return res.status(400).send({ error: 'invalid fields to update.' });
    }

    try {
        const product = await Product.findById(req.params.id);

        if (!product) { return res.status(404).send(); }

        updates.forEach((chave) => product[chave] = req.body[chave]);

        await product.save();
        res.send(product);
    } catch (error) {
        return res.status(500).send();
    }
});

//Delete by ID
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) {
            return res.status(404).send(e);
        }
        res.send(product);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;