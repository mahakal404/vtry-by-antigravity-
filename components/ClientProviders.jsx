'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TokenProvider } from '../contexts/TokenContext';
import { HistoryProvider } from '../contexts/HistoryContext';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TokenProvider>
          <HistoryProvider>
            {children}
          </HistoryProvider>
        </TokenProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
