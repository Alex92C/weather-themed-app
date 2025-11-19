export interface WeatherData {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  dt: number;
}

export interface SearchHistoryItem {
  id: string;
  city: string;
  country: string;
  timestamp: number;
  data: WeatherData;
}
