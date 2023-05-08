const apikey = "50782bcc42a96c0bb2ea302571c103fd";

const WeatherDataEl = document.getElementById("weather-data");

const CityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event)=> {
    event.preventDefault();
    const cityValue = CityInputEl.value;
    // console.log(cityValue);
    getweatherdata(cityValue);
});

async function getweatherdata(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Error fetching weather data");
        }
        const data = await response.json()
        console.log(data);
        const temperature=Math.round(data.main.temp)
        const description =data.weather[0].description
        const icon = data.weather[0].icon
        const details =[
            `Feels like: ${Math.round(data.main.feels_like)}℃`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${Math.round(data.wind.speed)} M/S`,
        ]


        WeatherDataEl.querySelector(".icon")
        .innerHTML =`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-Icon">`

        WeatherDataEl.querySelector(
            ".temperature").textContent = `${temperature}℃`

        WeatherDataEl.querySelector(".description").textContent=`${description}`

        WeatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");

    } catch(error){
        WeatherDataEl.querySelector(".icon")
        .innerHTML =``;

        WeatherDataEl.querySelector(
            ".temperature").textContent = ``;

        WeatherDataEl.querySelector(".description").textContent=`An Error Happened, Please try again later`;

        WeatherDataEl.querySelector(".details").innerHTML = ``;

    }
}
