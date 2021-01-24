const COORDS = `coords`;
const API_KEY = "8ac0223243625efa563b8fc208e92451";
const weather = document.querySelector(".js-weather");

function getweather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (r) {
      return r.json();
    })
    .then(function (json) {
      const tem = json.main.temp;
      const place = json.name;
      weather.innerText = `${tem}@${place}`;
    });
}

function saveCoords(coordsOBJ) {
  localStorage.setItem(COORDS, JSON.stringify(coordsOBJ));
}

function handleSucess(p) {
  const latitude = p.coords.latitude;
  const longitude = p.coords.longitude;
  const coordsOBJ = {
    latitude,
    longitude,
  };
  saveCoords(coordsOBJ);
  getweather(latitude, longitude);
}

function handleError() {
  console.log("can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleSucess, handleError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getweather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
