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
module.exports = router;