import './globals.css';
import Sidebar from '@/components/Sidebar';
import ClientProviders from '@/components/ClientProviders';

export const metadata = {
  title: 'V-Try | Premium Virtual Try-On',
  description: 'Experience the future of fashion with V-Try.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-purple-900 text-white min-h-screen flex antialiased overflow-hidden">
        <ClientProviders>
          <Sidebar />
          <main className="flex-1 p-6 lg:p-12 h-screen overflow-y-auto bg-gradient-to-br from-purple-900 to-indigo-900">
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
