import express from "express"
import { createNewNote, deleteNote, getAllNotes, updateNote } from "../controller/notesController.js"
const router = express.Router()
import verifyJWT from "../middleware/verifyJWT.js"

router.use(verifyJWT)

router.route("/")
        .get(getAllNotes)
        .post(createNewNote)
        .patch(updateNote)
        .delete(deleteNote)

export default router