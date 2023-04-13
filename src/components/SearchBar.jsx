import React, { useState, useEffect, useRef } from 'react';
import places from '../places.json'
import { v4 as uuid } from 'uuid';

function SearchBar({ updatePlace }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        const filteredCities = places.filter(place => `${place.city}, ${place.country}`.toLowerCase().startsWith(searchTerm.toLowerCase())).slice(0, 5);
        setSearchResults(filteredCities);
    }, [searchTerm]);

    const handleClick = (place) => {
        updatePlace(place);
        setsearchTerm("");
        inputRef.current.value = "";
    }

    const handleChange = (e) => {
        setsearchTerm(e.target.value);
        if (e.target.value === "") {
            setSearchResults([]);
        }
    }

    return (
        <div>
            <input ref={inputRef} type="text" onChange={handleChange} placeholder="Search places..." />
            {searchTerm !== "" && (
                <ul>
                    {searchResults.map(place => {
                        return <li onClick={() => handleClick(place)} key={uuid()}>{place.city}, {place.country}</li>
                    })}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;