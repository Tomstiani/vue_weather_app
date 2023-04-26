export interface WeatherHour {
  time: string;
  weathercode: number;
  temperature: number;
  precipitation: number;
  cloudcover: number;
  winddirection: number;
  windgusts: number;
  windspeed: number;
}

export interface WeatherDay {
  date: string;
  sunrise: string;
  sunset: string;
  weathercode: number;
  temperature: {
    max: number;
    min: number;
  };
  precipitation: number;
  hourly: WeatherHour[];
}

export interface WeatherData {
  days: WeatherDay[];
  elevation: number;
  timezone: string;
  units: {
    cloudcover: string;
    precipitation: string;
    temperature: string;
    time: string;
    weathercode: string;
    winddirection: string;
    windgusts: string;
    windspeed: string;
  };
}