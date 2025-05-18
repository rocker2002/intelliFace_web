'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Teachers', href: '/admin/add-teacher' },
  { name: 'Students', href: '/admin/add-student' },
  { name: 'Classes', href: '#' },
  { name: 'Courses', href: '/admin/courses' },
  { name: 'Attendance', href: '#' },
  { name: 'Reports', href: '#' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen fixed p-6">
      <h1 className="text-2xl font-bold mb-8 text-black">IntelliFace</h1>
      <nav className="space-y-4">
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-4 py-2 rounded-lg font-medium ${
              pathname === item.href
                ? 'bg-purple-700 text-white'
                : 'text-black hover:bg-purple-100 hover:text-purple-700'
            }`}
          >
            {item.name}
          </Link>
        ))}
        <hr className="my-4" />
        <button className="text-left w-full text-red-500 hover:underline mt-4">
          Logout
        </button>
      </nav>
    </div>
  );
}
