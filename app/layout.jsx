import './globals.css';
import Sidebar from '@/components/Sidebar';
import ClientProviders from '@/components/ClientProviders';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'V-Try | Premium Virtual Try-On',
  description: 'Experience the future of fashion. AI-powered virtual try-on studio for premium outfits.',
  metadataBase: new URL('https://vtry-app.netlify.app'),
  openGraph: {
    title: 'V-Try | Premium Virtual Try-On',
    description: 'Experience the future of fashion. AI-powered virtual try-on studio for premium outfits.',
    url: 'https://vtry-app.netlify.app/',
    siteName: 'V-Try',
    images: [
      {
        url: '/v.jpg', 
        width: 1200,
        height: 1200,
        alt: 'V-Try Official Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V-Try | Premium Virtual Try-On',
    description: 'Experience the future of fashion. AI-powered virtual try-on studio for premium outfits.',
    images: ['/v.jpg'],
  },
  icons: {
    icon: '/vt.png',
    apple: '/vt.png',
  },
  appleWebApp: {
    capable: true,
    title: 'V-Try',
    statusBarStyle: 'default',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-screen overflow-hidden antialiased">
        <Toaster position="top-center" />
        <ClientProviders>
          {/* Flex row: Sidebar (static) + Main (fills remaining space) */}
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto
                            pt-16 pb-24 px-4
                            lg:pt-8 lg:pb-8 lg:px-10
                            bg-app-bg text-text-main dark:bg-slate-900 dark:text-white">
              {children}
            </main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
