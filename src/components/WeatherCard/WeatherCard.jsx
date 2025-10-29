import "../WeatherCard/WeatherCard.css";
import sunandcloud from "../../assets/sunandcloud.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp"> 75 &deg; F</p>
      <img
        src={sunandcloud}
        alt="sun and cloud"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
