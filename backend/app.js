const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
require("./models");
const applicationsRouter = require("./routes/applications");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/applications", applicationsRouter);


function errorHandler(error, req, res, next) {
  console.error(error);
  res.status(500).json({ error: error.message || "Server Error" });
}

app.use(errorHandler);

async function startApp() {
  await db.authenticate();
  console.log("DB connected");

  await db.sync();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startApp().catch(console.error);