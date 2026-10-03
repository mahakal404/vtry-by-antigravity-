'use client';
import { createContext, useContext, useState } from 'react';

const StudioContext = createContext(null);

export function StudioProvider({ children }) {
  const [userPhotoBase64, setUserPhotoBase64] = useState(null);
  const [clothingPhotoBase64, setClothingPhotoBase64] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);

  return (
    <StudioContext.Provider value={{
      userPhotoBase64, setUserPhotoBase64,
      clothingPhotoBase64, setClothingPhotoBase64,
      currentResult, setCurrentResult
    }}>
      {children}
    </StudioContext.Provider>
  );
}

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) throw new Error('useStudio must be used within StudioProvider');
  return context;
};
