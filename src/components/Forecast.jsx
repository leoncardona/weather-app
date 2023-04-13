import React, { useState, useEffect } from 'react';
import { epochToDay, getCurrentWeather } from '../functions';

function Forecast({ place }) {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        getCurrentWeather(place).then(data => {
            setForecast(data.forecast.forecastday.slice(1));
        });
    }, [place]);

    return (
        <div className="forecast-items">
            {forecast.map(day => (
                <div key={day.date} className="card">
                    <div className="top">
                        <div>
                            <h1>{epochToDay(day.date_epoch)}</h1>
                            <h2>{day.day.condition.text}</h2>
                        </div>
                        <img src={day.day.condition.icon} alt="Weather icon" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Forecast;