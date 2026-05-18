import express from 'express';
import { createLead, getLeads, updateLead, deleteLead, exportLeads } from '../controllers/lead.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.use(protect);

router.post('/', authorize('admin', 'sales'), createLead);
router.get('/', getLeads);
router.put('/:id', authorize('admin', 'sales'), updateLead);
router.delete('/:id', authorize('admin'), deleteLead);
router.get('/export/csv', authorize('admin', 'sales'), exportLeads);

export default router;
