import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../utils/api';
import { timeAgo, initials } from '../utils/helpers';

const STAT_CARDS = [
  { key: 'totalVendors',       label: 'Total Vendors',       icon: '👥', colorClass: 'blue',   valueColor: 'color-blue',   sub: 'registered in system' },
  { key: 'activeQuotations',   label: 'Active Quotations',   icon: '📋', colorClass: 'amber',  valueColor: 'color-amber',  sub: 'currently open' },
  { key: 'pendingQuotations',  label: 'Pending',             icon: '⏳', colorClass: 'red',    valueColor: 'color-red',    sub: 'awaiting response' },
  { key: 'approvedQuotations', label: 'Approved',            icon: '✅', colorClass: 'green',  valueColor: 'color-green',  sub: 'quotations' },
];

function dotClass(type, status) {
  if (type === 'vendor') return 'dot-purple';
  if (status === 'approved') return 'dot-blue';
  if (status === 'active') return 'dot-green';
  if (status === 'pending') return 'dot-amber';
  if (status === 'rejected') return 'dot-red';
  return 'dot-green';
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, a, v] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getActivity(),
          dashboardAPI.getRecentVendors(),
        ]);
        setStats(s.data);
        setActivity(a.data);
        setVendors(v.data);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back — here's your system overview</p>
        </div>
        <Link to="/quotations" className="btn btn-primary">+ New Quotation</Link>
      </div>

      {/* Stat cards */}
      {stats && (
        <div className="stats-grid">
          {STAT_CARDS.map((card) => (
            <div className={`stat-card ${card.colorClass}`} key={card.key}>
              <div className="stat-icon" style={{ background: 'var(--accent-light)' }}>
                {card.icon}
              </div>
              <p className="stat-label">{card.label}</p>
              <p className={`stat-value ${card.valueColor}`}>{stats[card.key] ?? 0}</p>
              <p className="stat-sub">{card.sub}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bottom-grid">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
            <Link to="/quotations" className="link-btn">View all →</Link>
          </div>
          {activity.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No activity yet. Add a vendor to get started.</p>
            </div>
          ) : (
            activity.map((item, i) => (
              <div className="activity-item" key={i}>
                <div className={`activity-dot ${dotClass(item.type, item.status)}`} />
                <div>
                  <p className="activity-text">{item.message}</p>
                  <p className="activity-time">{timeAgo(item.time)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Recent Vendors */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Vendors</span>
            <Link to="/vendors" className="link-btn">Manage →</Link>
          </div>
          {vendors.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <p>No vendors yet.</p>
            </div>
          ) : (
            vendors.map((v) => (
              <div className="vendor-row" key={v._id}>
                <div className="avatar">{initials(v.vendorName)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="vendor-name">{v.vendorName}</p>
                  <p className="vendor-email">{v.email}</p>
                </div>
                <span className={`badge badge-${v.status}`}>{v.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
