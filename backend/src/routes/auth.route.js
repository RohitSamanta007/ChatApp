import express from "express"
import { signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp)
router.post("/login", (req, res) => {
    return res.send("Login details received")
})
router.get("/logout", (req, res) => {

})

export default router;