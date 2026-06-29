import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { quotationAPI } from '../utils/api';
import { formatDate, formatCurrency } from '../utils/helpers';
import QuotationModal from '../components/quotations/QuotationModal';

const STATUS_OPTS = [
  { value: '', label: 'All statuses' },
  { value: 'pending',  label: 'Pending' },
  { value: 'active',   label: 'Active' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export default function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState(null); // null | 'new' | quotation object
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await quotationAPI.getAll({
        search: search || undefined,
        status: statusFilter || undefined,
      });
      setQuotations(res.data);
    } catch {
      toast.error('Failed to load quotations');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    try {
      if (modal && modal._id) {
        await quotationAPI.update(modal._id, form);
        toast.success('Quotation updated');
      } else {
        await quotationAPI.create(form);
        toast.success('Quotation created');
      }
      setModal(null);
      load();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to save quotation');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await quotationAPI.updateStatus(id, status);
      toast.success('Status updated');
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    try {
      await quotationAPI.delete(deleteTarget._id);
      toast.success('Quotation deleted');
      setDeleteTarget(null);
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quotations</h1>
          <p className="page-subtitle">
            {quotations.length} quotation{quotations.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('new')}>
          + New Quotation
        </button>
      </div>

      <div className="card">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search by title, description or group..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            style={{ width: 150 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="loading">Loading quotations...</div>
        ) : quotations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <p>No quotations found. Create your first quotation.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Group</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((q) => (
                  <tr key={q._id}>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{q.title}</p>
                      {q.description && (
                        <p style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
                          {q.description.length > 55
                            ? q.description.slice(0, 55) + '...'
                            : q.description}
                        </p>
                      )}
                    </td>
                    <td>
                      <p style={{ fontWeight: 500 }}>{q.vendor?.vendorName || '—'}</p>
                      <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                        {q.vendor?.companyName}
                      </p>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>
                        {formatCurrency(q.amount)}
                      </span>
                    </td>
                    <td>
                      {q.requestGroup ? (
                        <span className="badge badge-inactive">{q.requestGroup}</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {formatDate(q.submissionDate)}
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={q.status}
                        onChange={(e) => handleStatusChange(q._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setModal(q)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(q)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <QuotationModal
          quotation={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal modal-sm">
            <div className="modal-header">
              <h3 className="modal-title">Delete Quotation?</h3>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>×</button>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Delete <strong>"{deleteTarget.title}"</strong>? This cannot be undone.
            </p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
