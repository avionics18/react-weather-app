import React, { useState } from "react";
import { TiThermometer } from "react-icons/ti";
import { BiSubdirectoryLeft } from "react-icons/bi";
import "./bootstrap.css";
import "./style.css";

const api = {
  key: "46805faf8a3abcc63137708cc91ed38e",
  base: "https://api.openweathermap.org/data/2.5/"
};

export default function App() {
  // Query String formation from input and Weather Object as result
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // On hitting Enter fetch the data
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        })
        .catch((err) => console.log(err));
    }
  };

  const dateBuilder = (d) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} | ${date} ${month} ${year}`;
  };

  if (typeof weather.main === "undefined") {
    return (
      <div id="main-wrapper" className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-10 offset-sm-3 offset-1">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="searchbar"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={search}
                />
              </div>
              <div className="content text-center">
                <span className="entry-text">
                  Search for any place &amp; Hit Enter
                  <BiSubdirectoryLeft />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="main-wrapper"
      className={`pt-5 ${weather.main.temp > 16 ? "bg-warm" : "bg-cold"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-10 offset-sm-3 offset-1">
            <div
              className={`input-wrapper ${
                weather.main.temp > 16
                  ? "input-wrapper-warm"
                  : "input-wrapper-cold"
              }`}
            >
              <input
                type="text"
                className="searchbar"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
              />
            </div>
            <div className="content text-center">
              <h3 className="place text-white font-weight-bold">
                {weather.name}, {weather.sys.country}
              </h3>
              <p className="text-light">{dateBuilder(new Date())}</p>
              <div className="temperature-box my-4">
                <h1 className="text-white font-weight-bolder">
                  {Math.round(weather.main.temp)}°C
                  <TiThermometer />
                </h1>
              </div>
              <h6 className="temperature-desc text-secondary text-capitalize">
                <span>
                  {weather.weather[0].description}{" "}
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].icon}
                  />
                </span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
