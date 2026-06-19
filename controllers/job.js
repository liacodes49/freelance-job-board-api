const Job = require("../models/Job");

// Create a job posting (clients only — enforced in the route)
const createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            postedBy: req.user.id,
        });

        res.status(201).json({
            message: "Job created successfully",
            job,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all jobs (with optional ?status=open filter)
const getJobs = async (req, res) => {
    try {
        const filter = {};
        if (req.query.status) filter.status = req.query.status;

        const jobs = await Job.find(filter).populate(
            "postedBy",
            "name email role"
        );

        res.status(200).json({ jobs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single job by id
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate(
            "postedBy",
            "name email role"
        );

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ job });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a job (only the client who posted it)
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.postedBy.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ message: "You can only edit your own jobs" });
        }

        Object.assign(job, req.body);
        await job.save();

        res.status(200).json({
            message: "Job updated successfully",
            job,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a job (only the client who posted it)
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.postedBy.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ message: "You can only delete your own jobs" });
        }

        await job.deleteOne();

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
};
