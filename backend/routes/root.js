import express from "express"
import path from "path"
const router = express.Router()
import { fileURLToPath } from "url";
router.get('^/$|/index(.html)?', (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

export default router;