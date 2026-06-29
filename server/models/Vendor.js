const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: [true, 'Vendor name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    businessAddress: {
      type: String,
      required: [true, 'Business address is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema);
