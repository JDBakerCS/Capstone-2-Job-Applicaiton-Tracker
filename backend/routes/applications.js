const express = require("express");
const { JobApplication } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allApplicaitons = await JobApplication.findAll();
    return res.json(allApplicaitons);
  } catch (err) {
    next(err);
  }
});

module.exports = router;