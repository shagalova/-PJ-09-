import React from "react";
import '../App.css';

function OneDayForecast(props) {
    let dataWeather = props.searchData

    const currentDate = new Date()

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
    const dayOfWeek = daysOfWeek[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    const dayOfMonth = currentDate.getDate()
  
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`
    
    return (
        <>
        {dataWeather.main ? (
            <>
                <div className="city">{dataWeather.name}</div>
                <div className="output-today">
                    <div className="main-icon">
                        <img src={dataWeather.weather ? props.weatherImages[dataWeather.weather[0].main] : null} alt="" />
                    </div>
                    <div className="weather-type">{dataWeather.weather ? dataWeather.weather[0].main : null}</div>
                    <div className="temp">{dataWeather.main ? `${Math.round(dataWeather.main.temp)}°C` : null}</div>
                    <div className="realfeel">{dataWeather.main ? `${Math.round(dataWeather.main.feels_like)}°C - Realfeel` : null}</div>
                    <div className="weather-date">{formattedDate}</div>                   
                    <div className="weather-info">
                        <div className="humidity">
                            <p>Humidity</p>
                            <img src="./img/drop.png" alt="" />
                            {dataWeather.main ? dataWeather.main.humidity : null}%
                        </div>
                        <div className="wind">
                            <p>Wind</p>
                            <img src="./img/wind.png" alt="" />
                            {dataWeather.wind ? `${Math.round(dataWeather.wind.speed)}` : null}km/h    
                        </div>
                    </div>                    
                </div>
            </>)
            : (<div className="not-found">Choose Location</div>)  
        }
        
        </>
    )
}

export default OneDayForecast;