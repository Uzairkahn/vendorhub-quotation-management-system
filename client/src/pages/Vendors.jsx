import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { vendorAPI } from '../utils/api';
import { initials, formatDate } from '../utils/helpers';
import VendorModal from '../components/vendors/VendorModal';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | vendor object
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await vendorAPI.getAll({
        search: search || undefined,
        status: statusFilter || undefined,
      });
      setVendors(res.data);
    } catch {
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    try {
      if (modal && modal._id) {
        await vendorAPI.update(modal._id, form);
        toast.success('Vendor updated successfully');
      } else {
        await vendorAPI.create(form);
        toast.success('Vendor added successfully');
      }
      setModal(null);
      load();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to save vendor');
    }
  };

  const handleDelete = async () => {
    try {
      await vendorAPI.delete(deleteTarget._id);
      toast.success(`"${deleteTarget.vendorName}" deleted`);
      setDeleteTarget(null);
      load();
    } catch {
      toast.error('Failed to delete vendor');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Vendors</h1>
          <p className="page-subtitle">
            {vendors.length} vendor{vendors.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')}>
          + Add Vendor
        </button>
      </div>

      <div className="card">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search by name, company or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            style={{ width: 140 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="loading">Loading vendors...</div>
        ) : vendors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>No vendors found. Click "Add Vendor" to get started.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div className="avatar">{initials(v.vendorName)}</div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {v.vendorName}
                        </span>
                      </div>
                    </td>
                    <td>{v.companyName}</td>
                    <td style={{ color: 'var(--accent)' }}>{v.email}</td>
                    <td>{v.contactNumber}</td>
                    <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {v.businessAddress}
                    </td>
                    <td>
                      <span className={`badge badge-${v.status}`}>{v.status}</span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {formatDate(v.createdAt)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setModal(v)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(v)}
                        >
                          🗑️ Delete
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

      {/* Add / Edit Modal */}
      {modal && (
        <VendorModal
          vendor={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal modal-sm">
            <div className="modal-header">
              <h3 className="modal-title">Delete Vendor?</h3>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>×</button>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Are you sure you want to delete <strong>{deleteTarget.vendorName}</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
