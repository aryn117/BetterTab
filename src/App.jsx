import React from 'react';
import Clock from './components/Clock';
import Settings from './components/Settings';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';

function AppContent() {
  const { settings, setSettings } = useSettings();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary">
      <Clock />
      <Settings settings={settings} setSettings={setSettings} />
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;