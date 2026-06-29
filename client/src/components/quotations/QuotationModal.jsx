import { useState, useEffect } from 'react';
import { vendorAPI } from '../../utils/api';

const EMPTY = {
  title: '',
  description: '',
  vendor: '',
  amount: '',
  status: 'pending',
  requestGroup: '',
};

export default function QuotationModal({ quotation, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    vendorAPI.getAll({ status: 'active' }).then((r) => setVendors(r.data)).catch(() => {});

    if (quotation) {
      setForm({
        title: quotation.title || '',
        description: quotation.description || '',
        vendor: quotation.vendor?._id || quotation.vendor || '',
        amount: quotation.amount != null ? String(quotation.amount) : '',
        status: quotation.status || 'pending',
        requestGroup: quotation.requestGroup || '',
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [quotation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.vendor) e.vendor = 'Please select a vendor';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) < 0)
      e.amount = 'Enter a valid amount';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    await onSave({ ...form, amount: Number(form.amount) });
    setSaving(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{quotation ? 'Edit Quotation' : 'New Quotation'}</h3>
          <button className="modal-close" onClick={onClose} type="button">×</button>
        </div>

        <div className="form-group">
          <label className="form-label">Quotation title</label>
          <input
            className="form-input"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Office Supplies Procurement"
            autoComplete="off"
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Description <span className="form-hint" style={{ display:'inline' }}>(optional)</span></label>
          <textarea
            className="form-textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief description of the quotation request..."
          />
        </div>

        <div className="two-col">
          <div className="form-group">
            <label className="form-label">Assign to vendor</label>
            <select
              className="form-select"
              name="vendor"
              value={form.vendor}
              onChange={handleChange}
            >
              <option value="">Select a vendor</option>
              {vendors.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.vendorName} — {v.companyName}
                </option>
              ))}
            </select>
            {errors.vendor && <p className="form-error">{errors.vendor}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Amount (USD)</label>
            <input
              className="form-input"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.amount && <p className="form-error">{errors.amount}</p>}
          </div>
        </div>

        <div className="two-col">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" name="status" value={form.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Request group</label>
            <input
              className="form-input"
              type="text"
              name="requestGroup"
              value={form.requestGroup}
              onChange={handleChange}
              placeholder="e.g. Office Supplies Q1"
              autoComplete="off"
            />
            <p className="form-hint">Same group name = comparable quotations</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} type="button">Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving} type="button">
            {saving ? 'Saving...' : quotation ? 'Update quotation' : 'Create quotation'}
          </button>
        </div>
      </div>
    </div>
  );
}
