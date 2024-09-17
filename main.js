
let icon = document.getElementById('icon');
let searchBox = document.getElementById('search-box');
let image = document.getElementById('imagex');

if(localStorage.length!=0)
{
    document.getElementById('city').innerHTML=localStorage.city;
    document.getElementById('temp').innerHTML=localStorage.temp;
    document.getElementById('percent').innerHTML=localStorage.percent;
    document.getElementById('wind').innerHTML=localStorage.wind;
    image.setAttribute('src',localStorage.imaged);
}

async function checkWeather(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=884b6ac40ad0cfe46ba36e49abf2db60&units=metric`; 
    const response = await fetch(api);
    var data = await response.json();
    document.getElementById('city').innerHTML=data['name'];
    document.getElementById('temp').innerHTML=Math.round(data['main']['temp']);
    document.getElementById('percent').innerHTML=data['main']['humidity'];
    document.getElementById('wind').innerHTML=data['wind']['speed'];
    image.setAttribute('src',`images/${data['weather'][0]['main'].toLowerCase()}.png`);
    localStorage.setItem('city',data['name']);
    localStorage.setItem('temp',Math.round(data['main']['temp']));
    localStorage.setItem('percent',data['main']['humidity']);
    localStorage.setItem('wind',data['wind']['speed']);
    localStorage.setItem('imaged',`images/${data['weather'][0]['main'].toLowerCase()}.png`);
};

icon.addEventListener('click',function () {
    checkWeather(searchBox.value);
    searchBox.value='';
});