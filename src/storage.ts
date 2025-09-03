
import type { Incident } from "./Incident";


let incidents: Incident[] = [];



function createIncident(type: Incident["type"], description: string): Incident {
  const newIncident: Incident = {
    id: generateGuid(),
    type,
    description,
    timestamp: new Date().toISOString(),
    status: "open"
  };
  incidents.push(newIncident);
  return newIncident;
}

function getIncidents(): Incident[] {
  return incidents;
}

function generateGuid(): string {
  return "xxx2347";
}

function getIncidentById(id: string): Incident | undefined {
  return incidents.find(i => i.id === id);
}

export = {
  createIncident,
  getIncidents,
  generateGuid,
  getIncidentById
};


