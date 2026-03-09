import React, { createContext, useContext, useState, useCallback } from "react";
import * as api from "@/services/api";

const CrmContext = createContext();

export const useCrm = () => {
  return useContext(CrmContext);
};

export const CrmProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [visits, setVisits] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await api.getLeads();
      setLeads(res.data || []);
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  }, []);

  const fetchAgents = useCallback(async () => {
    try {
      const res = await api.getAgents();
      setAgents(res.data || []);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  }, []);

  const fetchVisits = useCallback(async () => {
    try {
      const res = await api.getVisits();
      setVisits(res.data || []);
    } catch (err) {
      console.error("Error fetching visits:", err);
    }
  }, []);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await api.getDashboard();
      setDashboardStats(res.data || {});
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  }, []);

  const addLead = async (lead) => {
    const res = await api.createLead(lead);
    setLeads((prev) => [res.data, ...prev]);
  };

  const updateStatus = async (id, status) => {
    await api.updateLeadStatus(id, status);

    setLeads((prev) =>
      prev.map((l) =>
        l._id === id ? { ...l, status } : l
      )
    );
  };

  const addVisit = async (visit) => {
    const res = await api.scheduleVisit(visit);
    setVisits((prev) => [...prev, res.data]);
  };

  return (
    <CrmContext.Provider
      value={{
        leads,
        agents,
        visits,
        dashboardStats,
        loading,
        fetchLeads,
        fetchAgents,
        fetchVisits,
        fetchDashboard,
        addLead,
        updateStatus,
        addVisit,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};