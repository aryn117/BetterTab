import { createContext, useState, useContext, useEffect } from 'react';


import PropTypes from 'prop-types';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('newTabSettings');
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
        theme: 'light',
        font: 'Consolas',

        showQuote: true,

        clockSize: 'text-6xl',
        showSeconds: false,
        clockLocation: 'center',

        todoLocation: 'left',
        showTodoList: true, // Add this line

        showFavoriteLinks: true,
        favoriteLinksLocation: 'right',

        dateSize: 'text-xl',
        showPomodoro: true, // Add this line
        pomodoroLocation: 'center',
        workDuration: 25, // Add this line
        breakDuration: 5, // Add this line

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

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};