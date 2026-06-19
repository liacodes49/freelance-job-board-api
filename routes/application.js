const express = require("express");

const router = express.Router();

const applicationController = require("../controllers/application");
const { protect, authorize } = require("../middleware/auth");

// freelancers apply to jobs
router.post(
    "/",
    protect,
    authorize("freelancer"),
    applicationController.applyToJob
);

// freelancers see their own applications; clients see applications to their jobs
router.get("/", protect, applicationController.getApplications);
router.get("/:id", protect, applicationController.getApplicationById);

// clients accept/reject
router.put(
    "/:id",
    protect,
    authorize("client"),
    applicationController.updateApplicationStatus
);

// freelancers withdraw
router.delete(
    "/:id",
    protect,
    authorize("freelancer"),
    applicationController.deleteApplication
);

module.exports = router;
