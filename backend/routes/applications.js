const express = require("express");
const { JobApplication } = require("../models");
const checkJwt = require("../middleware/auth0");
const attachCurrentUser = require("../middleware/currentUser");

const router = express.Router();

router.use(checkJwt);
router.use(attachCurrentUser);




router.get("/", async (req, res, next) => {
  try {
    const currentUserId = req.currentUser.id;

    const allApplications = await JobApplication.findAll({
      where: { userId: currentUserId },
    });
    return res.json(allApplications);

  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const currentUserId = req.currentUser.id;

    const application = await JobApplication.findOne({
      where: {
        id: req.params.id,
        userId: currentUserId,
      },
    });

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
    const currentUserId = req.currentUser.id;


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
      userId: currentUserId, 
    });

    res.status(201).json(newApplication);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const currentUserId = req.currentUser.id;

    const application = await JobApplication.findOne({
      where: {
        id: req.params.id,
        userId: currentUserId,
      },
    });

    if (!application) {
      return res.sendStatus(404)
    }

    const changes = {};

    if (req.body.company !== undefined) changes.company = req.body.company;
    if (req.body.role !== undefined) changes.role = req.body.role;
    if (req.body.status !== undefined) changes.status = req.body.status;
    if (req.body.notes !== undefined) changes.notes = req.body.notes;


    await application.update(changes);
    res.json(application);
  } catch (error) {
    next(error)
  }
})
router.delete("/:id", async (req, res, next) => {
  try {
    const applicationId = Number(req.params.id);
    const currentUserId = req.currentUser.id;

    // console.log("DELETE route hit");
    // console.log({ applicationId, currentUserId });



    const deletedCount = await JobApplication.destroy({
      where: {
        id: applicationId,
        userId: currentUserId,
      },
    });

    // console.log("deletedCount:", deletedCount);

    if (!deletedCount) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;