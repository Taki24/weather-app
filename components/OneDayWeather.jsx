import React from "react"

function OneDayWeather(props){

    // bool: true -> napi minimum, false -> napi maximum hőmérsékletet számol
    function calcMinMaxTemp(bool){
        let min = 60;
        let max = -20;

        for(let li of props.list){
            if(min > li.main.temp)
                min = li.main.temp;
            if(max < li.main.temp)
                max = li.main.temp;
        }
        return bool ? Math.round(min) : Math.round(max);
    }

    // egy nap a legtöbet előforduló ikon kiválasztása
    function getIcon(){
        let counter = 0;
        let icon;

        for(let li of props.list){
            let sum = 0;
            for(let i = 1; i < props.list.length; i++){
                if(li.weather[0].icon === props.list[i].weather[0].icon)
                    sum++;
            }
            if(sum > counter){
                counter = sum;
                icon = li.weather[0].icon;
            }
        }        
        return icon;
    }

    // a mai napon az aktuális hőmérséklettel fog visszatérni
    // a maradék 4 napon az adott nap átlaghőmérsékletével
    function currentAndAvgTemp(){
 
        if(props.today === 1){
            let rain = 0;
            if(typeof props.list[0].rain !== 'undefined')
                rain = props.list[0].rain["3h"];
    
            return (
                <div className="extras">
                    <span id="description">{props.list[0].weather[0].description}</span>
                    <span id="temp">{Math.round(props.list[0].main.temp)} °C</span>
                    <div className="today-data">
                        <span id="tempFeelsLike">Feels like:  {Math.round(props.list[0].main.feels_like)} °C</span>
                        <span id="wind">Wind: {Math.round(props.list[0].wind.speed * 3.6)} Km/h</span>
                        <span id="humidity">Humidity:  {props.list[0].main.humidity}%</span>
                        <span id="rain">Rain:  {rain} Mm</span>
                    </div>
                </div>
            )
        }
        else {
            let avg = 0;
            let sum = 0;

            for(let li of props.list)
                sum += li.main.temp;
            avg = Math.round(sum / props.list.length);
    
            return <span id="temp">{avg} °C</span>            
        }
    }

    const iconSrc = "icons/" + getIcon() + ".png";
    return (
        <div className="day-box" id={props.today ? "today" : null}>
            <div style={{width: "100%", position: "relative"}}>
               <span className="min-max-temp min-temp">{calcMinMaxTemp(true)} °C</span>
               <span className="min-max-temp max-temp">{calcMinMaxTemp(false)} °C</span>
            </div>
            <span id="dayName">{props.dayName}</span>
            <img id="wicon" src={iconSrc} alt=""/>
            {currentAndAvgTemp()}
        </div>
    );
}

export default OneDayWeather;