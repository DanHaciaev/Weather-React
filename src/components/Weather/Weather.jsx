import React, { useState, useEffect } from 'react';
import './Weather.css';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const api_key = "07038624527c492da44124607230611";
  const aqi = "no";

  useEffect(() => {
    const initialWeatherData = {
      current: {
        temp_c: "Loading...",
        humidity: "Loading...",
        wind_kph: "Loading...",
        condition: {
          code: 1000, // Код погоды по умолчанию (солнечно)
          icon: '', // Добавляем поле "icon" для хранения пути к изображению
        },
      },
      location: {
        name: "Loading...",
      },
    };
    setWeatherData(initialWeatherData);
  }, []);

  const search = async () => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cityName}&aqi=${aqi}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Определите, является ли текущее время днем или ночью
      const isDaytime = data.current.is_day === 1;
      const timeSuffix = isDaytime ? "day" : "night";

      // Создайте объект, который сопоставляет коды погоды с именами файлов изображений
      const weatherImageMappings = {
        1000: "113.png",
        1003: "116.png",
        1006: "119.png",
        1009: "122.png",
        1030: "143.png",
        1063: "176.png",
        1066: "179.png",
        1069: "182.png",
        1072: "185.png",
        1087: "200.png",
        1114: "227.png",
        1117: "230.png",
        1135: "248.png",
        1147: "260.png",
        1150: "263.png",
        1153: "266.png",
        1168: "281.png",
        1171: "284.png",
        1180: "293.png",
        1183: "296.png",
        1186: "299.png",
        1189: "302.png",
        1192: "305.png",
        1195: "308.png",
        1198: "311.png",
        1201: "314.png",
        1204: "317.png",
        1207: "320.png",
        1210: "323.png",
        1213: "326.png",
        1216: "329.png",
        1219: "332.png",
        1222: "335.png",
        1225: "338.png",
        1237: "350.png",
        1240: "353.png",
        1243: "356.png",
        1246: "359.png",
        1249: "362.png",
        1252: "365.png",
        1255: "368.png",
        1258: "371.png",
        1261: "374.png",
        1264: "377.png",
        1273: "386.png",
        1276: "389.png",
        1279: "392.png",
        1282: "395.png",
      };

      // Получите имя файла изображения на основе кода погоды
      const weatherImageCode = data.current.condition.code;
      const weatherImageFileName = weatherImageMappings[weatherImageCode] || "unknown.png";
      data.current.condition.icon = `/img/${timeSuffix}/${weatherImageFileName}`;

      setWeatherData(data);
    } catch (error) {
      console.error("Произошла ошибка при запросе к API:", error);
    }
  }

  return (
    <div className='container'>
      <div className='top_bar'>
        <div className='inputText'>
          <input
            type="text"
            className='cityInput'
            placeholder='Search...'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <div className='searchIcon' onClick={search}>
            <img src="img/search.png" alt="Something went wrong..." />
          </div>
        </div>
        {weatherData && (
          <>
            <div className='weatherImage'>
              <img
                src={weatherData.current.condition.icon}
                alt="Something went wrong..."
              />
            </div>
            <div className='weatherTemp'>{weatherData.current.temp_c}°C</div>
            <div className='location'>{weatherData.location.name}</div>
            <div className='data_container'>
              <div className='element'>
                <img src="img/humidity.png" alt="" className='icon' />
                <div className='data'>
                  <div className='humidity'>{weatherData.current.humidity}%</div>
                  <div className='text'>Humidity</div>
                </div>
              </div>
              <div className='element'>
                <img src="img/wind.png" alt="" className='icon' />
                <div className='data'>
                  <div className='wind'>{weatherData.current.wind_kph} km/h</div>
                  <div className='text'>Wind Speed</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
