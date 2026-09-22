const express = require("express");
const cors = require("cors");
const incidentRouter=require("./routes/api")
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});
// used this set up api call method name
app.use("/api",incidentRouter)
module.exports = app;
