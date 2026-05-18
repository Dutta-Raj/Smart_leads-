import api from './api';
import { Lead, LeadsResponse } from '../types';

export const leadService = {
  getLeads: async (params: any) => {
    const response = await api.get<LeadsResponse>('/leads', { params });
    return response.data;
  },
  
  createLead: async (lead: Partial<Lead>) => {
    const response = await api.post('/leads', lead);
    return response.data;
  },
  
  updateLead: async (id: string, lead: Partial<Lead>) => {
    const response = await api.put(`/leads/${id}`, lead);
    return response.data;
  },
  
  deleteLead: async (id: string) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },
  
  exportLeads: async (filters?: any) => {
    const response = await api.get('/leads/export/csv', { 
      params: filters,
      responseType: 'blob' 
    });
    return response.data;
  }
};
