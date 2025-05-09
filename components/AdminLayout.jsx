import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
