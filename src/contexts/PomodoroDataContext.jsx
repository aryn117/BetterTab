import  { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const PomodoroDataContext = createContext();

export const usePomodoroData = () => useContext(PomodoroDataContext);

export const PomodoroDataProvider = ({ children }) => {
  const [sessionsData, setSessionsData] = useState(() => {
    const savedSessions = localStorage.getItem('pomodoroSessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  useEffect(() => {
    localStorage.setItem('pomodoroSessions', JSON.stringify(sessionsData));
  }, [sessionsData]);

  const addSession = (session) => {
    setSessionsData(prevData => {
      const today = new Date().toISOString().split('T')[0];
      const existingDayIndex = prevData.findIndex(day => day.date === today);

      if (existingDayIndex !== -1) {
        const updatedData = [...prevData];
        updatedData[existingDayIndex].sessionsArray.push(session);
        return updatedData;
      } else {
        return [...prevData, { date: today, sessionsArray: [session] }];
      }
    });
  };

  return (
    <PomodoroDataContext.Provider value={{ sessionsData, addSession }}>
      {children}
    </PomodoroDataContext.Provider>
  );
};

PomodoroDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}