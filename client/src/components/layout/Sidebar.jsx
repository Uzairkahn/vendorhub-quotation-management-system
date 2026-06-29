import { NavLink } from 'react-router-dom';

const links = [
  { to: '/',           label: 'Dashboard',  icon: '▦' },
  { to: '/vendors',    label: 'Vendors',    icon: '👥' },
  { to: '/quotations', label: 'Quotations', icon: '📄' },
  { to: '/compare',    label: 'Compare',    icon: '⚖️' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <div className="sidebar-logo-icon">🏢</div>
          <div>
            <h2>VendorHub</h2>
            <p>Management System</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section-label">Main Menu</p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Teyzix Core Internship</p>
        <p style={{ marginTop: 2 }}>Task FS-2 · 2026</p>
      </div>
    </aside>
  );
}
