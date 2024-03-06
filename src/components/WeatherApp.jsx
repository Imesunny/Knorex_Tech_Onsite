import { useState, useEffect } from "react";
import "./weather.css";

const WeatherComponent = () => {
  const apiKey = `310ac9aa425d810e1d282ae1c4915577`;

  const [city, setCity] = useState("Singapore");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const baseURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchWeatherData();

    fetchForecastData();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(baseURLWeather);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching weather data. Please try again later.");
      setLoading(false);
    }
  };

  const fetchForecastData = async () => {
    try {
      const response = await fetch(baseURLForecast);
      const data = await response.json();
      setForecastData(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching forecast data. Please try again later.");
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <h1>Weather App Assignment</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <strong>From:</strong>
        <select
          onChange={handleCityChange}
          value={city}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Select a city</option>
          <option value="Ho Chi Minh">Ho Chi Minh</option>
          <option value="Singapore">Singapore</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Athens">Athens</option>
        </select>
      </div>

      <div className="weather-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <div className="current-weather">
            <h2>Current Weather</h2>
            <h4>
              City:
              <span>{weatherData.name}</span>
            </h4>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Description: {weatherData.weather[0].description}</p>
            {/* <p>Icon: {weatherData.weather[0].icon}</p> */}
          </div>
        )}
        {forecastData && (
          <div className="forecast">
            <h2>Next 3 Days Forecast</h2>
            {forecastData.list.slice(0, 3).map((forecast, index) => (
              <div key={index} className="forecast-item">
                <p>Date: {forecast.dt_txt.split(" ")[0]}</p>
                <p>Temperature: {forecast.main.temp} °C</p>

                <p>Description: {forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherComponent;
