import './App.css';
import appIcon from './icons/weather.png';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import TodayCast from './components/TodayCast';
import Forecast from './components/Forecast';
import Map from './components/Map';
import { getRandomPlace } from './functions';

function App() {
  const today = new Date();
  const weekDay = today.toLocaleDateString('en-US', { weekday: "long" }).replace(/^\w/, c => c.toUpperCase());
  const day = today.getDate();
  const month = today.toLocaleString("en-US", { month: "long" }).replace(/^\w/, c => c.toUpperCase());
  const year = today.getFullYear();

  const [place, setPlace] = useState(getRandomPlace());
  const [time, setTime] = useState("");

  const updatePlace = (newPlace) => {
    setPlace(newPlace);
  }

  const updateTime = (newTime) => {
    setTime(newTime.slice(11));
  }

  return (
    <div>
      <header>
        <h1>Weather Application</h1>
        <img src={appIcon} alt="Weather icon" />
      </header>
      <div id="container">
        <section className="info">
          <div>
            <h1>{time}</h1>
            <h2>{weekDay}, {day} {month} {year}</h2>
          </div>
          <div className="search">
            <SearchBar updatePlace={updatePlace} />
            <h2>{place.city}, {place.country} 📌</h2>
          </div>
        </section>
        <section className="today">
          <h1>Today</h1>
          <div className="today-items">
            <TodayCast place={place} updateTime={updateTime} />
            <Map place={place} />
          </div>
        </section>
        <section className="forecast">
          <h1>Forecast</h1>
          <Forecast place={place} />
        </section>
      </div>
      <footer>
        <span>GitHub</span>
        <span>Made by <a href="https://github.com/leoncardona">@leoncardona</a></span>
        <span>Thank you ❤️</span>
      </footer>
    </div>
  );
}

export default App;