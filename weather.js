let inputCity = document.getElementById('enter-city');

inputCity.addEventListener( 'keyup', function(event) {
    if(event.key === "Enter"){
        getResults(event.target.value);
    }
});

const api = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "629e1c9acc572c9ef5a349ae35dba923"
}

function getResults(cityName){
    fetch(`${api.url}${cityName}&appid=${api.key}&units=metric`)
    .then( result => result.json())
    .then( res => display(res));

}

function display(result){

    let cityName = document.querySelector('#city-name');
    let currentDate = document.querySelector('#date');
    let temperature = document.querySelector('#temperature');
    let weather = document.querySelector('#weather');
    let max_min = document.querySelector('#high-low');

    let high = Math.ceil(result.main.temp_max);
    let low = Math.floor(result.main.temp_min);

    cityName.innerText = result.name+', '+result.sys.country;
    currentDate.innerText = formatDate();
    temperature.innerText = result.main.temp+'°C';
    weather.innerText = result.weather[0].main;
    max_min.innerText = `${high}°c/${low}°c`;
    
}

function formatDate(){

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let currentDate = new Date();
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();
    let date = currentDate.getDate();

    return `${day} ${date} ${month} ${year}`
}

window.onload(getResults('Delhi'));