const express = require('express');
const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await Users.insert(req.body)

        res.status(201).json(user)
    } catch(error) {
        res.status(500).json({message: 'There was an error adding the user'})
    }
});

router.post('/:id/posts', async (req, res) => {
    try {
        const user = await Users.insert(req.params.id, req.body)

        res.status(201).json(user)
    } catch(error) {
        res.status(500).json({message: 'There was an error adding the user'})
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query)
        res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Error retrieving the users'})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id)
    
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'User not found'})
        }
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving the user'})
    }
});

router.get('/:id/posts', async (req, res) => {
    try {
        const user = await Users.getUserPosts(req.params.id)
    
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'User not found'})
        }
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving the user'})
    }
});

router.delete('/:id', async (req, res) => {
    try {
    const userId = await Users.remove(req.params.id)

    if(userId > 0) {
        res.status(200).json({message: 'The user has been deleted'})
    } else {
        res.status(404).json({message: 'This user could not be found'})
    }
    } catch(error) {
        res.status(500).json({message: 'There was an error removing this user'})
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await Users.update(req.params.id, req.body)

        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'This user could not be found'})
        }
    } catch(error) {
        res.status(500).json({message: 'There was an error updating this user'})
    }
});

//custom middleware

// function validateUserId(req, res, next) {

//     next()
// };

// function validateUser(req, res, next) {

//     next()
// };

// function validatePost(req, res, next) {

//     next()
// };

module.exports = router;
