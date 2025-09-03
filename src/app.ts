import express = require("express") ;
import bodyParser= require("body-parser") ;
import storage = require("./storage");
import getIncidents = require("./storage");


const app = express();
app.use(bodyParser.json());

// POST /incident
app.post("/incident", (req, res) => {
  const { type, description } = req.body;
  if (!type || !description) {
    return res.status(400).json({ error: "Type and description required" });
  }
  const newIncident = storage.createIncident(type, description);
  res.status(201).json(newIncident);
});

// GET /incidents
app.get("/incidents", (req, res) => {
  res.json(storage.getIncidents());
});

// GET /incident/:id
app.get("/incident/:id", (req, res) => {
  const incident = storage.getIncidentById(req.params.id);
  if (!incident) {
    return res.status(404).json({ error: "Incident not found" });
  }
  res.json(incident);
});

export = app;
