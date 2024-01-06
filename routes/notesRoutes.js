// routes/noteRoutes.js

const express = require('express');
const router = express.Router();
// const Note = require('../models/note');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/user');
const Note = require('../models/note');


// Example route that requires authentication
router.get('/protected', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ message: 'This is a protected route!', username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

////////////

// CRUD operations ---

router.post('/notes', verifyToken, async (req, res) => {
    try {
      const { title, content } = req.body;
      const newNote = new Note({
        title,
        content,
        user: req.userId,
      });
      await newNote.save();

      const user = await User.findById(req.userId);

      const responseNote = {
        _id: newNote._id,
        title: newNote.title,
        content: newNote.content,
        user: {
          _id: user._id,
          username: user.username,
        },
      };
  
      res.status(201).json(responseNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // GET /api/notes
  router.get('/notes', verifyToken, async (req, res) => {
    try {
      const notes = await Note.find({ user: req.userId });
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  // GET /api/notes/:id
  router.get('/notes/:id', verifyToken, async (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Find the note by ID and user
      const note = await Note.findOne({ _id: noteId, 'user': req.userId });
      
  
      // Check if the note exists
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // Respond with the note
      res.json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // PUT/api ---- update

  router.put('/notes/:id', verifyToken, async (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Find the note by ID and user
      const note = await Note.findOne({ _id: noteId, 'user': req.userId });
  
      // Check if the note exists
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // Update the note with the provided data
      const { title, content } = req.body;
      note.title = title || note.title;
      note.content = content || note.content;
  
      // Save the updated note
      await note.save();
  
      // Respond with the updated note
      res.json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // DELETE - api/notes

  router.delete('/notes/:id', verifyToken, async (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Find the note by ID and user
      const note = await Note.findOne({ _id: noteId, 'user': req.userId });
  
      // Check if the note exists
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // Delete the note
      await note.deleteOne();
  
      // Respond with a success message
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  // POST /api/notes/:id/share
   
router.post('/notes/:id/share', verifyToken, async (req, res) => {
  try {
    const noteId = req.params.id;

    // Find the note by ID and user
    const note = await Note.findOne({ _id: noteId, 'user': req.userId });

    // Check if the note exists
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if the request body includes a valid username to share with
    const { usernameToShareWith } = req.body;
    if (!usernameToShareWith) {
      return res.status(400).json({ message: 'Username to share with is required' });
    }

    // Find the user to share with
    const userToShareWith = await User.findOne({ username: usernameToShareWith });

    if (!userToShareWith) {
      return res.status(404).json({ message: 'User to share with not found' });
    }
    
    // console.log(userToShareWith);
    const note1 = await await Note.findOne({ _id: noteId});
    // console.log(note1);

    const existingNote = await Note.findOne({ _id: noteId });

    if (existingNote) {
      return res.status(400).json({ message: 'Note is already shared with the user' });
    }

    const newNote = new Note({
      title: note1.title,
      content: note1.content,
      user: userToShareWith._id,
    });
    await newNote.save();
    res.json({ message: 'Note shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/search?q=:query

router.get('/search', verifyToken, async (req, res) => {
  try {
    const { q } = req.query;


    // Ensure a search query is provided
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Find notes based on keywords for the authenticated user
    const userId = req.userId;
    const notes = await Note.find({
      $text: { $search: q } // Search for keywords in title or content
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
  

module.exports = router;
