'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TokenProvider } from '../contexts/TokenContext';
import { HistoryProvider } from '../contexts/HistoryContext';
import { StudioProvider } from '../contexts/StudioContext';
import GiftClaimModal from './GiftClaimModal';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TokenProvider>
          <HistoryProvider>
            <StudioProvider>
              {children}
              <GiftClaimModal />
            </StudioProvider>
          </HistoryProvider>
        </TokenProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
