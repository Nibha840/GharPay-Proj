import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getLeads = () => API.get("/leads");

export const getLead = (id) => API.get(`/leads/${id}`);

export const createLead = (data) => API.post("/leads", data);

export const updateLeadStatus = (id, status) =>
  API.patch(`/leads/${id}/status`, { status });

export const scheduleVisit = (data) => API.post("/visits", data);

export const getVisits = () => API.get("/visits");

export const getAgents = () => API.get("/agents");

export const getDashboard = () => API.get("/dashboard");

export const getActivities = (leadId) =>
  API.get(`/leads/${leadId}/activities`);

export default API;
// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const api = axios.create({ baseURL: API_BASE });

// const useMock = false;

// export const getLeads = async () => {
//   if (useMock) return mockLeads;
//   const { data } = await api.get('/leads');
//   return data;
// };

// export const getLead = async (id) => {
//   if (useMock) return mockLeads.find(l => l._id === id);
//   const { data } = await api.get(`/leads/${id}`);
//   return data;
// };

// export const createLead = async (lead) => {
//   if (useMock) {
//     const newLead = {
//       _id: `l${Date.now()}`, ...lead,
//       status: 'NEW', assignedAgent: mockAgents[0], needsFollowUp: false,
//       createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
//     };
//     mockLeads.unshift(newLead);
//     return newLead;
//   }
//   const { data } = await api.post('/leads', lead);
//   return data;
// };

// export const updateLeadStatus = async (id, status) => {
//   if (useMock) {
//     const lead = mockLeads.find(l => l._id === id);
//     lead.status = status;
//     lead.updatedAt = new Date().toISOString();
//     return lead;
//   }
//   const { data } = await api.patch(`/leads/${id}/status`, { status });
//   return data;
// };

// export const deleteLead = async (id) => {
//   if (useMock) { const i = mockLeads.findIndex(l => l._id === id); if (i > -1) mockLeads.splice(i, 1); return; }
//   await api.delete(`/leads/${id}`);
// };

// export const getAgents = async () => {
//   if (useMock) return mockAgents;
//   const { data } = await api.get('/agents');
//   return data;
// };

// export const getVisits = async () => {
//   if (useMock) return mockVisits;
//   const { data } = await api.get('/visits');
//   return data;
// };

// export const createVisit = async (visit) => {
//   if (useMock) {
//     const v = { _id: `v${Date.now()}`, ...visit };
//     mockVisits.push(v);
//     return v;
//   }
//   const { data } = await api.post('/visits', visit);
//   return data;
// };

// export const getActivities = async (leadId) => {
//   if (useMock) return mockActivities.filter(a => a.leadId === leadId);
//   const { data } = await api.get(`/leads/${leadId}/activities`);
//   return data;
// };

// export const getDashboardStats = async () => {
//   if (useMock) return mockDashboard;
//   const { data } = await api.get('/dashboard');
//   return data;
// };

