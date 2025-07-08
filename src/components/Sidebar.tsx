'use client';

import Link from 'next/link';
import { Building2, FileCheck2 } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white text-gray-800 shadow-lg rounded-2xl h-[95vh] mt-4 ml-4 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#4CAF50] mb-10">Ambisis</h1>
        <nav className="flex flex-col gap-3 text-sm">
          <Link
            href="/empresas"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#E8F5E9] transition"
          >
            <Building2 className="w-5 h-5" />
            Empresas
          </Link>
          <Link
            href="/licencas"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#E8F5E9] transition"
          >
            <FileCheck2 className="w-5 h-5" />
            Licenças
          </Link>
        </nav>
      </div>
      <footer className="text-xs text-gray-400">© 2025 Ambisis</footer>
    </aside>
  );
}
