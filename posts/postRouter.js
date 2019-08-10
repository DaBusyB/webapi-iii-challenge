const express = require('express');
const Posts = require('../posts/postDb.js')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query)
        res.status(200).json(posts)
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Error retrieving the users'})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id)
    
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: 'Post not found'})
        }
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving the post'})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postId = await Posts.remove(req.params.id)

        if(postId > 0) {
            res.status(200).json({message: 'The post has been deleted'})
        } else {
            res.status(404).json({message: 'This post could not be found'})
        }
    } catch(error) {
        res.status(500).json({message: 'There was an error removing this post'})
    }
});

router.put('/:id', (req, res) => {
    
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;