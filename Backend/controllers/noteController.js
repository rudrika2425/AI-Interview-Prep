const Note = require('../models/Note');

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const {userId} = req.query; 

    const newNote = new Note({
      userId,
      title,
      content
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserNotes = async (req, res) => {
  try {
    const {userId} = req.query; 
    const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getNoteById = async (req, res) => {
  try {
    const {userId}=req.query;
    const note = await Note.findOne({
      _id: req.params.id,
      userId: userId
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const {userId}=req.query
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: userId },
      { title, content, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteNote = async (req, res) => {
  try {
    const {userId}=req.query
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: userId
    });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={deleteNote,updateNote,createNote,getUserNotes,getNoteById};