import "../WeatherCard/WeatherCard.css";
import sunandcloud from "../../assets/sunandcloud.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
      <img
        src={sunandcloud}
        alt="sun and cloud"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
