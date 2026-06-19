const { validationResult } = require("express-validator");

// Runs after express-validator checks; stops the request early
// with a 400 if any validation rule failed.
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = validate;
