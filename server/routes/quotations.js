const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Quotation = require('../models/Quotation');
const { validate, asyncHandler } = require('../middleware/validate');

const quotationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('vendor').notEmpty().withMessage('Vendor is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
];

// IMPORTANT: specific routes must come before /:id
// GET all unique request groups
router.get('/groups/list', asyncHandler(async (req, res) => {
  const groups = await Quotation.distinct('requestGroup', { requestGroup: { $ne: '' } });
  res.json(groups);
}));

// GET compare by group
router.get('/compare/:group', asyncHandler(async (req, res) => {
  const group = decodeURIComponent(req.params.group);
  const quotations = await Quotation.find({ requestGroup: group })
    .populate('vendor', 'vendorName companyName email contactNumber')
    .sort({ amount: 1 });

  if (!quotations.length)
    return res.status(404).json({ error: 'No quotations found for this group' });

  res.json(quotations);
}));

// GET all quotations — supports ?search= ?status= ?vendor=
router.get('/', asyncHandler(async (req, res) => {
  const { status, vendor, search } = req.query;
  const query = {};

  if (status) query.status = status;
  if (vendor) query.vendor = vendor;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { requestGroup: { $regex: search, $options: 'i' } },
    ];
  }

  const quotations = await Quotation.find(query)
    .populate('vendor', 'vendorName companyName email')
    .sort({ createdAt: -1 });

  res.json(quotations);
}));

// GET single quotation
router.get('/:id', asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id).populate('vendor');
  if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
  res.json(quotation);
}));

// POST create quotation
router.post('/', quotationRules, validate, asyncHandler(async (req, res) => {
  const quotation = new Quotation(req.body);
  await quotation.save();
  const populated = await quotation.populate('vendor', 'vendorName companyName email');
  res.status(201).json(populated);
}));

// PUT update quotation
router.put('/:id', asyncHandler(async (req, res) => {
  const quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('vendor', 'vendorName companyName email');

  if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
  res.json(quotation);
}));

// PATCH status only
router.patch('/:id/status', asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'active', 'approved', 'rejected'];
  if (!allowed.includes(status))
    return res.status(400).json({ error: 'Invalid status value' });

  const quotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate('vendor', 'vendorName companyName email');

  if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
  res.json(quotation);
}));

// DELETE quotation
router.delete('/:id', asyncHandler(async (req, res) => {
  const quotation = await Quotation.findByIdAndDelete(req.params.id);
  if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
  res.json({ message: 'Quotation deleted successfully' });
}));

module.exports = router;
