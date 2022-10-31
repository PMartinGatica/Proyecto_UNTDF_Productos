const GetForecast = (latitude, longitude) => {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m,winddirection_10m&timezone=America%2FSao_Paulo`;

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      RenderWeather(json.hourly);
    });
};

const RenderWeather = (hourlyWeathers) => {
  for (let i = 0; i < hourlyWeathers.time.length; i++) {
    let temperature = hourlyWeathers.temperature_2m[i];
    let apparent_temperature = hourlyWeathers.apparent_temperature[i];
    let precipitation = hourlyWeathers.precipitation[i];
    let windspeed_10m = hourlyWeathers.windspeed_10m[i];
    let winddirection_10m = hourlyWeathers.winddirection_10m[i];
    let date = hourlyWeathers.time[i].split("T")[0];

    let time = hourlyWeathers.time[i].split("T")[1];

    WeatherContainer.innerHTML += RenderWeatherPerHour(
      temperature,
      apparent_temperature,
      precipitation,
      windspeed_10m,
      winddirection_10m,
      date,
      time
    );
  }
};

const RenderWeatherPerHour = (
  temperature,
  apparent_temperature,
  precipitation,
  windspeed_10m,
  winddirection_10m,
  date,
  time
) => {
  let resultado = `
            <div class="provincia">
                <h1>${date} - ${time}</h1>
                <p>
                    Temperatura: ${temperature}<br>
                    Sensacion Termica: ${apparent_temperature} <br/>
                    Precipitaciones: ${precipitation} <br/>
                    Velocidad del viento: ${windspeed_10m} <br/>
                    Direccion del viento: ${winddirection_10m} <br/>
                </p>
            </div>
            `;
  return resultado;
};

GetForecast(-54.82, -68.36);
