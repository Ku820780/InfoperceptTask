import express from "express"
const router = express.Router()
import { deleteUser, getUser, patchUser, postUser } from "../controller/userController.js"
import verifyJWT from "../middleware/verifyJWT.js"

router.use(verifyJWT)

 router.route('/')
        .get(getUser)
        .post(postUser)
        .patch(patchUser)
        .delete(deleteUser)

export default router