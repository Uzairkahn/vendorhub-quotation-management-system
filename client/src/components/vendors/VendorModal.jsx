import { useState, useEffect } from 'react';

const EMPTY = {
  vendorName: '',
  companyName: '',
  email: '',
  contactNumber: '',
  businessAddress: '',
  status: 'active',
};

export default function VendorModal({ vendor, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (vendor) {
      setForm({
        vendorName: vendor.vendorName || '',
        companyName: vendor.companyName || '',
        email: vendor.email || '',
        contactNumber: vendor.contactNumber || '',
        businessAddress: vendor.businessAddress || '',
        status: vendor.status || 'active',
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.vendorName.trim()) e.vendorName = 'Vendor name is required';
    if (!form.companyName.trim()) e.companyName = 'Company name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.contactNumber.trim()) e.contactNumber = 'Contact number is required';
    if (!form.businessAddress.trim()) e.businessAddress = 'Business address is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // ── IMPORTANT: All inputs are written directly in JSX (NOT as a sub-component).
  // Defining a component inside render (like const Field = ...) causes React to
  // remount it on every keystroke, making the input lose focus after each character.

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{vendor ? 'Edit Vendor' : 'Add New Vendor'}</h3>
          <button className="modal-close" onClick={onClose} type="button">×</button>
        </div>

        <div className="two-col">
          <div className="form-group">
            <label className="form-label">Vendor name</label>
            <input
              className="form-input"
              type="text"
              name="vendorName"
              value={form.vendorName}
              onChange={handleChange}
              placeholder="e.g. John Smith"
              autoComplete="off"
            />
            {errors.vendorName && <p className="form-error">{errors.vendorName}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Company name</label>
            <input
              className="form-input"
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="e.g. TechSupply Co."
              autoComplete="off"
            />
            {errors.companyName && <p className="form-error">{errors.companyName}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. contact@company.com"
            autoComplete="off"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Contact number</label>
          <input
            className="form-input"
            type="text"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="e.g. +92 300 1234567"
            autoComplete="off"
          />
          {errors.contactNumber && <p className="form-error">{errors.contactNumber}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Business address</label>
          <input
            className="form-input"
            type="text"
            name="businessAddress"
            value={form.businessAddress}
            onChange={handleChange}
            placeholder="e.g. 123 Street, City, Country"
            autoComplete="off"
          />
          {errors.businessAddress && <p className="form-error">{errors.businessAddress}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={saving}
            type="button"
          >
            {saving ? 'Saving...' : vendor ? 'Update vendor' : 'Add vendor'}
          </button>
        </div>
      </div>
    </div>
  );
}
