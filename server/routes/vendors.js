const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Vendor = require('../models/Vendor');
const { validate, asyncHandler } = require('../middleware/validate');

const vendorRules = [
  body('vendorName').notEmpty().withMessage('Vendor name is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('contactNumber').notEmpty().withMessage('Contact number is required'),
  body('businessAddress').notEmpty().withMessage('Business address is required'),
];

// GET all vendors — supports ?search= and ?status= and ?limit=
router.get('/', asyncHandler(async (req, res) => {
  const { search, status, limit } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { vendorName: { $regex: search, $options: 'i' } },
      { companyName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (status) query.status = status;

  const vendors = await Vendor.find(query)
    .sort({ createdAt: -1 })
    .limit(limit ? parseInt(limit) : 0);

  res.json(vendors);
}));

// GET single vendor
router.get('/:id', asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  res.json(vendor);
}));

// POST create vendor
router.post('/', vendorRules, validate, asyncHandler(async (req, res) => {
  const vendor = new Vendor(req.body);
  await vendor.save();
  res.status(201).json(vendor);
}));

// PUT update vendor
router.put('/:id', vendorRules, validate, asyncHandler(async (req, res) => {
  const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  res.json(vendor);
}));

// DELETE vendor
router.delete('/:id', asyncHandler(async (req, res) => {
  const vendor = await Vendor.findByIdAndDelete(req.params.id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  res.json({ message: 'Vendor deleted successfully' });
}));

module.exports = router;
