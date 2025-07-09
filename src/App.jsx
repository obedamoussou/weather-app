import { useState } from 'react';

const API_KEY = "58c25413c9ad4c2988183354250907";

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


const fetchWeather = async () => {
  if (!city.trim()) return;
  setLoading(true); // 🔁 Loader ON
  setWeather(null); // 🔄 Effacer ancienne météo
  setError('');

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=fr`
    );

    const data = await res.json();

    if (data.error) {
      setError(data.error.message);
    } else {
      setWeather(data);
    }
  } catch {
    setError("Erreur de chargement");
  } finally {
    setLoading(false); // ✅ Loader OFF
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 text-white flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">🌍 Météo Instantanée</h1>

        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Entrez une ville"
            className="p-3 rounded-xl text-black flex-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className={`px-4 py-2 rounded-xl transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Chargement..." : "Rechercher"}
          </button>
        </div>


        {error && <p className="text-red-300 mb-4">{error}</p>}

        {loading && (
          <div className="flex justify-center my-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {weather && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{weather.location.name}, {weather.location.country}</h2>
            <p className="text-lg italic">{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt="weather icon"
              className="mx-auto"
            />
            <p className="text-4xl font-semibold">{weather.current.temp_c}°C</p>
            <p>🌡️ Ressenti : {weather.current.feelslike_c}°C</p>
            <p>💧 Humidité : {weather.current.humidity}%</p>
            <p>💨 Vent : {weather.current.wind_kph} km/h</p>
            <p className="text-sm opacity-70">Dernière mise à jour : {weather.current.last_updated}</p>
          </div>
        )}
      </div>
    </div>
  );
}
