// Get all necessary elements from the DOM

const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temp');
const dateOutput=document.querySelector('.date');
const timeOutput=document.querySelector('.time');
const conditionOutput=document.querySelector('.condition');
const nameOutput=document.querySelector('.name');
const icon =document.querySelector('.icon');
const cloudOutput=document.querySelector('.cloud');
const humidityOutput=document.querySelector('.humidity');
const windOutput=document.querySelector('.wind');
const form=document.getElementById('locationImput');
const search=document.querySelector('.search');
const btn=document.querySelector('.submit');
const cities=document.querySelectorAll('.city');

//City when the page loads
let cityInput='Cluj-Napoca'

//Add click event to each city in the Favourites list
cities.forEach((city) =>{
    city.addEventListener('click', (e) =>{
//Change from default to the clicked one
        cityInput= e.target.innerHTML;

        fetchWeatherData();
        app.style.opacity='0';
    });
})
//Add submit event to the form
form.addEventListener('submit',(e) =>{
    if(search.value.lenght==0){
        alert('Please enter a city name');
    }
    else{
        cityInput=search.value;
    
    fetchWeatherData();

    search.value='';

    app.style.opacity='0';
}

    e.preventDefault();
});
//return a day of the week

// function dayOfTheWeek(day, month, year){
//     const weekday=[
//         'Monday',
//         'Tuesday',
//         'Wednesday',
//         'Thursday',
//         'Friday',
//         'Saturday',
//         'Sunday',

//     ];
//     return weekday[new Date(`${day}/${month}/${year}`).getDay()];
// };

//return a day of the week
function dayOfTheWeek(day, month, year) {
    const weekday = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',

    ];
    var d = new Date(day, month, year)
    var dayName = weekday[d.getDay()]; 
    return dayName;
}

//Function that fetches and display the data from weather API
function fetchWeatherData(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=e7119704e94942ae800115903230604&q=${cityInput}`)
    .then(response =>response.json())
    .then(data =>{
        console.log(data);

        temp.innerHTML=Math.round(data.current.temp_c) + '°C';
        conditionOutput.innerHTML=data.current.condition.text;

        const date =data.location.localtime;

        const y=parseInt(date.substr(0, 4));
        const m=parseInt(date.substr(5, 2));
        const d=parseInt(date.substr(8, 2));
        const time=date.substr(11);

        dateOutput.innerHTML=`${dayOfTheWeek(d, m, y)} ${d} / ${m} / ${y}`;
        timeOutput.innerHTML = time;

        nameOutput.innerHTML=data.location.name;

        const iconId=data.current.condition.icon.substr('//cdn.weatherapi.com/weather/64x64/'.length);

        icon.src='./images./icons/' + iconId;

        cloudOutput.innerHTML=data.current.cloud +'%';
        humidityOutput.innerHTML=data.current.humidity +'%';
        windOutput.innerHTML=data.current.wind_kph +'km/h';

        let timeOfDay='day';

        const code=data.current.condition.code;
//Dinamic Backgrounds and icons
        if(!data.current.is_day){
            timeOfDay='night';
        }
        if(code == 1000){
            app.style.backgroundImage=`url(./images/${timeOfDay}/clear.jpg)`;
            btn.style.background='#e5ba92';

            if(timeOfDay=='night'){
            btn.style.background='#181e27';
            }

        }
        else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        ){
            app.style.backgroundImage=`url(./images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background='#fa6d1b';
            if(timeOfDay=='night'){
                btn.style.background='#181e27';
            }

        }
        else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252 

        ){
            app.style.backgroundImage=`url(./images/${timeOfDay}/rainy.jpg)`;
            btn.style.background="#647d75";
            if(timeOfDay=='night'){
                btn.style.background='#325c80';
            }
        }
        else{
            app.style.backgroundImage=`url(./images/${timeOfDay}/snowy.jpg)`;
            btn.style.background="#4d72aa";
            if(timeOfDay=='night'){
                btn.style.background='#1b1b1b';
            }
        }
        app.style.opacity='1';

    })
//Alert when the user types a city that dosent exist
    .catch(()=>{
        alert('City not found');
        app.style.opacity='1';
    });
    
   
}
fetchWeatherData();

app.style.opacity='1';