import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSettings } from '../contexts/SettingsContext';

function Clock() {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState('');
  const { settings } = useSettings();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://quote.aryanue195035ece.workers.dev');
        const data = await response.text();
        setQuote(data);   
       
      } catch (error) {
        console.error('Error fetching quote:', error);
       
      }
    };

    if (settings.showQuote) {
      fetchQuote();
    }
  }, [settings.showQuote]);

  const timeFormat = settings.showSeconds ? 'hh:mm:ss a' : 'hh:mm a';

  return (
    <div className="text-center text-secondary-content">
      <div
        className={`${settings.clockSize} font-bold`}
        style={{ fontFamily: settings.font }}
      >
        {format(time, timeFormat)}
      </div>
      <div
        className={`${settings.dateSize} mt-2`}
        style={{ fontFamily: settings.font }}
      >
        {format(time, 'EEEE, MMMM do, yyyy')}
      </div>
      {settings.showQuote && (
        <div
          className="mt-4 text-md max-w-lg mx-auto italic"
          style={{ fontFamily: settings.font }}
        >
          {quote}
        </div>
      )}
    </div>
  );
}

export default Clock;
