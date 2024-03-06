import React, { useState, useEffect } from "react";
import { FiSun, FiCloud, FiCloudRain, FiCloudDrizzle } from "react-icons/fi";
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

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(baseURLWeather);
      const data = await response.json();
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

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchWeatherData();
    fetchForecastData();
  }, [city]);

  const getIcon = (icon) => {
    switch (icon) {
      case "01d":
        return <FiSun size={32} />;
      case "02d":
      case "02n":
        return <FiCloud size={32} />;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <FiCloudDrizzle size={32} />;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return <FiCloudRain size={32} />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Weather App</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <strong>From:</strong>
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          <option value="">Select a city</option>
          <option value="Ho Chi Minh">Ho Chi Minh</option>
          <option value="Singapore">Singapore</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Athens">Athens</option>
        </select>
      </div>

      <div className="Main-Container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="currentDay">
            <h2>Current Weather</h2>
            <div className="weather-card">
              <h4>
                City:
                <span>{weatherData.name}</span>
              </h4>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Description: {weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>{getIcon(weatherData.weather[0].icon)}</p>
            </div>
          </div>
        )}
        {forecastData && (
          <div className="forecast">
            <h2>Next 3 Days Weather Forecast</h2>
            <div className="forecast-cards">
              {forecastData.list.slice(0, 3).map((forecast, index) => (
                <div key={index} className="forecast-card">
                  <p>Date: {forecast.dt_txt.split(" ")[0]}</p>
                  <p>Temperature: {forecast.main.temp} °C</p>
                  <p>Description: {forecast.weather[0].description}</p>
                  <p>{getIcon(forecast.weather[0].icon)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherComponent;
