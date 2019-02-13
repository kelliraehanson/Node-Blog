const express = require("express");

const Users = require('./userDb.js');

const router = express.Router();

// GET all posts

router.get('/', (req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    })

})

// GET user by specific id

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Users.getById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      } else {
        res
          .status(200).json(user);
      }

    })

})

router.post('/', (req, res) => {
    const newUser = req.body;
    if (!newUser.name) {
    res.status(400).json({ message: "Please provide title and contents for the post." });
} else {

    Users.insert(newUser)
    .then(user => {
        User.getById(user.id)
        .then(user => {
            res.status(201).json({ user })
        })
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
}

});


module.exports = router;