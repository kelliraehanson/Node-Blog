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

// POST 

router.post('/', (req, res) => {
    const newUser = req.body;
    if (!newUser.name) {
    res.status(400).json({ message: "Please provide title and contents for the post." });
} else {

    Users.insert(newUser)
    .then(user => {
        Users.getById(user.id)
        .then(user => {
            res.status(201).json({ user })
        })
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
}

});

// DELETE

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Users.getById(id)
    .then(user => {
        if (!user) {
            res.status(404).json({ message: "The hub could not be found" });
        } else {
            Users.remove(id)
            .then(user => {
                res.status(204).end();
            })

        }
    })
    .catch(err => {
        res.status(500).json({ error: "This user could not be removed"})
    })
})

// PUT

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    if (!updatedUser.name) {
        res.status(400).json({ message: "Please provide a name for the user" })
    } else {
        Users.update(id, updatedUser)
        .then(updated => {
            if (updated) {
                Users.getById(id)
                .then(user => {
                    res.status(200).json({user})
                })
            } else {
                res.status(404).json({ message: "The user wtih the specified ID does not exist"});
        
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be updated"})
        })

    }
})

// ========================================================= END UPDATE USER


// GET all posts for user based on their ID (subroute)

router.get('/:id/posts', (req, res) => {
    Users.getUserPosts(req.params.id)
    .then(posts => {
        if (posts.length > 0) {
        res.status(200).json({posts})
        } else {
            res.status(404).json({ error: "Could not find any posts for the  "})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Error getting posts for the specific "})
    })
})




module.exports = router;