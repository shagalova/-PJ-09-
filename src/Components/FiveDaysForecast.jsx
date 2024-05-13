import React from "react";
import '../App.css';

function FiveDaysForecast(props) {
let days  = props.searchData.list

if (days) {
    let dailyData = days.filter((item)=> item.dt_txt.includes("12:00:00"))

    const dayCard = 
        dailyData.map((item,index) => {
            const timestamp = item.dt * 1000;
            const currentDate = new Date(timestamp)

            const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            const dayOfWeek = daysOfWeek[currentDate.getDay()]
            const month = months[currentDate.getMonth()]
            const dayOfMonth = currentDate.getDate()

            const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

        return (
            <li key={index.toString()}> 
                <div className="output-week-day">
                    <div className="weather-date">{formattedDate}</div>
                    <div className="weather-type">{item.weather ? item.weather[0].main : null}</div>
                    <div className="mini-icon">
                        <img src={item.weather ? props.weatherImages[item.weather[0].main] : null} alt="" />
                    </div>
                    <div className="temp">{item.main ? `${Math.round(item.main.temp)}°C` : null}</div>         
                    <div className="humidity">{item.main ? item.main.humidity : null}%</div>          
                    <div className="wind">{item.wind ? `${Math.round(item.wind.speed)}` : null}km/h</div>
                </div>
            </li>
        )
    })


    return (
        <>
            <div className="city">{props.searchData.city ? props.searchData.city.name : null}</div>
            <div className="output-week">
                <ul>{dayCard}</ul>
            </div>
        </>          
    )
} else {
return (
    <div className="not-found">Choose Location</div>
) 
}
}


export default FiveDaysForecast;