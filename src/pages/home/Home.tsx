import React, { useState, useEffect, useCallback } from "react";
import "./home.scss";
import SearchBar from "../../components/search-bar/SearchBar";
import WeatherHeader from "../../components/weather-header/WeatherHeader";
import WeatherItem from "../../components/weather-item/WeatherItem";
import ThemeToggle from "../../components/theme-toggle/ThemeToggle";
import { WeatherData, SearchHistoryItem } from "../../models/Weather";
import { fetchWeatherByCity } from "../../services/weatherService";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchBarRef = React.useRef<{ clearSearch: () => void } | null>(null);

  const handleSearch = useCallback(async (city: string) => {
    console.log("Searching for city:", city);
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCity(city);
      setCurrentWeather(data);

      // Add to search history
      const timestamp = Date.now();
      const historyItem: SearchHistoryItem = {
        id: `${data.id}-${timestamp}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        city: data.name,
        country: data.sys.country,
        timestamp,
        data,
      };

      // Add to beginning of history and limit to 10 items
      setSearchHistory((prev) => [historyItem, ...prev].slice(0, 10));
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherSearchHistory");
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error("Error loading search history:", err);
      }
    }

    // Load default city on mount
    handleSearch("La Valletta");
  }, [handleSearch]);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem(
        "weatherSearchHistory",
        JSON.stringify(searchHistory)
      );
    }
  }, [searchHistory]);

  const handleHistorySearch = (item: SearchHistoryItem) => {
    searchBarRef.current?.clearSearch();
    handleSearch(item.city);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="home">
      <ThemeToggle />
      <div className="home__container">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Country"
          onRef={(ref) => (searchBarRef.current = ref)}
        />

        <div className="home__forecast">
          {error && <div className="home__error">{error}</div>}

          {isLoading && <div className="home__loading">Loading...</div>}

          {currentWeather && !isLoading && (
            <WeatherHeader
              temperature={currentWeather.main.temp}
              tempMin={currentWeather.main.temp_min}
              tempMax={currentWeather.main.temp_max}
              city={currentWeather.name}
              country={currentWeather.sys.country}
              timestamp={currentWeather.dt}
              humidity={currentWeather.main.humidity}
              weatherMain={currentWeather.weather[0].main}
              weatherIcon={currentWeather.weather[0].icon}
            />
          )}

          {searchHistory.length > 0 && (
            <div className="home__history">
              <p className="home__history-title">Search History</p>
              <div className="home__history-list">
                {searchHistory.map((item) => (
                  <WeatherItem
                    key={item.id}
                    city={item.city}
                    country={item.country}
                    timestamp={item.timestamp}
                    onSearch={() => handleHistorySearch(item)}
                    onDelete={() => handleDeleteHistoryItem(item.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
