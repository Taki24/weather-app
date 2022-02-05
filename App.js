import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";

function App() {  
  const [location, setLocation] = useState({status: '', lat: '', lng: ''});
  const [data, setData] = useState({loading: true, weatherData: {}});

  // get location
  useEffect(() => {
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({status: "ok", lat: position.coords.latitude, lng: position.coords.longitude});
        },
        error => {
          console.log("Error Code: " + error.code + " - " + error.message);
          setLocation({status: error.code});
        }
      );      
    }
    else 
      console.log('Location is not available');    
  }, []);
  
  // get weather data
  useEffect(() => {
    let url = "";
    if(location.status !== ''){
      if(location.status === "ok")
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&units=metric&appid=dc27a93434715093ef48247d2907c171`;
      else 
        url = "https://api.openweathermap.org/data/2.5/forecast?id=3043778&units=metric&appid=dc27a93434715093ef48247d2907c171";    

      fetch(url)
        .then(response => response.json())
        .then(data => setData({loading: false, weatherData: data}));            
    }
  }, [location.status]);

  return data.loading ? 
    (
        <div>Loading...</div>
    ) : 
    (                              
      <Weather data={data.weatherData} />      
    );
}

export default App;
