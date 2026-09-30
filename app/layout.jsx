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
      <body suppressHydrationWarning className="h-screen overflow-hidden antialiased">
        <ClientProviders>
          {/* Flex row: Sidebar (static) + Main (fills remaining space) */}
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto
                            pt-16 pb-24 px-4
                            lg:pt-8 lg:pb-8 lg:px-10
                            bg-gradient-to-br from-purple-900 to-indigo-900">
              {children}
            </main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
