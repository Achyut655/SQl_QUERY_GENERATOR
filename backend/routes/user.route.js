const express = require("express");
const { userModel } = require("../models/user.model");
const router = express.Router();

// Example route for user registration
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new userModel({ username, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
