const User = require("../models/User");

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    register,
};