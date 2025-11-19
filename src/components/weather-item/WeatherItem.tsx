import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./weather-item.scss";

interface WeatherItemProps {
  city: string;
  country: string;
  timestamp: number;
  onSearch: () => void;
  onDelete: () => void;
}

const WeatherItem: React.FC<WeatherItemProps> = ({
  city,
  country,
  timestamp,
  onSearch,
  onDelete,
}) => {
  const formatDate = (ts: number): string => {
    const date = new Date(ts);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}-${day}-${year} ${hours}:${minutes}am`;
  };

  return (
    <div className="weather-item">
      <div className="weather-item__left">
        <span className="weather-item__city">
          {city}, {country}
        </span>
        <span className="weather-item__date">{formatDate(timestamp)}</span>
      </div>
      <div className="weather-item__right">
        <button
          className="weather-item__button weather-item__button--search"
          onClick={onSearch}
          aria-label="Search again"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <button
          className="weather-item__button weather-item__button--delete"
          onClick={onDelete}
          aria-label="Delete"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default WeatherItem;
