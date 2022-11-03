const GetForecast = (latitude, longitude) => {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m,winddirection_10m&timezone=America%2FSao_Paulo`;

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      RenderWeather(json.hourly);
    });
};

const GetCurrentDate = () => {
  let currentDate = new Date().toLocaleString({
    timeZone: "America/Argentina/Buenos_Aires",
  });
  let day = currentDate.split("/")[0].padStart(2, 0);
  let month = currentDate.split("/")[1].padStart(2, 0);
  let year = currentDate.split("/")[2].split(",")[0];
  let hour = currentDate.split(":")[0].split(",")[1].replace(" ", "");
  currentDate = `${year}-${month}-${day}T${hour}:00`;
  return currentDate;
};

const RenderWeather = (hourlyWeathers) => {
  let temperatures = [];
  let apparent_temperatures = [];
  let precipitations = [];
  let windspeed_10ms = [];
  let winddirection_10ms = [];
  let dateTimes = [];
  while (hourlyWeathers.time.length) {
    temperatures = hourlyWeathers.temperature_2m.splice(0, 24);
    apparent_temperatures = hourlyWeathers.apparent_temperature.splice(0, 24);
    precipitations = hourlyWeathers.precipitation.splice(0, 24);
    windspeed_10ms = hourlyWeathers.windspeed_10m.splice(0, 24);
    winddirection_10ms = hourlyWeathers.winddirection_10m.splice(0, 24);
    dateTimes = hourlyWeathers.time.splice(0, 24);
    WeatherContainer.innerHTML += RenderWeatherPerDay(
      temperatures,
      apparent_temperatures,
      precipitations,
      windspeed_10ms,
      winddirection_10ms,
      dateTimes
    );
  }
};

const RenderWeatherPerDay = (
  temperatures,
  apparent_temperatures,
  precipitations,
  windspeed_10ms,
  winddirection_10ms,
  dateTimes
) => {
  let result = `
    <div class="weather">
      <h2>${dateTimes[0].split("T")[0]}</h2>
    `;
  for (let i = 0; i < temperatures.length; i++) {
    result += GetHourWeatherCard(
      dateTimes[i],
      temperatures[i],
      apparent_temperatures[i],
      precipitations[i],
      windspeed_10ms[i],
      winddirection_10ms[i]
    );
  }
  result += `
    </div>
  `;
  return result;
};

const GetDescriptionByPrecipitations = (precipitations) => {
  if (precipitations === 0) return "Soleado";
  if (precipitations <= 15) return "Lluvias débiles";
  if (precipitations <= 30) return "Lluvia";
  if (precipitations <= 60) return "Lluvias muy fuertes";
  return "Lluvias torrenciales";
};

const GetWeatherIconByPrecipitations = (precipitations, dateTime) => {
  let hour = dateTime.split("T")[1].split(":")[0];
  let isCurrentTime = dateTime == GetCurrentDate() ? true : false;
  let isDay = hour >= 6 && hour <= 18 ? true : false;
  if (isDay) {
    if (precipitations === 0) {
      if (isCurrentTime)
        return `<img src='./images/icons/animated/clear-day.svg' alt='soleado' />`;
      return `<img src='./images/icons/static/clear-day.svg' alt='soleado' />`;
    }
    if (precipitations <= 15) {
      if (isCurrentTime)
        return `<img src='./images/icons/animated/rainy-1-day.svg' alt='Lluvias débiles' />`;
      return `<img src='./images/icons/static/rainy-1-day.svg' alt='Lluvias débiles' />`;
    }
    if (precipitations <= 30) {
      if (isCurrentTime)
        return `<img src='./images/icons/animated/rainy-2-day.svg' alt='Lluvia' />`;
      return `<img src='./images/icons/static/rainy-2-day.svg' alt='Lluvia' />`;
    }
    if (precipitations <= 60) {
      if (isCurrentTime)
        return `<img src='./images/icons/animated/rainy-3-day.svg' alt='Lluvias muy fuertes' />`;
      return `<img src='./images/icons/static/rainy-3-day.svg' alt='Lluvias muy fuertes' />`;
    }
    if (isCurrentTime)
      return `<img src='./images/icons/animated/scattered-thunderstorms-day.svg' alt='Lluvias torrenciales' />`;
    return `<img src='./images/icons/static/scattered-thunderstorms-day.svg' alt='Lluvias torrenciales' />`;
  }
  if (precipitations === 0) {
    if (isCurrentTime)
      return `<img src='./images/icons/animated/clear-night.svg' alt='soleado' />`;
    return `<img src='./images/icons/static/clear-night.svg' alt='soleado' />`;
  }
  if (precipitations <= 15) {
    if (isCurrentTime)
      return `<img src='./images/icons/animated/rainy-1-night.svg' alt='Lluvias débiles' />`;
    return `<img src='./images/icons/static/rainy-1-night.svg' alt='Lluvias débiles' />`;
  }
  if (precipitations <= 30) {
    if (isCurrentTime)
      return `<img src='./images/icons/animated/rainy-2-night.svg' alt='Lluvia' />`;
    return `<img src='./images/icons/static/rainy-2-night.svg' alt='Lluvia' />`;
  }
  if (precipitations <= 60) {
    if (isCurrentTime)
      return `<img src='./images/icons/animated/rainy-3-night.svg' alt='Lluvias muy fuertes' />`;
    return `<img src='./images/icons/static/rainy-3-night.svg' alt='Lluvias muy fuertes' />`;
  }
  if (isCurrentTime)
    return `<img src='./images/icons/animated/scattered-thunderstorms-night.svgt' alt='Lluvias torrenciales' />`;
  return `<img src='./images/icons/static/scattered-thunderstorms-night.svg' alt='Lluvias torrenciales' />`;
};

const GetHourWeatherCard = (
  dateTime,
  temperature,
  apparent_temperature,
  precipitation,
  windspeed_10m,
  winddirection_10m
) => {
  let result = "";
  dateTime == GetCurrentDate() ? (result += "<p id='CurrentTime'>") : "<p>";
  return (result += `
                  ${GetWeatherIconByPrecipitations(precipitation, dateTime)}
                  Tiempo: ${dateTime.split("T")[1]}<br/>
                  Temperatura: ${temperature}<br/>
                  Sensacion Termica: ${apparent_temperature} <br/>
                  Precipitaciones: ${precipitation} <br/>
                  Descripcion: ${GetDescriptionByPrecipitations(
                    precipitation
                  )} <br/>
                  Velocidad del viento: ${windspeed_10m} <br/>
                  Direccion del viento: ${winddirection_10m} <br/>
              </p>
        `);
};

GetForecast(-54.82, -68.36);

setTimeout(() => {
  document.getElementById("CurrentTime").scrollIntoView(true);
}, 1000);
