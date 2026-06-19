const express = require("express");

const router = express.Router();

const jobController = require("../controllers/job");
const { createJobValidator, updateJobValidator } = require("../validators/job");
const validate = require("../middleware/validate");
const { protect, authorize } = require("../middleware/auth");

// anyone logged in can view jobs
router.get("/", protect, jobController.getJobs);
router.get("/:id", protect, jobController.getJobById);

// only clients can post, edit, or delete jobs
router.post(
    "/",
    protect,
    authorize("client"),
    createJobValidator,
    validate,
    jobController.createJob
);

router.put(
    "/:id",
    protect,
    authorize("client"),
    updateJobValidator,
    validate,
    jobController.updateJob
);

router.delete("/:id", protect, authorize("client"), jobController.deleteJob);

module.exports = router;
