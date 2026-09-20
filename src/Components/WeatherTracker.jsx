import { useCallback, useEffect, useState } from 'react';
import { CloudSun, LoaderCircle, RefreshCw } from 'lucide-react';

const DEFAULT_CITY = 'Delhi, India';

const WeatherTracker = () => {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const loadWeather = useCallback(async (location = DEFAULT_CITY) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) {
      setError('Add VITE_WEATHER_API_KEY to .env.local to enable weather tracking.');
      return;
    }

    setStatus('loading');
    setError('');
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(location)}&aqi=no`,
      );
      if (!response.ok) throw new Error('Weather service returned an error.');
      setWeather(await response.json());
      setStatus('ready');
    } catch {
      setStatus('error');
      setError('Unable to load weather right now. Check the city or API key.');
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      loadWeather();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => loadWeather(`${coords.latitude},${coords.longitude}`),
      () => loadWeather(),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  }, [loadWeather]);

  return (
    <div className="weather-status" title={weather ? `${weather.location.name}: ${weather.current.condition.text}` : 'Loading current weather'}>
      {status === 'loading' && <LoaderCircle className="spin" size={14} aria-label="Loading weather" />}
      {weather && status === 'ready' && <img src={`https:${weather.current.condition.icon}`} alt="" />}
      <span className="weather-status-copy">
        <small><CloudSun size={12} /> {weather ? weather.location.name : 'weather'}</small>
        <strong>{weather && status === 'ready' ? `${Math.round(weather.current.temp_c)}°C` : '--'}</strong>
      </span>
      <button className="icon-button" type="button" onClick={() => loadWeather()} aria-label="Refresh current weather">
          <RefreshCw size={15} />
      </button>
      {error && <span className="sr-only">{error}</span>}
    </div>
  );
};

export default WeatherTracker;
