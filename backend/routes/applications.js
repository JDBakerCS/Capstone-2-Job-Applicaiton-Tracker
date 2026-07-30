const express = require("express");
const { JobApplication } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allApplicaitons = await JobApplication.findAll();
    return res.json(allApplicaitons);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const application = await JobApplication.findByPk(req.params.id);

    if (!application) {
      return res.sendStatus(404);
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { company, role, status, notes } = req.body;

    if (!company || !role || !status) {
      return res
        .status(400)
        .json({ message: "Company, role, and status are required." });
    }

    const newApplication = await JobApplication.create({
      company,
      role,
      status,
      notes,
      userId: 2, // temporary until auth is added
    });

    res.status(201).json(newApplication);
  } catch (error) {
    next(error);
  }
});

module.exports = router;