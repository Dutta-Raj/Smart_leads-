import { Response } from 'express';
import { AuthRequest } from '../types';
import { Lead } from '../models/Lead.model';

export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.create({ ...req.body, createdBy: req.user!.id });
    res.status(201).json({ success: true, data: lead });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const query: any = {};
    
    if (req.query.status) query.status = req.query.status;
    if (req.query.source) query.source = req.query.source;
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } }
      ];
    }
    
    if (req.user?.role === "sales") query.createdBy = req.user.id;
    
    const sortOrder = req.query.sort === "oldest" ? 1 : -1;
    
    const leads = await Lead.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);
      
    const total = await Lead.countDocuments(query);
    
    res.json({
      success: true,
      data: leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, error: "Lead not found" });
      return;
    }
    
    if (req.user?.role === "sales" && lead.createdBy !== req.user.id) {
      res.status(403).json({ success: false, error: "Access denied" });
      return;
    }
    
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updatedLead });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, error: "Lead not found" });
      return;
    }
    
    if (req.user?.role !== "admin") {
      res.status(403).json({ success: false, error: "Only admins can delete leads" });
      return;
    }
    
    await lead.deleteOne();
    res.json({ success: true, message: "Lead deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const exportLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const query: any = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.source) query.source = req.query.source;
    if (req.user?.role === "sales") query.createdBy = req.user.id;
    
    const leads = await Lead.find(query);
    
    // Manual CSV creation
    const csvHeaders = ['Name,Email,Status,Source,Created At\n'];
    const csvRows = leads.map(lead => {
      return `${lead.name},${lead.email},${lead.status},${lead.source},${lead.createdAt}\n`;
    });
    
    const csv = csvHeaders.concat(csvRows).join('');
    
    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csv);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
