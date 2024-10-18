import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('newTabSettings');
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          clockSize: 'text-6xl',
          dateSize: 'text-xl',
          showQuote: true,
          showSeconds: true,
          theme: 'light',
          font: 'Arial',
        };
  });

  useEffect(() => {
    localStorage.setItem('newTabSettings', JSON.stringify(settings));
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.body.style.fontFamily = settings.font;
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};