require("dotenv").config();
const db = require("./db");
const { User, JobApplication } = require("./models");

async function seed() {
  try {
    await db.authenticate();
    console.log("DB connected for seeding");

    const user = await User.create({
      username: "maria_dev",
      email: "maria.dev@example.com",
    });

    await JobApplication.bulkCreate([
      {
        company: "Spotify",
        role: "UX/UI Intern",
        status: "Interviewing",
        notes: "Phone screen scheduled",
        userId: user.id,
      },
      {
        company: "Figma",
        role: "Product Design Intern",
        status: "Applied",
        notes: "Portfolio submitted with application",
        userId: user.id,
      },
      {
        company: "Webflow",
        role: "Frontend Developer Intern",
        status: "Applied",
        notes: "Applied through careers page",
        userId: user.id,
      },
    ]);

    console.log("Seed data added");
  } catch (err) {
    console.error(err);
  } finally {
    await db.close();
  }
}

seed();