// import React from 'react';
import Clock from './components/Clock';
import Settings from './components/Settings';
import TodoList from './components/TodoList';
import FavoriteLinks from './components/FavoriteLinks';
import Pomodoro from './components/Pomodoro';
// import Modal from './components/Modal';
// import PomodoroModal from './components/PomodoroModal';

//* Providers
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { ModalProvider } from './contexts/ModalContext'
import { TodoProvider } from './contexts/TodoContext';
import { PomodoroDataProvider } from './contexts/PomodoroDataContext';
import { FavoriteLinksProvider } from './contexts/FavoriteLinksContext';




function AppContent() {
  const { settings } = useSettings();



  return (
    <div className="min-h-screen flex flex-col  bg-secondary">

      {/*?=============================  */}
      {/* <Modal /> */}
      {/*==============================  */}
      {/* Row 1 / Clock, Quote & Date Display */}
      <div className="flex flex-row h-[35vh]">
        {/* Row 1 -- LEFT COLUMN */}
        <div className="flex  w-1/3 flex-col justify-center ">
          {settings.clockLocation === 'left' && <Clock />}
        </div>
        {/* Row 1 -- CENTER COLUMN */}
        <div className="flex w-1/3  flex-col justify-center ">
          {settings.clockLocation === 'center' && <Clock />}

        </div>
        {/* Row 1 -- RIGHT COLUMN */}
        <div className="flex w-1/3  flex-col justify-center ">
          {settings.clockLocation === 'right' && <Clock />}

        </div>
      </div>

      {/* Row 2 / Todo List, Pomodoro, Favorite Links */}
      <div className="h-[65vh]  flex flex-row">
        {/* Row 2 -- LEFT COLUMN */}
        <div className="flex w-1/3  flex-col items-center px-4 ">
          {settings.todoLocation === 'left' && settings.showTodoList && <TodoList />}
          {settings.showPomodoro && settings.pomodoroLocation === 'left' && <Pomodoro />}
          {settings.showFavoriteLinks && settings.favoriteLinksLocation === 'left' && <FavoriteLinks />}
        </div>
        {/* Row 2 -- CENTER COLUMN  */}
        <div className="flex w-1/3  flex-col items-center px-4 ">
          {settings.todoLocation === 'center' && settings.showTodoList && <TodoList />}
          {settings.showFavoriteLinks && settings.favoriteLinksLocation === 'center' && <FavoriteLinks />}
          {settings.showPomodoro && settings.pomodoroLocation === 'center' && <Pomodoro />}
        </div>
        {/* Row 2 -- RIGHT COLUMN */}
        <div className="flex w-1/3  flex-col items-center px-4 ">
          {settings.todoLocation === 'right' && settings.showTodoList && <TodoList />}
          {settings.showFavoriteLinks && settings.favoriteLinksLocation === 'right' && <FavoriteLinks />}
          {settings.showPomodoro && settings.pomodoroLocation === 'right' && <Pomodoro />}

        </div>

      </div>
      <Settings />
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <TodoProvider>
        <PomodoroDataProvider>
          <FavoriteLinksProvider>
            <ModalProvider >
              <AppContent />
            </ModalProvider>
          </FavoriteLinksProvider>
        </PomodoroDataProvider>
      </TodoProvider>
    </SettingsProvider>
  );
}

export default App;