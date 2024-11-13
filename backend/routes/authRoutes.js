import express from "express"
const router = express.Router()
import {login, logout, refresh} from "../controller/authController.js"
import loginLimiter from'../middleware/loginLimit.js'

router.route('/')
    .post(loginLimiter, login)

router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)

export default router