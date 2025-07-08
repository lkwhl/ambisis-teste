'use client';

import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const path = usePathname();
  const parts = path.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <span>Home</span>
      {parts.map((p, i) => (
        <span key={i}> / {p.charAt(0).toUpperCase() + p.slice(1)}</span>
      ))}
    </nav>
  );
}
