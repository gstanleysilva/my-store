const express = require('express');
const router = new express.Router();
const Post = require('../models/post');

//Create new Post
router.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    try {
        await post.save();
        res.send(post);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Get All Posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Get by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Update by ID
router.patch('/posts/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedFields = ['description', 'active'];

    const isUpdateValid = updates.every((field) => {
        return allowedFields.includes(field);
    });

    if (!isUpdateValid) {
        return res.status(400).send({ error: 'invalid fields to update.' });
    }

    try {
        const post = await Post.findById(req.params.id);

        if (!post) { return res.status(404).send(); }

        updates.forEach((chave) => post[chave] = req.body[chave]);

        await post.save();
        res.send(post);
    } catch (error) {
        return res.status(500).send();
    }
});

//Delete by ID
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        if (!post) {
            return res.status(404).send(e);
        }
        res.send(post);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;