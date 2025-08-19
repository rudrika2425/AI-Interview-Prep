const express=require('express');
const noteController=require("../controllers/noteController");
const router=express.Router();

router.post('/addnote',noteController.createNote);
router.get('/getnotes',noteController.getUserNotes);
router.get('/getsinglenote/:id',noteController.getNoteById);
router.patch('/updatenote/:id',noteController.updateNote);
router.delete('/deletenote/:id',noteController.deleteNote);


module.exports=router;