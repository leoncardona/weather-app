import React, { useEffect, useState } from 'react';
import { epochToDay, getCurrentWeather } from '../functions';
import Chart from './Chart';

function TodayCast({ place, updateTime }) {
    const [tempByHour, setTempByHour] = useState();
    const [day, setDay] = useState();
    const [weather, setWeather] = useState();
    const [weatherIcon, setWeatherIcon] = useState();
    const [temp, setTemp] = useState();
    const [tempUnit, setTempUnit] = useState();
    const [humidity, setHumidity] = useState();
    const [feelsLike, setFeelsLike] = useState();
    const [wind, setWind] = useState();
    const [pressure, setPressure] = useState();

    useEffect(() => {
        getCurrentWeather(place).then(data => {
            setDay(epochToDay(data.current.last_updated_epoch));
            setWeather(data.current.condition.text);
            setWeatherIcon(data.current.condition.icon);
            setTempUnit("C");
            setTemp(tempUnit === "C" ? data.current.temp_c : data.current.temp_f);
            setHumidity(data.current.humidity);
            setFeelsLike(tempUnit === "C" ? data.current.feelslike_c : data.current.feelslike_f);
            setWind(data.current.wind_kph);
            setPressure(data.current.pressure_mb);
            updateTime(data.location.localtime);
            setTempByHour(data.forecast.forecastday[0].hour.map(hour => (
                { time: hour.time.slice(11), temp_c: hour.temp_c, temp_f: hour.temp_f }
            )));
        }, []);
    });

    return (
        <div className="card">
            <div className="top">
                <div>
                    <h1>{day}</h1>
                    <h2>{weather}</h2>
                </div>
                <img src={weatherIcon} alt="Weather icon" />
            </div>
            <div className="mid">
                <div>
                    <h1>{temp}º{tempUnit}</h1>
                    <h2>Humidity: {humidity}%</h2>
                    <h2>Feels like: {feelsLike}º{tempUnit}</h2>
                </div>
                <div>
                    <h2>Wind: {wind}km/h</h2>
                    <h2>Pressure: {pressure}mb</h2>
                </div>
            </div>
            <div className="bottom">
                <Chart data={tempByHour} />
            </div>
        </div>
    );
}

export default TodayCast;