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

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {
    
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;