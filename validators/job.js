const { body } = require("express-validator");

const createJobValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("budget").isNumeric().withMessage("Budget must be a number"),
    body("skillsRequired")
        .optional()
        .isArray()
        .withMessage("skillsRequired must be an array of strings"),
];

const updateJobValidator = [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description")
        .optional()
        .notEmpty()
        .withMessage("Description cannot be empty"),
    body("budget").optional().isNumeric().withMessage("Budget must be a number"),
    body("status")
        .optional()
        .isIn(["open", "closed"])
        .withMessage("Status must be open or closed"),
];

module.exports = {
    createJobValidator,
    updateJobValidator,
};
