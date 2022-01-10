// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');


const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                error: err.message
            })
        })
});

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The user information could not be retrieved',
                error: err.message
            })
        })
})

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body
    User.insert({name, bio})
        .then(newUser => {
            if(!name || !bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user',
                })
            } else {
                res.status(201).json(newUser)
            }
        })
        .catch(err => {
            res.status(400).json({
                message: 'There was an error while saving the user to the database',
                error: err.message
            })
        })
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    User.update(id, {name, bio})
        .then(updatedUser => {
            if(!updatedUser) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else if (!name || !bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                })
            } else {
                res.status(200).json(updatedUser)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'The user information could not be modified',
                error: err.message
            })
        })
});

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(deletedUser => {
            if(!deletedUser) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else {
                res.status(200).json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'he user could not be removed',
                error: err.message
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
