import express from "express"
import { login, logout, signUp, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { arcjetPortection } from "../middleware/arcjetMiddelware.js";

const router = express.Router();

router.use(arcjetPortection)

router.post("/signup", signUp)
router.post("/login", arcjetPortection, login)
router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res)=> res.status(200).json(req.user))


export default router;