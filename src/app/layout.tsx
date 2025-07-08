import './globals.css';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#e9e9e9] text-gray-800">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
