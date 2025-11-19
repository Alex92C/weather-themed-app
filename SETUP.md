# Weather App Setup Instructions

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

1. Open the `.env` file in the root directory
2. Replace `your_api_key_here` with your actual OpenWeatherMap API key:

```
VITE_WEATHER_API_KEY=your_actual_api_key_here
```

To get an API key:

- Go to [OpenWeatherMap](https://openweathermap.org/api)
- Sign up for a free account
- Navigate to API keys section
- Copy your API key

### 3. Run the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Features

- 🔍 Search for weather by city name
- 🌡️ Display current temperature, high/low, humidity, and weather conditions
- 📜 Search history with ability to re-search or delete entries
- 📱 Fully responsive design (mobile, tablet, desktop)
- 💾 Persistent search history using localStorage

## Tech Stack

- React + TypeScript
- SCSS with BEM methodology
- Vite
- OpenWeatherMap API
