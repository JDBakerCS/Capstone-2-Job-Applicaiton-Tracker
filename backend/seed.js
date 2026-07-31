require("dotenv").config();
const db = require("./db");
const { User, JobApplication } = require("./models");

async function seed() {
  try {
    await db.authenticate();
    console.log("DB connected for seeding");

    const userOne = await User.create({
      username: "maria_dev",
      email: "maria.dev@example.com",
    });

    const userTwo = await User.create({
      username: "james_dev",
      email: "james.dev@example.com",
    });

    await JobApplication.bulkCreate([
      {
        company: "Spotify",
        role: "UX/UI Intern",
        status: "Interviewing",
        notes: "Phone screen scheduled on 08/06/2026",
        userId: userOne.id,
      },
      {
        company: "Figma",
        role: "Product Design Intern",
        status: "Applied",
        notes: "Portfolio submitted with application",
        userId: userOne.id,
      },
      {
        company: "Webflow",
        role: "Frontend Developer Intern",
        status: "Applied",
        notes: "Applied through careers page",
        userId: userOne.id,
      },
      {
        company: "Notion",
        role: "Software Engineer Intern",
        status: "Interested",
        notes: "Need to finish tailoring resume",
        userId: userTwo.id,
      },
      {
        company: "Canva",
        role: "Product Design Intern",
        status: "Offer",
        notes: "Offer received on 07/30/2026",
        userId: userTwo.id,
      },
      {
        company: "Airbnb",
        role: "Frontend Engineer Intern",
        status: "Rejected",
        notes: "Rejected after first round",
        userId: userTwo.id,
      },
    ]);

    console.log("Seed data added");
    console.log("userOne id:", userOne.id);
    console.log("userTwo id:", userTwo.id);
  } catch (err) {
    console.error(err);
  } finally {
    await db.close();
  }
}

seed();