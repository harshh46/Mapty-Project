"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// if (navigator.geolocation)
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       console.log(position);
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       console.log(latitude, longitude);
//       const coords = [latitude, longitude];

//       console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//       var map = L.map("map").setView(coords, 13);

//       L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       L.marker(coords)
//         .addTo(map)
//         .bindPopup("A pretty CSS popup.<br> Easily customizable.")
//         .openPopup();
//     },
//     function () {
//       alert("could not found your location");
//     }
//   );

// app._getposition();//instead of this we can execute our class directly by writing it into the constructor cuz the constructor is used to run the class

//geolocation has 2 callbacks first is the success and other one is the failure
// if (navigator.geolocation)

//getCurrentPosition
//watchPosition
// let map, mapEvent;
// navigator.geolocation.watchPosition(
//   function (position) {
//     console.log(position);
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     console.log(latitude, longitude);
//     const coords = [latitude, longitude];
//     console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
//     // console.log(`https://www.google.com/maps/@19.0699797,72.8397202,15z?entry=ttu`)
//     map = L.map("map").setView(coords, 13);
//     // map = L.map("mapa").setView(coords, 15);

//     // "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//     L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     L.marker(coords)
//       .addTo(map)
//       .bindPopup("A pretty CSS popup.<br> Easily customizable.")
//       .openPopup();

//     map.on("click", function (mapE) {
//       mapEvent = mapE;
//       form.classList.remove("hidden");
//       inputDistance.focus();
//     });
//   },
//   function () {
//     alert("could not found your location");
//   }
// );

console.log(name);

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // Running on April 14
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this._setDescription = `${this.type[0].toUpperCase()}${this.type.slice(
      1
    )} on ${months[this.date.getMonth()]} ${this.date.getDate()} `;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    //km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

//application architecture
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  constructor() {
    //constructor runs the class as soon as it is loaded into the webpage
    this._getPosition();

    //get data from local storage
    this._getLocalStorage();

    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);

    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("could not found your location");
        }
      );
  }

  _loadMap(position) {
    // console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);

    const coords = [latitude, longitude];

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    // console.log(`https://www.google.com/maps/@19.0699797,72.8397202,15z?entry=ttu`)

    //this keyword is undefiend cuz we called the function and if the function is calles then the this keyword is set to undefined so we hve to use the bind method with the this so it will simply resolve the error
    // console.log(this);
    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    // "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    // map = L.map("map").setView(coords, 13);

    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(this.#map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();

    this.#map.on("click", this._showForm.bind(this));

    this.#workouts.forEach((work) => this._renderWorkoutMarker(work));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideform() {
    // prettier-ignore
    inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      "";

    form.style.display = "none";
    form.classList.add("hidden");

    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    // console.log(this);

    e.preventDefault();
    // console.log(mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;

    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);
    //get data from form

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let workout;

    //if the workout running then create running object
    if (type === "running") {
      const cadence = +inputCadence.value;

      //check if the data is correct
      if (
        // !Number.isFinite(duration) ||
        // !Number.isFinite(distance) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert("Please enter valid and positve numbers");

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //if the workout cycling then create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;

      //check if the data is correct
      if (
        !validInputs(duration, distance, elevation) ||
        !allPositive(distance, duration)
      )
        return alert("Please enter valid and positve numbers");

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    //add new object to workout array
    this.#workouts.push(workout);
    // console.log(workout);
    //render workout on map
    this._renderWorkoutMarker(workout);

    this._renderWorkout(workout);

    //hide form + clear the input fields
    this._hideform();

    //saving workouts to locaal storage
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout._setDescription}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout._setDescription}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;

    if (workout.type === "running") {
      html += `
      </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;
    }

    if (workout.type === "cycling") {
      html += `
      </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li> 
      `;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");
    // console.log(workoutEl);

    if (!workoutEl) return;
    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );
    // console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));
    // console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach((work) => this._renderWorkout(work));
  }

  reset() {
    //if want to use reset then go into console nd type app.reset or try diff logs related to reset
    localStorage.removeItem("workouts");
    location.reload();
  }
}
const app = new App();

//when we extract the data from the local storage we use JSON parsing technique so the object lost his prototype so can't apply the click method
