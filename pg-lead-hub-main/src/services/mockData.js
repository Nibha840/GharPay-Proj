export const mockAgents = [
  { _id: 'a1', name: 'Rahul Sharma', email: 'rahul@gharpayy.com', active: true, leadsAssigned: 5 },
  { _id: 'a2', name: 'Priya Patel', email: 'priya@gharpayy.com', active: true, leadsAssigned: 4 },
  { _id: 'a3', name: 'Amit Kumar', email: 'amit@gharpayy.com', active: true, leadsAssigned: 4 },
  { _id: 'a4', name: 'Sneha Gupta', email: 'sneha@gharpayy.com', active: true, leadsAssigned: 4 },
  { _id: 'a5', name: 'Vikram Singh', email: 'vikram@gharpayy.com', active: false, leadsAssigned: 3 },
];

const statuses = ['NEW', 'CONTACTED', 'REQUIREMENT_COLLECTED', 'PROPERTY_SUGGESTED', 'VISIT_SCHEDULED', 'VISIT_COMPLETED', 'BOOKED', 'LOST'];
const sources = ['website', 'whatsapp', 'phone', 'social'];
const names = ['Aarav Mehta', 'Diya Iyer', 'Rohan Joshi', 'Ananya Rao', 'Karan Malhotra', 'Ishita Nair', 'Arjun Reddy', 'Meera Das', 'Siddharth Bose', 'Pooja Verma', 'Nikhil Agarwal', 'Riya Choudhury', 'Varun Kapoor', 'Tanya Jain', 'Harsh Pandey', 'Simran Kaur', 'Aditya Mishra', 'Kavya Shetty', 'Manish Tiwari', 'Neha Saxena'];

export const mockLeads = names.map((name, i) => ({
  _id: `l${i + 1}`,
  name,
  phone: `+91 ${9800000000 + i}`,
  source: sources[i % 4],
  status: statuses[i % 8],
  assignedAgent: mockAgents[i % 4],
  needsFollowUp: i % 5 === 0,
  createdAt: new Date(Date.now() - (20 - i) * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - (10 - i % 10) * 86400000).toISOString(),
}));

export const mockVisits = [
  { _id: 'v1', leadId: 'l5', property: 'Sunshine PG, Koramangala', date: '2026-03-10', time: '10:00', outcome: 'VISIT_DONE', notes: 'Liked the room' },
  { _id: 'v2', leadId: 'l6', property: 'Green Nest PG, HSR', date: '2026-03-11', time: '14:00', notes: 'First visit' },
  { _id: 'v3', leadId: 'l7', property: 'Urban Stay, Indiranagar', date: '2026-03-12', time: '11:00', outcome: 'BOOKED' },
  { _id: 'v4', leadId: 'l13', property: 'Comfort Zone PG, BTM', date: '2026-03-13', time: '16:00' },
  { _id: 'v5', leadId: 'l14', property: 'Happy Homes, Whitefield', date: '2026-03-14', time: '09:30', outcome: 'NO_SHOW' },
];

export const mockActivities = [
  { _id: 'act1', leadId: 'l1', type: 'CREATED', description: 'Lead created from website', timestamp: new Date(Date.now() - 19 * 86400000).toISOString() },
  { _id: 'act2', leadId: 'l1', type: 'ASSIGNED', description: 'Assigned to Rahul Sharma', timestamp: new Date(Date.now() - 19 * 86400000).toISOString() },
  { _id: 'act3', leadId: 'l1', type: 'STATUS_CHANGE', description: 'Status changed to CONTACTED', timestamp: new Date(Date.now() - 17 * 86400000).toISOString() },
  { _id: 'act4', leadId: 'l5', type: 'VISIT_SCHEDULED', description: 'Visit scheduled at Sunshine PG', timestamp: new Date(Date.now() - 5 * 86400000).toISOString() },
  { _id: 'act5', leadId: 'l5', type: 'VISIT_COMPLETED', description: 'Visit completed - liked the room', timestamp: new Date(Date.now() - 3 * 86400000).toISOString() },
  { _id: 'act6', leadId: 'l7', type: 'BOOKED', description: 'Booking confirmed at Urban Stay', timestamp: new Date(Date.now() - 1 * 86400000).toISOString() },
];

export const mockDashboard = {
  totalLeads: 20,
  leadsByStage: {
    NEW: 3, CONTACTED: 3, REQUIREMENT_COLLECTED: 3, PROPERTY_SUGGESTED: 3,
    VISIT_SCHEDULED: 3, VISIT_COMPLETED: 2, BOOKED: 2, LOST: 1,
  },
  visitsScheduled: 5,
  bookingsConfirmed: 2,
  agentPerformance: mockAgents.filter(a => a.active).map(agent => ({
    agent, leadsCount: agent.leadsAssigned, bookings: Math.floor(Math.random() * 3), visits: Math.floor(Math.random() * 5) + 1,
  })),
};
