let seconds: any = document.querySelector(".seconds");
let minutes: any = document.querySelector(".minutes");
let hours: any = document.querySelector(".hours");
let day: any = document.querySelector("#day");
let month: any = document.querySelector("#month");
let year: any = document.querySelector("#year");
let timer: any = document.querySelector(".timer");
let startBtn: any = document.querySelector(".start");
let resetBtn: any = document.querySelector(".reset");

let time = setInterval(() => {
  let now = new Date();

  seconds.innerHTML = String(now.getSeconds()).padStart(2, "0");
  minutes.innerHTML = String(now.getMinutes()).padStart(2, "0");
  hours.innerHTML = now.getHours();

  day.innerHTML = String(now.getDate()).padStart(2, "0");
  month.innerHTML = String(now.getMonth() + 1).padStart(2, "0");
  year.innerHTML = now.getFullYear().toString().padStart(4, "0");
}, 1000);

startBtn.addEventListener("click", () => {
  let startTime = Date.now();
  setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    let hours: number | string = Math.floor(elapsedTime / 6000000);
    let minutes: number | string = Math.floor(elapsedTime / 60000);
    let seconds: number | string = Math.floor(elapsedTime / 1000);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.innerHTML = `${hours}:${minutes}:${seconds}`;
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  timer.innerHTML = "00:00";
});
