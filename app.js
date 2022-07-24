const app = {
    init: () => {
      document
        .getElementById('btnGet')
        .addEventListener('click', app.fetchLatLon);
    },
    fetchLatLon: (ev) => {
        let city = document.getElementById('city').value;
        let key = '2c6de27ad132b92f5865a4065b4e693f';
        let url1= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        fetch(url1)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((data) => {
          app.showLatLon(data);
        })
        .catch(console.error);
      }, 
        showLatLon:(resp)=>{
        console.log(resp);
        let {lat,lon}=resp.coord;
        app.fetchWeather(lat,lon);
        },
        fetchWeather: (lat,lon) => {
        let key='2c6de27ad132b92f5865a4065b4e693f';
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`;
        fetch(url)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((data) => {
          app.showWeather(data);
        })
        .catch(console.error);
      },
      showWeather: (resp) => {
        console.log(resp);
        let row = document.querySelector('.weather.row');
        row.innerHTML = resp.daily
      .map((day, idx) => {
        if (idx <= 8) {
          let dt = new Date(day.dt * 1000); //timestamp * 1000
          let sr = new Date(day.sunrise * 1000).toTimeString();
          let ss = new Date(day.sunset * 1000).toTimeString();
          return `<div class="col">
              <div class="card">
              <h5 class="card-title p-2">${dt.toDateString()}</h5>
                <img
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@4x.png"
                  class="card-img-top"
                  alt="${day.weather[0].description}"
                />
                <div class="card-body">
                  <h3 class="card-title">${day.weather[0].main}</h3>
                  <p class="card-text">High ${day.temp.max}&deg;C Low ${
            day.temp.min
          }&deg;C</p>
                  <p class="card-text">High Feels like ${
                    day.feels_like.day
                  }&deg;C</p>
                  <p class="card-text">Pressure ${day.pressure}mb</p>
                  <p class="card-text">Humidity ${day.humidity}%</p>
                  <p class="card-text">UV Index ${day.uvi}</p>
                  <p class="card-text">Precipitation ${Math.round(day.pop * 100+ Number.EPSILON)}%</p>
                  <p class="card-text">Dewpoint ${day.dew_point}</p>
                  <p class="card-text">Wind ${day.wind_speed}m/s, ${
            day.wind_deg
          }&deg;</p>
                  <p class="card-text">Sunrise ${sr}</p>
                  <p class="card-text">Sunset ${ss}</p>
                </div>
              </div>
            </div>
          </div>`;
        }
      })
      .join(' ');
  },
};
    
    app.init();