import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import { Toaster } from 'react-hot-toast';
import { HistoryProvider } from '@/contexts/HistoryContext';
import AppLayout from '@/components/AppLayout';

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
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="h-screen overflow-hidden antialiased">
        <Toaster position="top-center" />
        <ClientProviders>
          <HistoryProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </HistoryProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
