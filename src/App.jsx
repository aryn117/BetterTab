import React from 'react';
import Clock from './components/Clock';
import Settings from './components/Settings';
import TodoList from './components/TodoList';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { TodoProvider } from './contexts/TodoContext';

function AppContent() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary">
      <Clock />
      {settings.showTodoList && <TodoList />}
      <Settings />
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </SettingsProvider>
  );
}

export default App;