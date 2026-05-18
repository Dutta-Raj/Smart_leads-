import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { leadService } from '../services/lead.service';
import { Lead } from '../types';
import LeadTable from '../components/leads/LeadTable';
import LeadForm from '../components/leads/LeadForm';
import LeadFilters from '../components/leads/LeadFilters';
import { Plus, Download, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '../components/common/AnimatedButton';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>();
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    search: '',
    sort: 'latest',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await leadService.getLeads({
        ...filters,
        page: pagination.page,
      });
      setLeads(response.data);
      setPagination({
        page: response.pagination.page,
        totalPages: response.pagination.totalPages,
        total: response.pagination.total,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filters, pagination.page]);

  const handleCreateLead = async (data: any) => {
    try {
      await leadService.createLead(data);
      toast.success('Lead created successfully');
      setShowForm(false);
      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateLead = async (data: any) => {
    if (!editingLead) return;
    try {
      await leadService.updateLead(editingLead._id, data);
      toast.success('Lead updated successfully');
      setShowForm(false);
      setEditingLead(undefined);
      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadService.deleteLead(id);
        toast.success('Lead deleted successfully');
        fetchLeads();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleExportCSV = async () => {
    try {
      const blob = await leadService.exportLeads(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Export started');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Lead Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track your leads efficiently
            </p>
          </div>
          <div className="flex space-x-3">
            <AnimatedButton variant="success" onClick={handleExportCSV}>
              <Download size={18} className="inline mr-2" />
              Export CSV
            </AnimatedButton>
            <AnimatedButton variant="primary" onClick={() => setShowForm(true)}>
              <Plus size={18} className="inline mr-2" />
              Add Lead
            </AnimatedButton>
          </div>
        </motion.div>

        <LeadFilters filters={filters} onFilterChange={setFilters} />

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LeadTable
                leads={leads}
                onEdit={(lead) => {
                  setEditingLead(lead);
                  setShowForm(true);
                }}
                onDelete={handleDeleteLead}
                userRole={user?.role || 'sales'}
              />
              
              {pagination.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center space-x-2 mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Previous
                  </motion.button>
                  <motion.span className="px-3 py-1">
                    Page {pagination.page} of {pagination.totalPages}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <LeadForm
            onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
            onClose={() => {
              setShowForm(false);
              setEditingLead(undefined);
            }}
            initialData={editingLead}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
