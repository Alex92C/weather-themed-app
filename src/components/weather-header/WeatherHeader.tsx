import React from "react";
import "./weather-header.scss";
import { getWeatherIcon } from "../../utils/weatherIcons";
import { formatDateTime } from "../../services/weatherService";

interface WeatherHeaderProps {
  temperature: number;
  tempMin: number;
  tempMax: number;
  city: string;
  country: string;
  timestamp: number;
  humidity: number;
  weatherMain: string;
  weatherIcon: string;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  temperature,
  tempMin,
  tempMax,
  city,
  country,
  timestamp,
  humidity,
  weatherMain,
  weatherIcon,
}) => {
  return (
    <div className="weather-header">
      <div className="weather-header__content">
        <div className="weather-header__left">
          <p className="weather-header__label">Today's Weather</p>
          <h1 className="weather-header__temperature">
            {Math.round(temperature)}°
          </h1>
          <span className="weather-header__range">
            H: {Math.round(tempMax)}° L: {Math.round(tempMin)}°
          </span>
          <div className="weather-header__sub-header">
            <span className="weather-header__location">
              {city}, {country}
            </span>
            <div className="weather-header__details">
              <span className="weather-header__condition">{weatherMain}</span>
              <span className="weather-header__humidity">
                Humidity: {humidity}%
              </span>
              <span className="weather-header__datetime">
                {formatDateTime(timestamp)}
              </span>
            </div>
          </div>
        </div>
        <div className="weather-header__right">
          <img
            src={getWeatherIcon(weatherIcon)}
            alt={weatherMain}
            className="weather-header__icon"
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherHeader;
