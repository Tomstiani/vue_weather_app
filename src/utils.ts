import { WeatherData, WeatherDay, WeatherHour } from "./types"

export const getWeatherIcon = (weatherCode: number) => {
  switch (weatherCode) {
    case 0:
      return {
        icon: 'bi-sun-fill',
        text: 'Clear sky'
      }
    case 1: 
    case 2:
      return {
        icon: 'bi-cloud-sun-fill',
        text: 'Few clouds'
      }
    case 3:
      return {
        icon: 'bi-cloud-fill',
        text: 'Overcast clouds'
      }
    case 45:
    case 48:
      return {
        icon: 'bi-cloud-fog-fill',
        text: 'Fog'
      }
    case 51:
    case 53:
    case 55:
      return {
        icon: 'bi-cloud-drizzle-fill',
        text: 'Drizzle'
      }
    case 61: 
    case 63:
    case 65:
    case 66:
    case 67: 
    case 80:
    case 81:
    case 82:
      return {
        icon: 'bi-cloud-rain-heavy-fill',
        text: 'Rain'
      }
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return {
        icon: 'bi-cloud-snow-fill',
        text: 'Snow'
      }
    case 95:
    case 96:
    case 99:
      return {
        icon: 'bi-cloud-lightning-rain-fill',
        text: 'Hail'
      }
  }
}

const isInRange = (value: number, min: number, max: number) => {
  return value >= min && value <= max;
}

export const getWindDirectionIcon = (windDirection: number) => {
  switch (true) {
    case isInRange(windDirection, 0, 22.5) || isInRange(windDirection, 337.5, 360):
      return 'bi-arrow-up'
    case isInRange(windDirection, 22.5, 67.5):
      return 'bi-arrow-up-right'
    case isInRange(windDirection, 67.5, 112.5):
      return 'bi-arrow-right'
    case isInRange(windDirection, 112.5, 157.5):
      return 'bi-arrow-down-right'
    case isInRange(windDirection, 157.5, 202.5):
      return 'bi-arrow-down'
    case isInRange(windDirection, 202.5, 247.5):
      return 'bi-arrow-down-left'
    case isInRange(windDirection, 247.5, 292.5):
      return 'bi-arrow-left'
    case isInRange(windDirection, 292.5, 337.5):
      return 'bi-arrow-up-left'
    default:
      return 'bi-arrow-up'
  }
}

export const from12to24 = (time: string) => {
  const [hour, minute, sec, ampm] = time.split(/:| /);
  let res = '';
  if (ampm === 'PM') {
    if(parseInt(hour) === 12) {
      res = `${hour}:${minute}:${sec}`;
      return res;
    }
    res = `${parseInt(hour) + 12}:${minute}:${sec}`;
  } else {
    if(parseInt(hour) === 12) {
      res = `00:${minute}:${sec}`;
      return res;
    }
    res = `0${hour}:${minute}:${sec}`;
  }
  return res;
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
      sunrise: from12to24(new Date(data.daily.sunrise[i]).toLocaleTimeString()),
      sunset: from12to24(new Date(data.daily.sunset[i]).toLocaleTimeString()),
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
          time: from12to24(new Date(data.hourly.time[j]).toLocaleTimeString()),
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