import { useState } from 'react';

import { FiSettings } from 'react-icons/fi';
import { IoMdClose } from "react-icons/io";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

import PomodoroOverview from './PomodoroOverview';

import { useSettings } from '../contexts/SettingsContext';
import { useModal } from '../contexts/ModalContext';
function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const { showModal } = useModal();

  const { settings, setSettings } = useSettings();




  function handleSettingsDrawer() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }



  function handleChange(event) {
    const { name, value, type, checked, id } = event.target;

    // Layout Settings
    if (id.includes('Location')) {
      const [settingName, settingValue] = id.split('-');
      setSettings((prevSettings) => ({
        ...prevSettings,
        [settingName]: settingValue,
      }));

    }
    // General Settings
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };



  const handleClearDefaults = () => {
    localStorage.clear();
    // reload current window
    window.location.reload();
  }

  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',

    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ];

  const fonts = [
    "Consolas",
    "Raleway",
    "Montserrat",
    "Playfair Display",
    "Poppins",
    "Caveat",
    "Prompt",
    "Kanit",
    "Orbitron",
    "Arima",
    'Arial',
    "Prociono",
    "Playwrite GB S",
    "Dancing Script",
    'Helvetica',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
  ];

  return (
    <>
      <button
        onClick={handleSettingsDrawer}
        className="fixed bottom-4 right-4 btn btn-outline"
      >
        <FiSettings className=" text-xl" />
      </button>

      <div className={`fixed inset-y-0 right-0 w-96 ${isOpen ? 'translate-x-0' : 'translate-x-full'}  bg-base-200 text-base-content shadow-lg p-6  transition-transform duration-300 ease-out overflow-y-auto`}>
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl border-b-2 border-b-accent w-full font-bold mb-4">Settings</h2>
          <button onClick={handleSettingsDrawer} className="btn btn-sm text-3xl  text-center btn-outline btn-error  ml-2   text-error-content">
            <IoMdClose className="text-xl" />
          </button>
        </div>
        <div className="divider divider-neutral">Visual</div>
        {/* Theme Selection */}
        <div className="mb-4">
          <label className="label" htmlFor="theme">
            <span className="label-text">Theme</span>
          </label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {/* Font Selection */}
        <div className="mb-4">
          <label className="label" htmlFor="font">
            <span className="label-text">Font</span>
          </label>
          <select
            id="font"
            name="font"
            value={settings.font}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
        {/* Clock Size */}
        <div className="mb-4">
          <label className="label" htmlFor="clockSize">
            <span className="label-text">Clock Size</span>
          </label>
          <select
            id="clockSize"
            name="clockSize"
            value={settings.clockSize}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
       
            <option value="text-4xl">4XL</option>
            <option value="text-5xl">5XL</option>
            <option value="text-6xl">6XL</option>
            <option value="text-7xl">7XL</option>
       

          </select>
        </div>



        {/* Date Size */}
        <div className="mb-4">
          <label className="label" htmlFor="dateSize">
            <span className="label-text">Date Size</span>
          </label>
          <select
            id="dateSize"
            name="dateSize"
            value={settings.dateSize}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="text-sm">Small</option>
            <option value="text-xl">Medium</option>
            <option value="text-2xl">Large</option>
          </select>
        </div>
        {/** ============================================================================  */}
        {/** ============================================================================  */}
        <div className="divider divider-neutral">Layout </div>

        {/* Clock Location */}
        <div className="mb-4">
          <label className='label'>Clock Location</label>
          <div id="clockLocation" role="tablist" className="tabs tabs-boxed">
            <div onClick={handleChange} id="clockLocation-left" role="tab" className={`tab ${settings.clockLocation === "left" ? "tab-active" : ""}`}>Left</div>
            <div onClick={handleChange} id="clockLocation-center" role="tab" className={`tab ${settings.clockLocation === "center" ? "tab-active" : ""}`}>Center</div>
            <div onClick={handleChange} id="clockLocation-right" role="tab" className={`tab ${settings.clockLocation === "right" ? "tab-active" : ""}`}>Right</div>
          </div>
        </div>
        {/* Todo Location */}
        <div className="mb-4">
          <label className='label'>Todo List</label>
          <div role="tablist" className="tabs tabs-boxed">
            <div onClick={handleChange} id="todoLocation-left" role="tab" className={`tab ${settings.todoLocation === "left" ? "tab-active" : ""}`}>Left</div>
            <div onClick={handleChange} id="todoLocation-center" role="tab" className={`tab ${settings.todoLocation === "center" ? "tab-active" : ""}`}>Center</div>
            <div onClick={handleChange} id="todoLocation-right" role="tab" className={`tab ${settings.todoLocation === "right" ? "tab-active" : ""}`}>Right</div>
          </div>
        </div>
        {/* Favorite Links Location */}
        <div className="mb-4">
          <label className='label'>Favorite Links </label>
          <div role="tablist" className="tabs tabs-boxed">
            <div onClick={handleChange} id="favoriteLinksLocation-left" role="tab" className={`tab ${settings.favoriteLinksLocation === "left" ? "tab-active" : ""}`}>Left</div>
            <div onClick={handleChange} id="favoriteLinksLocation-center" role="tab" className={`tab ${settings.favoriteLinksLocation === "center" ? "tab-active" : ""}`}>Center</div>
            <div onClick={handleChange} id="favoriteLinksLocation-right" role="tab" className={`tab ${settings.favoriteLinksLocation === "right" ? "tab-active" : ""}`}>Right</div>
          </div>
        </div>
        {/* Pomodoro  Location */}
        <div className="mb-4">
          <label className='label'>Pomodoro </label>
          <div role="tablist" className="tabs tabs-boxed">
            <div onClick={handleChange} id="pomodoroLocation-left" role="tab" className={`tab ${settings.pomodoroLocation === "left" ? "tab-active" : ""}`}>Left</div>
            <div onClick={handleChange} id="pomodoroLocation-center" role="tab" className={`tab ${settings.pomodoroLocation === "center" ? "tab-active" : ""}`}>Center</div>
            <div onClick={handleChange} id="pomodoroLocation-right" role="tab" className={`tab ${settings.pomodoroLocation === "right" ? "tab-active" : ""}`}>Right</div>
          </div>
        </div>

        {/** ============================================================================  */}
        {/** ============================================================================  */}
        <div className="divider divider-neutral">Show/Hide </div>
        {/* Show Seconds */}
        <div className="mb-4">
          <label className="label cursor-pointer">
            <span className="label-text">Show Seconds</span>
            <input
              type="checkbox"
              name="showSeconds"
              checked={settings.showSeconds}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </label>
        </div>
        {/* Show Daily Quote */}
        <div className="mb-4">
          <label className="label cursor-pointer">
            <span className="label-text">Show Daily Quote</span>
            <input
              type="checkbox"
              name="showQuote"
              checked={settings.showQuote}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </label>
        </div>
        {/* Show Todo List */}
        <div className="mb-4">
          <label className="label cursor-pointer">
            <span className="label-text">Show Todo List</span>
            <input
              type="checkbox"
              name="showTodoList"
              checked={settings.showTodoList}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </label>
        </div>
        {/* Show/Hide Favorite Links Card */}
        <div className="mb-4">
          <label className="label cursor-pointer">
            <span className="label-text">Show Links</span>
            <input
              type="checkbox"
              name="showFavoriteLinks"
              checked={settings.showFavoriteLinks}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </label>
        </div>
        <div className="divider divider-neutral"> Pomodoro</div>
        {/* Pomodoro settings */}
        <div className="mb-4">
          <label className="label cursor-pointer">
            <span className="label-text">Show Pomodoro Timer</span>
            <input
              type="checkbox"
              name="showPomodoro"
              checked={settings.showPomodoro}
              onChange={handleChange}
              className="toggle"
            />
          </label>
        </div>
        <div className="mb-4">
          <button
            className="btn btn-primary w-full"
            onClick={() => showModal(<PomodoroOverview />)}
          >
            Pomodoro Overview
          </button>
        </div>

        {/* Pomodoro Timer settings */}
        <div className="mb-4">
          <label className="label" htmlFor="workDuration">
            <span className="label-text">Work Duration (minutes)</span>
          </label>
          <input
            type="number"
            id="workDuration"
            name="workDuration"
            value={settings.workDuration}
            onChange={handleChange}
            min="1"
            max="60"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="label" htmlFor="breakDuration">
            <span className="label-text">Break Duration (minutes)</span>
          </label>
          <input
            type="number"
            id="breakDuration"
            name="breakDuration"
            value={settings.breakDuration}
            onChange={handleChange}
            min="1"
            max="30"
            className="input input-bordered w-full"
          />
        </div>
        {/** ============================================================================  */}
        {/** ============================================================================  */}
        <div className="divider divider-primary">Clear Defaults / User Settings </div>

        <div className="mb-4">
          <button
            onClick={handleClearDefaults}
            className="btn btn-error w-full hover:bg-red-800 btn-outline "
          >
            Clear Defaults
          </button>
        </div>
        <div className="divider divider-primary">Feedback / Feature Request </div>

        <div className="mb-4">
          <a href='mailto:arubk744@gmail.com' target="_blank" className="flex  items-center cursor-pointer  bg-primary text-primary-content  hover:shadow-md hover:bg-primary-focus rounded-md py-2 px-4 ">
            < MdOutlineAttachEmail className='text-2xl' />
            <span className='text-md ml-2 ' >arubk744@gmail.com</span>
          </a>
        </div>
        <div className="mb-4">
          <a href='https://wa.me/916006209674' target="_blank" className="flex  items-center cursor-pointer  bg-secondary text-secondary-content  hover:shadow-md hover:bg-secondary-focus rounded-md py-2 px-4 ">
            <FaWhatsapp className='text-2xl' />
            <span className='text-md ml-2 ' >would love to hear your feedback</span>
          </a>
        </div>



      </div>


    </>
  );
}

export default Settings;
