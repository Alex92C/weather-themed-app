import { WeatherData } from "../models/Weather";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_BASE = import.meta.env.VITE_WEATHER_BASE_ENDPOINT;
const GEOCODING_BASE = import.meta.env.VITE_GEOCODING_BASE_ENDPOINT;

export interface CityOption {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

// ==================== AXIOS VERSION (ACTIVE) ====================

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${WEATHER_BASE}&appid=${API_KEY}&q=${city}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const fetchCitySuggestions = async (
  query: string
): Promise<CityOption[]> => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const response = await axios.get(
      `${GEOCODING_BASE}&appid=${API_KEY}&q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};

// ==================== FETCH VERSION (FOR REFERENCE) ====================

// export const fetchWeatherByCity = async (
//   city: string
// ): Promise<WeatherData> => {
//   try {
//     const response = await fetch(`${WEATHER_BASE}&appid=${API_KEY}&q=${city}`);

//     if (!response.ok) {
//       throw new Error("City not found");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching weather:", error);
//     throw error;
//   }
// };

// export const fetchCitySuggestions = async (
//   query: string
// ): Promise<CityOption[]> => {
//   if (!query || query.trim().length < 2) {
//     return [];
//   }

//   try {
//     const response = await fetch(
//       `${GEOCODING_BASE}&appid=${API_KEY}&q=${encodeURIComponent(query)}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch city suggestions");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching city suggestions:", error);
//     return [];
//   }
// };

// ==================== SHARED UTILITY FUNCTIONS ====================

export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}-${day}-${year} ${hours}:${minutes}am`;
};
