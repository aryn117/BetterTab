import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { usePomodoroData } from '../contexts/PomodoroDataContext';
// import PomodoroModal from './PomodoroModal';

import { IoPlayOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { BsSkipForward } from "react-icons/bs";
// import { is } from 'date-fns/locale';


function Pomodoro() {
  const { settings } = useSettings();
  const { addSession } = usePomodoroData();
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [sessionStartTime, setSessionStartTime] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      finishSession();
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWork, settings.workDuration, settings.breakDuration]);

  const toggleTimer = () => {
    if (!isActive && !sessionStartTime) {
      setSessionStartTime(new Date());
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsWork(true);
    setTimeLeft(settings.workDuration * 60);
    setSessionStartTime(null);
  };

  const switchSession = () => {
    finishSession();
    if (isWork) {
      setTimeLeft(settings.breakDuration * 60);
      setIsWork(false);
    } else {
      setTimeLeft(settings.workDuration * 60);
      setIsWork(true);
    }
    setSessionStartTime(new Date());
  };

  const finishSession = () => {
    if (sessionStartTime) {
      const endTime = new Date();
      addSession({
        sessionType: isWork ? 'work' : 'break',
        startTime: sessionStartTime.toISOString(),
        endTime: endTime.toISOString(),
      });
      setSessionStartTime(null);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = isWork
    ? (timeLeft / (settings.workDuration * 60)) * 100
    : (timeLeft / (settings.breakDuration * 60)) * 100;

  return (
    <>
      <div className="card w-full bg-base-200 text-base-content shadow-xl mt-2">
        <div className="card-body ">
          {/* <h2 className="card-title border-b-2 border-b-primary w-full">{isWork ? 'Work Time' : 'Break Time'}</h2> */}
          {/* TItle Tabs */}
          <div className="flex  flex-row items-center justify-between">
            <span className={` text-sm text-center w-1/2  py-1  rounded-full ${isWork ?  'bg-secondary shadow-md text-secondary-content' : ""} `}>Pomodoro</span>
            <span className={` text-sm text-center w-1/2  py-1 rounded-full  ${isWork ?  "" : 'bg-secondary shadow-md text-secondary-content'}  `}>Break</span>
          </div>

          {/* ------------------- */}


          <div className="flex flex-row w-full mt-4 text-center justify-between items-center ">
            <div className="relative w-28 aspect-square">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="5"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                ></circle>
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="5"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * percentage) / 100}
                  transform="rotate(-90 50 50)"
                ></circle>
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            <div className="card-actions flex flex-row mt-4">
              <button className="btn btn-primary text-xl text-primary-content" onClick={toggleTimer}>
                {isActive ? <IoPauseOutline /> : <IoPlayOutline />}
              </button>
              <button className="btn btn-secondary text-xl text-secondary-content" onClick={resetTimer}>
                {<TfiReload />}

              </button>
              <button className="btn btn-accent text-accent-content text-xl" onClick={switchSession}>

                {<BsSkipForward />}
              </button>
            </div>

          </div>
        </div>
      </div>

    </>
  );
}

export default Pomodoro;

