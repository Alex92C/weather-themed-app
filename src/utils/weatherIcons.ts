// Weather icon mapping utility
import clearSky from "../assets/clear-sky.png";
import fewClouds from "../assets/few-clouds.png";
import scatteredClouds from "../assets/scattered-clouds.png";
import brokenClouds from "../assets/broken-clouds.png";
import showerRain from "../assets/shower-rain.png";
import rain from "../assets/rain.png";
import thunderstorm from "../assets/thunderstorm.png";
import snow from "../assets/snow.png";
import mist from "../assets/mist.png";
import sun from "../assets/sun.png";
import cloud from "../assets/cloud.png";

export const getWeatherIcon = (weatherCode: string): string => {
  const iconMap: { [key: string]: string } = {
    "01d": sun,
    "01n": clearSky,
    "02d": fewClouds,
    "02n": fewClouds,
    "03d": scatteredClouds,
    "03n": scatteredClouds,
    "04d": brokenClouds,
    "04n": brokenClouds,
    "09d": showerRain,
    "09n": showerRain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  return iconMap[weatherCode] || cloud;
};
