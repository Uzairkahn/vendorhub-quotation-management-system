const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Quotation = require('../models/Quotation');
const { asyncHandler } = require('../middleware/validate');

// GET stats
router.get('/stats', asyncHandler(async (req, res) => {
  const [totalVendors, activeQuotations, pendingQuotations, approvedQuotations, rejectedQuotations] =
    await Promise.all([
      Vendor.countDocuments(),
      Quotation.countDocuments({ status: 'active' }),
      Quotation.countDocuments({ status: 'pending' }),
      Quotation.countDocuments({ status: 'approved' }),
      Quotation.countDocuments({ status: 'rejected' }),
    ]);

  res.json({ totalVendors, activeQuotations, pendingQuotations, approvedQuotations, rejectedQuotations });
}));

// GET recent activity feed
router.get('/activity', asyncHandler(async (req, res) => {
  const [recentVendors, recentQuotations] = await Promise.all([
    Vendor.find().sort({ createdAt: -1 }).limit(4).select('vendorName createdAt'),
    Quotation.find()
      .sort({ updatedAt: -1 })
      .limit(6)
      .populate('vendor', 'vendorName')
      .select('title status updatedAt vendor'),
  ]);

  const activity = [
    ...recentVendors.map((v) => ({
      type: 'vendor',
      message: `New vendor "${v.vendorName}" added`,
      time: v.createdAt,
      status: 'active',
    })),
    ...recentQuotations.map((q) => ({
      type: 'quotation',
      message: `Quotation "${q.title}" marked as ${q.status}`,
      time: q.updatedAt,
      status: q.status,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 8);

  res.json(activity);
}));

// GET recent vendors
router.get('/recent-vendors', asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().sort({ createdAt: -1 }).limit(5);
  res.json(vendors);
}));

module.exports = router;
