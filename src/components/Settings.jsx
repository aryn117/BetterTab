import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

function Settings({ settings, setSettings }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
    'luxury',
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
    'Arial',
    'Helvetica',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',

    "Consolas"
  ];

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="fixed bottom-4 right-4 btn btn-outline"
      >
        <FiSettings className=" text-xl" />
      </button>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-base-200 shadow-lg p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
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
              <option value="text-4xl">Small</option>
              <option value="text-6xl">Medium</option>
              <option value="text-8xl">Large</option>
            </select>
          </div>
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
          <button onClick={toggleDrawer} className="btn btn-primary w-full">
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Settings;
