const express = require('express');
const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')

const router = express.Router();

router.post('/', validateUser, async (req, res) => {

    try {
        const user = await Users.insert(req.body)
        if (user) {
          res.status(201).json(user)
        }

    } catch(error) {
        res.status(500).json({message: 'There was an error adding the user'})
    }
});

// router.post('/:id/posts', validateUserId, async (req, res) => {
//     try {
      

       
//         res.status(201).json(post)
//     } catch(error) {
//         res.status(500).json({
//             message: 'There was an error adding the post'
//         })
//     }
// });

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query)
        res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Error retrieving the users'})
    }
});

router.get('/:id', validateUserId, async (req, res) => {
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

router.get('/:id/posts', validateUserId, async (req, res) => {
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

router.delete('/:id', validateUserId, async (req, res) => {
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

router.put('/:id', validateUserId, async (req, res) => {
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

async function validateUserId(req, res, next) {
    try {
        const {id} = req.params
        const user = await Users.getById(id)

        if(user) {
            req.user = user
            next()
        } else {
            res.status(404).json({message: 'This id was not found'})
        }
    } catch(error) {
        res.status(500).json(error)
    }
};

async function validateUser(req, res, next) {
    const userInfo = req.body;
  
try {
    if(userInfo && Object.keys(userInfo).length) {
        // const user = await Users.insert(userInfo)
        next()
    } else if(!Object.keys(userInfo).length) {
        res.status(400).json({message: 'Missing user data'})
    } else if(!userInfo.name) {
        res.status(400).json({message: 'Missing required name field'})
    }
} catch(error) {
    res.status(500).json(error)
}
};

// async function validatePost(req, res, next) {
//     try {
//         const body = req.body

//         if(body) {
//             next()
//         } else if(!body.text) {
//             res.status(400).json({message: 'Missing required text field'})
//         } else {
//             res.status(400).json({message: 'Missing post data'})
//         }
//     } catch(error) {
//         res.status(500).json(error)
//     }
// };

module.exports = router;
