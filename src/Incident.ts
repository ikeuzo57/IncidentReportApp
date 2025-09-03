export interface Incident {
  id: string;
  type: "police" | "fire" | "medical";
  description: string;
  timestamp: string;
  status: "open" | "in-progress" | "resolved";
}
