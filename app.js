const express = require("express");
const cors = require("cors");
const app = express();
const incident = require("./models/users");
app.use(cors());
app.use(express.json());
const router = express.Router();
const notes = [];
router.post("/", async (req, res) => {
  try {
    const Incident = await Incident.create(req.body);
    json({
      message: "log received",
    });
  } catch (err) {
    res.status(400).json({ message: "error error" });
  }
});
router.get("/", (req, res) => {});
module.exports = app;
