import express from "express"

const router = express.Router();

router.get("/send", (req, res) => {
    return res.send("Send message endpoint hit")
})

export default router;