import React, { useEffect, useState } from "react";
import OneDayWeather from "./OneDayWeather";

function Weather(props){
    const [separated, setSeparated] = useState({separatedIdx: '', found: false});

    // az utolsó elem keresése a listában(props.data.list), ami még a mai napra vonatkozik
    useEffect(() => {
        // console.log(props.data);
        let today = new Date().getUTCDate();        
        today = today < 10 ? "0" + today : today;                
                
        let i = 0;
        while(true){
            if(props.data.list[i].dt_txt.substring(8, 10) !== today.toString()){
                setSeparated({separatedIdx: i, found: true});
                break;
            }
            i++;
        }
    }, []);

    // napokra bontás -> OneDayWeather.jsx
    function separateDays(){
        let day = new Date().getUTCDay();
        const separatedDays = [];        
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // console.log(days[day]);
        
        // mai nap az előbb megkeresett index alapján
        separatedDays.push(<OneDayWeather
            list={props.data.list.slice(0, separated.separatedIdx)}
            key={0}
            today={1}
            dayName={days[day]}
        />);

        // maradék 4 nap létrehozása
        // list: 1 nap 3 óránkénti bontásban -> 8
        // dayName: a day==7 : vasárnap (days[0])
        for(let i = 0; i < 4; i++){         
            separatedDays.push(<OneDayWeather
                list={props.data.list.slice(separated.separatedIdx + (8*i),
                    8 + (separated.separatedIdx + (8*i)))}
                key={i+1}
                today={0}
                dayName={7 === (day+i+1) ? days[0] : days[day+i+1]}
            />);

            if((day+i+1) === 7)
                day = -i-1;
        }

        return separatedDays;
    }
    
    return separated.found ? (        
        <div className="weather">
            <h2 id="cityName">{props.data.city.name}</h2>
            <div className="weather-container">
                {separateDays()}                    
            </div>
        </div>
    ) : (
        <div>
            <div>Loading...</div>
        </div>
    );
}

export default Weather;
