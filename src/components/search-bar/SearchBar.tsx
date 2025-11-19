import React, { useState, useEffect, useRef } from "react";
import {
  fetchCitySuggestions,
  CityOption,
} from "../../services/weatherService";
import "./search-bar.scss";

interface SearchBarProps {
  onSearch: (city: string) => void;
  placeholder?: string;
  onRef?: (ref: { clearSearch: () => void }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Country",
  onRef,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<CityOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onRef) {
      onRef({
        clearSearch: () => {
          setShouldFetch(false);
          setSearchValue("");
          setSuggestions([]);
          setShowSuggestions(false);
        },
      });
    }
  }, [onRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!shouldFetch) {
        return;
      }

      if (searchValue.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      const results = await fetchCitySuggestions(searchValue.trim());
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setIsLoading(false);
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue, shouldFetch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch(searchValue.trim());
    }
  };

  const handleSuggestionClick = (city: CityOption) => {
    const cityName = city.state
      ? `${city.name}, ${city.state}, ${city.country}`
      : `${city.name}, ${city.country}`;
    setShouldFetch(false);
    setSearchValue(cityName);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(city.name);
  };

  return (
    <div className="search-bar-wrapper" ref={searchRef}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => {
            setShouldFetch(true);
            setSearchValue(e.target.value);
          }}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        />
        <button
          type="submit"
          className="search-bar__button"
          aria-label="Search"
        >
          <svg
            className="search-bar__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-bar__suggestions">
          {isLoading ? (
            <div className="search-bar__suggestion search-bar__suggestion--loading">
              Loading...
            </div>
          ) : (
            suggestions.map((city, index) => (
              <div
                key={`${city.name}-${city.country}-${index}`}
                className="search-bar__suggestion"
                onClick={() => handleSuggestionClick(city)}
              >
                <span className="search-bar__suggestion-name">{city.name}</span>
                <span className="search-bar__suggestion-details">
                  {city.state ? `${city.state}, ` : ""}
                  {city.country}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
