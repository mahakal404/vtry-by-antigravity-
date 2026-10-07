import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import { Toaster } from 'react-hot-toast';
import { HistoryProvider } from '@/contexts/HistoryContext';
import AppLayout from '@/components/AppLayout';

export const metadata = {
  metadataBase: new URL('https://vtry-app.netlify.app'),
  title: 'V-Try | AI-Powered Virtual Try-On Studio',
  description: 'Stop guessing your size. Use our state-of-the-art AI to instantly visualize how any garment looks on your unique body shape. Try V-Try free today.',
  keywords: 'Virtual Try-on, AI fashion, AI try on clothes online, V-Try studio, virtual fitting room',
  openGraph: {
    title: 'V-Try | AI-Powered Virtual Try-On Studio',
    description: 'Stop guessing your size. Use our state-of-the-art AI to instantly visualize how any garment looks on your unique body shape. Try V-Try free today.',
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
    title: 'V-Try | AI-Powered Virtual Try-On Studio',
    description: 'Stop guessing your size. Use our state-of-the-art AI to instantly visualize how any garment looks on your unique body shape. Try V-Try free today.',
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
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col bg-app-bg text-text-main dark:bg-slate-900 dark:text-white">
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
