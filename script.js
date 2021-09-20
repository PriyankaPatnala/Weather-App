//http://api.openweathermap.org/data/2.5/weather?q=visakhapatnam&units=metric&appid=3b751acc40bb08ad53d172e0b0168561
let weather = {
    "apikey": "3b751acc40bb08ad53d172e0b0168561",
    fetchWeather: function(city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+ this.apikey)
        .then((response) => {
            if (!response.ok) {
                alert('No weather found!');
                throw new Error("No Weather Found");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather : function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, humidity, temp, speed);
        document.querySelector('.city').innerText = "Weather in city "+ name;
        document.querySelector('.icon').src= "http://openweathermap.org/img/wn/"+ icon +".png"
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.humidity').innerText = "Humidity:"+ humidity + "%" ;
        document.querySelector('.wind').innerText = "Wind Speed: " + speed + "Km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name+"')"
    },
    search : function() {
        this.fetchWeather(document.querySelector('.searchbar').value);
    }
};

document.querySelector('.search button')
.addEventListener('click', function() {
    weather.search();
});

document.querySelector('.searchbar')
.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        weather.search();
    }
})

weather.fetchWeather('Visakhapatnam');