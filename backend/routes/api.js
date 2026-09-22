const  { Incident, Log } = require("../models/schema");
const express = require("express");
const router = express.Router();
// nothing special here just some post and get method
router.post("/logs", async (req, res) => {
  try {
    const log = await Log.create(req.body);
    return res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/logs", async (req, res) => {
  try {
    const { agentname, level, tenantId, limit = 50, page = 1 } = req.query;

    const filter = {};
    if (agentname) filter.agentname = agentname;
    if (level) filter.level = level;
    if (tenantId) filter.tenantId = tenantId;

    const parsedLimit = Math.min(parseInt(limit, 10) || 50, 200); // cap according to your requirements
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (parsedPage - 1) * parsedLimit;

    const logs = await Log.find(filter)
      .sort({ createdAt: -1 }) // most recent first
      .skip(skip)
      .limit(parsedLimit);

    const total = await Log.countDocuments(filter);

    return res.json({
      total,
      page: parsedPage,
      limit: parsedLimit,
      count: logs.length,
      logs,
    });
  } catch (err) {
    console.error("Error fetching logs:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = Incident;
module.exports = router;
