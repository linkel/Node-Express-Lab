const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => res.status(200).json({posts}))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        if (post.length < 1) {
            res.status(404).json({message : "The post with the specified ID does not exist."})
        } else {
            res.status(200).json({post})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.post('/api/posts', (req, res) => {
    console.log(req.body)
    const post = req.body;
    if (!post) {
        res.status(400).json({ errorMessage: "No post! Please provide title and contents for the post." });
    }
    if (post.title && post.contents) {
        db.insert(post)
        .then(response => {
            //if both title and contents exist, save post and return it
            db.findById(response.id)
            .then(post => res.status(201).json(post))
            .catch(err => res.status(500).json({ message: "Insert successful but unable to find id in database after insert.", error: err}))
            })
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        if (post.length < 1) {
          return res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
          db.remove(id)
            .then(count => {
              res.status(200).json(post);
            })
            .catch(err =>
              res.status(500).json({ error: "The post could not be removed" })
            );
        }
      })
    .catch(err => console.log(err));
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    if (!post) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    if (post.title && post.contents) {
        db.findById(id)
        .then(response => {
            if (response.length < 1) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                db.update(id, post)
                .then(resp => {
                    db.findById(id)
                    .then(post => res.status(200).json({post}))
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: "The post information could not be modified." })
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})


server.listen(8000, () => console.log('API running on port 8000'));