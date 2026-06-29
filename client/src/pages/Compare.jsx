import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { quotationAPI } from '../utils/api';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function Compare() {
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState('');
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupsLoading, setGroupsLoading] = useState(true);

  useEffect(() => {
    quotationAPI.getGroups()
      .then((r) => setGroups(r.data))
      .catch(() => toast.error('Failed to load request groups'))
      .finally(() => setGroupsLoading(false));
  }, []);

  const handleCompare = async () => {
    if (!selected) return;
    setLoading(true);
    setQuotations([]);
    try {
      const res = await quotationAPI.compare(selected);
      setQuotations(res.data);
    } catch {
      toast.error('No quotations found for this group');
    } finally {
      setLoading(false);
    }
  };

  const handleGroupChange = (e) => {
    setSelected(e.target.value);
    setQuotations([]);
  };

  const bestId = quotations.length
    ? quotations.reduce((best, q) => (q.amount < best.amount ? q : best), quotations[0])._id
    : null;

  const lowestAmt  = quotations.length ? quotations[0].amount : 0;
  const highestAmt = quotations.length ? quotations[quotations.length - 1].amount : 0;
  const savings    = highestAmt - lowestAmt;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Compare Quotations</h1>
          <p className="page-subtitle">
            Select a request group to compare vendor proposals side by side
          </p>
        </div>
      </div>

      {/* Group selector card */}
      <div className="card" style={{ marginBottom: 20 }}>
        <p className="card-title" style={{ marginBottom: 14 }}>Select Request Group</p>

        {groupsLoading ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Loading groups...</p>
        ) : groups.length === 0 ? (
          <div
            style={{
              background: 'var(--warning-light)',
              border: '1px solid #fde68a',
              borderRadius: 8,
              padding: '12px 16px',
              fontSize: 13,
              color: '#92400e',
              lineHeight: 1.6,
            }}
          >
            <strong>No request groups found.</strong> When creating a quotation, fill in the
            <strong> "Request group"</strong> field with the same name across multiple vendors
            (e.g. <em>"Office Supplies Q1"</em>). Then come back here to compare them.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Request group</label>
              <select
                className="form-select"
                value={selected}
                onChange={handleGroupChange}
              >
                <option value="">— Choose a group —</option>
                {groups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleCompare}
              disabled={!selected || loading}
            >
              {loading ? 'Loading...' : '⚖️ Compare'}
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {quotations.length > 0 && (
        <>
          {/* Summary stat cards */}
          <div className="stats-grid" style={{ marginBottom: 20 }}>
            <div className="stat-card blue">
              <div className="stat-icon" style={{ background: 'var(--info-light)' }}>⚖️</div>
              <p className="stat-label">Vendors compared</p>
              <p className="stat-value color-blue">{quotations.length}</p>
            </div>
            <div className="stat-card green">
              <div className="stat-icon" style={{ background: 'var(--success-light)' }}>🏆</div>
              <p className="stat-label">Lowest quote</p>
              <p className="stat-value color-green">{formatCurrency(lowestAmt)}</p>
              <p className="stat-sub">{quotations[0].vendor?.vendorName}</p>
            </div>
            <div className="stat-card red">
              <div className="stat-icon" style={{ background: 'var(--danger-light)' }}>📈</div>
              <p className="stat-label">Highest quote</p>
              <p className="stat-value color-red">{formatCurrency(highestAmt)}</p>
              <p className="stat-sub">{quotations[quotations.length - 1].vendor?.vendorName}</p>
            </div>
            <div className="stat-card amber">
              <div className="stat-icon" style={{ background: 'var(--warning-light)' }}>💰</div>
              <p className="stat-label">Potential savings</p>
              <p className="stat-value color-amber">{formatCurrency(savings)}</p>
              <p className="stat-sub">vs most expensive</p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                Results for: <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>{selected}</em>
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Sorted lowest → highest price
              </span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>Rank</th>
                    <th>Vendor</th>
                    <th>Quotation</th>
                    <th>Amount</th>
                    <th>vs Best</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map((q, i) => (
                    <tr key={q._id} className={q._id === bestId ? 'best-row' : ''}>
                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 16,
                            color: i === 0 ? 'var(--success)' : 'var(--text-muted)',
                          }}
                        >
                          #{i + 1}
                        </span>
                      </td>
                      <td>
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', display:'flex', alignItems:'center', gap:6 }}>
                          {q.vendor?.vendorName}
                          {q._id === bestId && <span className="best-badge">Best Price</span>}
                        </p>
                        <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                          {q.vendor?.email}
                        </p>
                      </td>
                      <td>
                        <p style={{ fontWeight: 500 }}>{q.title}</p>
                        {q.description && (
                          <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                            {q.description.slice(0, 50)}{q.description.length > 50 ? '...' : ''}
                          </p>
                        )}
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 15,
                            color: i === 0 ? 'var(--success)' : 'var(--text-primary)',
                          }}
                        >
                          {formatCurrency(q.amount)}
                        </span>
                      </td>
                      <td>
                        {i === 0 ? (
                          <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: 13 }}>
                            Baseline
                          </span>
                        ) : (
                          <span className="savings-diff">
                            +{formatCurrency(q.amount - lowestAmt)}
                          </span>
                        )}
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                        {formatDate(q.submissionDate)}
                      </td>
                      <td>
                        <span className={`badge badge-${q.status}`}>{q.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
