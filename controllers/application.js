const Application = require("../models/Application");
const Job = require("../models/Job");

// Freelancer applies to a job
const applyToJob = async (req, res) => {
    try {
        const { jobId, coverLetter } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const existing = await Application.findOne({
            job: jobId,
            freelancer: req.user.id,
        });
        if (existing) {
            return res
                .status(400)
                .json({ message: "You already applied to this job" });
        }

        const application = await Application.create({
            job: jobId,
            freelancer: req.user.id,
            coverLetter,
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get applications — freelancers see their own, clients see applications
// for jobs they posted (filtered by ?jobId=)
const getApplications = async (req, res) => {
    try {
        let applications;

        if (req.user.role === "freelancer") {
            applications = await Application.find({ freelancer: req.user.id })
                .populate("job", "title budget status");
        } else {
            const filter = {};
            if (req.query.jobId) filter.job = req.query.jobId;

            applications = await Application.find(filter)
                .populate("job", "title postedBy")
                .populate("freelancer", "name email");

            // only show applications for jobs this client actually posted
            applications = applications.filter(
                (app) => app.job && app.job.postedBy.toString() === req.user.id
            );
        }

        res.status(200).json({ applications });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single application by id
const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate("job", "title postedBy")
            .populate("freelancer", "name email");

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        const isOwnerFreelancer =
            application.freelancer._id.toString() === req.user.id;
        const isOwnerClient =
            application.job.postedBy.toString() === req.user.id;

        if (!isOwnerFreelancer && !isOwnerClient) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json({ application });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Client accepts/rejects an application
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findById(req.params.id).populate(
            "job",
            "postedBy"
        );

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only update applications for your own jobs",
            });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            message: "Application status updated",
            application,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Freelancer withdraws their application
const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.freelancer.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ message: "You can only withdraw your own applications" });
        }

        await application.deleteOne();

        res.status(200).json({ message: "Application withdrawn successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    applyToJob,
    getApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication,
};
