const name = "Harsh Raval";

// "use strict";

// // prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// const form = document.querySelector(".form");
// const containerWorkouts = document.querySelector(".workouts");
// const inputType = document.querySelector(".form__input--type");
// const inputDistance = document.querySelector(".form__input--distance");
// const inputDuration = document.querySelector(".form__input--duration");
// const inputCadence = document.querySelector(".form__input--cadence");
// const inputElevation = document.querySelector(".form__input--elevation");

// // app._getposition();//instead of this we can execute our class directly by writing it into the constructor cuz the constructor is used to run the class

// //geolocation has 2 callbacks first is the success and other one is the failure
// // if (navigator.geolocation)

// //getCurrentPosition
// //watchPosition
// let map, mapEvent;
// // navigator.geolocation.watchPosition(
// //   function (position) {
// //     console.log(position);
// //     const { latitude } = position.coords;
// //     const { longitude } = position.coords;
// //     console.log(latitude, longitude);
// //     const coords = [latitude, longitude];
// //     console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
// //     // console.log(`https://www.google.com/maps/@19.0699797,72.8397202,15z?entry=ttu`)
// //     map = L.map("map").setView(coords, 13);
// //     // map = L.map("mapa").setView(coords, 15);

// //     // "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
// //     L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
// //       attribution:
// //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// //     }).addTo(map);

// //     L.marker(coords)
// //       .addTo(map)
// //       .bindPopup("A pretty CSS popup.<br> Easily customizable.")
// //       .openPopup();

// //     map.on("click", function (mapE) {
// //       mapEvent = mapE;
// //       form.classList.remove("hidden");
// //       inputDistance.focus();
// //     });
// //   },
// //   function () {
// //     alert("could not found your location");
// //   }
// // );

// console.log(name);

// class App {
//   constructor() {
//     //constructor runs the class as soon as it is loaded into the webpage
//     this._getPosition();
//   }

//   _getPosition() {
//     if (navigator.geolocation)
//       navigator.geolocation.getCurrentPosition(this._loadMap, function () {
//         alert("could not found your location");
//       });
//   }

//   _loadMap(position) {
//     // console.log(position);
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     console.log(latitude, longitude);

//     const coords = [latitude, longitude];

//     console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
//     // console.log(`https://www.google.com/maps/@19.0699797,72.8397202,15z?entry=ttu`)

//     map = L.map("map").setView(coords, 13);

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
//   }

//   showForm() {}

//   _toggleElevationField() {}

//   _newWorkout() {}
// }
// const app = new App();

// form.addEventListener("submit", function (e) {
//   inputCadence.value =
//     inputDistance.value =
//     inputDuration.value =
//     inputElevation.value =
//       "";
//   e.preventDefault();
//   console.log(mapEvent);
//   const { lat, lng } = mapEvent.latlng;

//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 300,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: "running-popup",
//       })
//     )
//     .setPopupContent("Workout")
//     .openPopup();
// });

// inputType.addEventListener("change", function () {
//   inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
//   inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
// });
