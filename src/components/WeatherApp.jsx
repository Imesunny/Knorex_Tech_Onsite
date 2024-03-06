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


  return (
    <>
      <h1>Weather App</h1>
      <select onChange={handleCityChange} value={city}>
        <option value="">Select a city</option>
        <option value="Ho Chi Minh">Ho Chi Minh</option>
        <option value="Singapore">Singapore</option>
        <option value="Kuala Lumpur">Kuala Lumpur</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Athens">Athens</option>
      </select>
    </>
  );
};

export default WeatherComponent;
