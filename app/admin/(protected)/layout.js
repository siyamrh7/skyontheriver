import Sidebar from '../../../components/admin/Sidebar';

// No auth check needed here — middleware.js already guards every request
// under /admin/* (and /api/admin/*) before it reaches this layout or any
// nested page/route handler.
export default function ProtectedAdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <Sidebar />
      <div className="admin-main">{children}</div>
    </div>
  );
}
