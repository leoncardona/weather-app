import places from './places.json';

const getRandomPlace = () => {
    const randomIndex = Math.floor(Math.random() * places.length);
    return places[randomIndex];
}

const epochToDay = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString('en-US', { weekday: 'long' });
}

const getCurrentWeather = (place) => {
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${place.lat},${place.lng}&days=3`;
    return fetch(API_URL)
        .then(response => response.json());
};

export { getRandomPlace, epochToDay, getCurrentWeather };