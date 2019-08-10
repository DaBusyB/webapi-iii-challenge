const express = require('express');
const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

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

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', async (req, res) => {try {
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

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
