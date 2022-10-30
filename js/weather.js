const API_KEY = window.API_KEY;
console.log(API_KEY);

function onGeoOk(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(response => response.json()
    .then(data => {
        const weatherContainer = document.querySelector("#weather span:first-child");
        const cityContainer = document.querySelector("#weather span:last-child");
        const name = data.name;
        const weather = data.weather[0].main;

        cityContainer.innerText = name;
        weatherContainer.innerText = weather;
        
    console.log(data.name, data.weather[0].main);
    }));

}
function onGeoError(){

}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);