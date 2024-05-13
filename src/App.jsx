import React, { useState, useEffect } from "react";
import './App.css';
import sunny from "./images/sunny.png";
import cloudy from "./images/cloudy.png";
import fog from "./images/fog.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";
import thunder from "./images/thunder.png";
import OneDayForecast from "./Components/OneDayForecast";
import FiveDaysForecast from "./Components/FiveDaysForecast";


function App() {
  const [data, setData] = useState([{}]);
  const [location, setLocation] = useState("");
  const [geolocation, setGeolocation] = useState({"isKnown": false});
  const [value, setValue] = useState("aDay");
  const [oneDay, setOneDay] = useState(true);

  const api_key = "911713f9a5d7fc231aa1d523b8e27099"
  const params = {
    oneDayParam: "weather",
    fiveDaysParam: "forecast"
  }


  useEffect(() => {
    const fetchDefaultWeather = async () => {
      
      setOneDay(true)
      const defaultLocation = "London"
      const url = `https://api.openweathermap.org/data/2.5/${chooseParam()}?q=${defaultLocation}&units=metric&appid=${api_key}`
      const res = await fetch(url)
      const defaultData = await res.json()
      setData(defaultData)
    }

    fetchDefaultWeather()
  }, [])

  useEffect(() => {
    
      const searchByGeolocation = async () => {
       
          if (geolocation.isKnown == true) {

          const url = `https://api.openweathermap.org/data/2.5/${chooseParam()}?lat=${geolocation.lat}&lon=${geolocation.lon}&units=metric&appid=${api_key}`
          const res = await fetch(url) 
          const searchData = await res.json()

          if (searchData.cod != 200) {
            setData({notFound: true}) 
          } else {
            setData(searchData)
            setGeolocation({"isKnown": false})  
        } 
      }
      
    }
    searchByGeolocation()
  }, [geolocation])

const chooseParam = () => oneDay ? params.oneDayParam : params.fiveDaysParam

  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }
  
  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/${chooseParam()}?q=${location}&units=metric&appid=${api_key}`
      const res = await fetch(url) 
      const searchData = await res.json()
      if (searchData.cod != 200) {
        setData({notFound: true}) 
      } else {
        setData(searchData)        
        setLocation("")
      }
    } 
  }

  const success = (position) => {
    const obj = {
      "lat": position.coords.latitude,
      "lon": position.coords.longitude
    }
    setGeolocation({...obj, "isKnown": true})
   
  }
 
  
  const error = (err) => {
    console.log(err)
  }

  const askForGeolocation = () => {
    
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.")
      
    } else {
      navigator.geolocation.getCurrentPosition(success, error)

    }
    
  }


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search()
    }
  }



  const changeValue = (e) => {
    setValue(e.target.value)
    e.target.value === "aDay" ? setOneDay(true) : setOneDay(false)
    
  }

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rain,
    Snow: snow,
    Mist: fog,
    Haze: fog,
    Thunderstorm: thunder,
    Drizzle: rain,
  }

  const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null

 
  return (
    <div className="container">
      <div className="weather-app">
        <div className="title">Weather forecast for a day or 5 days</div>
        <div className="search-zone">
          <input type="text" placeholder="Enter City name" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
          <img src="./img/search.png" alt="" onClick = {search}/>
          <button className="btn-location" onClick={askForGeolocation}>Show weather by geolocation</button>
        </div>
        <div className="filter">
          <label className={oneDay ? "active" : ""}>
          <input type="radio" name="forecast" value="aDay" 
          checked={value === "aDay" ? true : false}
          onChange={changeValue} />One-day forecast</label>
          <label className={oneDay ? "" : "active"}>
          <input type="radio" name="forecast" value="fiveDays" 
          checked={value === "fiveDays" ? true : false}
          onChange={changeValue} />Five-days forecast</label>
        </div>
        {data.notFound ? (<div className="not-found">Location is not found</div>) : (
          <><div className="output">
          {oneDay 
            ? <OneDayForecast searchData={data} weatherImages={weatherImages}/> 
            : <FiveDaysForecast searchData={data} weatherImages={weatherImages} />
          }
     
        </div>
        </>
        )}
        
      </div>
    </div>
  );
}

export default App;
