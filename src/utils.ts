import { WeatherData, WeatherDay, WeatherHour } from "./types"

export const getWeatherIcon = (weatherCode: number) => {
  switch (weatherCode) {
    case 0:
      return {
        icon: 'bi-sun-fill',
        text: 'Clear sky'
      }
    case 1 || 2:
      return {
        icon: 'bi-cloud-sun-fill',
        text: 'Few clouds'
      }
    case 3:
      return {
        icon: 'bi-cloud-fill',
        text: 'Overcast clouds'
      }
    case 45 || 48:
      return {
        icon: 'bi-cloud-fog-fill',
        text: 'Fog'
      }
    case 51 || 53 || 55:
      return {
        icon: 'bi-cloud-drizzle-fill',
        text: 'Drizzle'
      }
    case 61 || 63 || 65 || 66 || 67 || 80 || 81 || 82:
      return {
        icon: 'bi-cloud-rain-heavy-fill',
        text: 'Rain'
      }
    case 71 || 73 || 75 || 77 || 85 || 86:
      return {
        icon: 'bi-cloud-snow-fill',
        text: 'Snow'
      }
    case 95 || 96 || 99:
      return {
        icon: 'bi-cloud-lightning-rain-fill',
        text: 'Hail'
      }
  }
}

export const parseWeatherData = (data: any) => {
  const parsedData: WeatherData = {
    days: [],
    elevation: data.elevation,
    timezone: data.timezone,
    units: {
      cloudcover: data.hourly_units.cloudcover,
      precipitation: data.hourly_units.precipitation,
      temperature: data.hourly_units.temperature_2m,
      time: data.hourly_units.time,
      weathercode: data.hourly_units.weathercode,
      winddirection: data.hourly_units.winddirection_10m,
      windgusts: data.hourly_units.windgusts_10m,
      windspeed: data.hourly_units.windspeed_10m,
    },
  };

  for (let i = 0; i < data.daily.time.length; i++) {
    const day: WeatherDay = {
      date: new Date(data.daily.time[i]).toLocaleDateString(),
      sunrise: new Date(data.daily.sunrise[i]).toLocaleTimeString(),
      sunset: new Date(data.daily.sunset[i]).toLocaleTimeString(),
      weathercode: data.daily.weathercode[i],
      temperature: {
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
      },
      precipitation: data.daily.rain_sum[i],
      hourly: [],
    };

    for (let j = 0, k = 0; j < data.hourly.time.length; j++) {
      if (
        new Date(data.hourly.time[j]).toLocaleDateString() === day.date
      ) {
        const hour: WeatherHour = {
          time: new Date(data.hourly.time[j]).toLocaleTimeString(),
          weathercode: data.hourly.weathercode[j],
          temperature: data.hourly.temperature_2m[j],
          precipitation: data.hourly.precipitation[j],
          cloudcover: data.hourly.cloudcover[j],
          winddirection: data.hourly.winddirection_10m[j],
          windgusts: data.hourly.windgusts_10m[j],
          windspeed: data.hourly.windspeed_10m[j],
        };

        day.hourly.push(hour);
      }
    }

    parsedData.days.push(day);
  }

  return parsedData;
}