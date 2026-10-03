'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TokenProvider } from '../contexts/TokenContext';
import { HistoryProvider } from '../contexts/HistoryContext';
import { StudioProvider } from '../contexts/StudioContext';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TokenProvider>
          <HistoryProvider>
            <StudioProvider>
              {children}
            </StudioProvider>
          </HistoryProvider>
        </TokenProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
