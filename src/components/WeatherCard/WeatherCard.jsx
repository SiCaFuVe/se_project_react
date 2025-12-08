import "../WeatherCard/WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((options) => {
    return (
      options.day === weatherData.isDay &&
      options.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionCondition = filteredOptions[0]?.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOptionUrl}
        alt={`${weatherOptionCondition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
