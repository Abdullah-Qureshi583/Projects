"use strict";
// console.log(now.getSeconds());
let seconds = document.querySelector(".seconds");
let minutes = document.querySelector(".minutes");
let hours = document.querySelector(".hours");
let day = document.querySelector("#day");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
let timer = document.querySelector(".timer");
let startBtn = document.querySelector(".start");
// console.log(hours.innerHTML= 6);
// console.log(date);
let time = setInterval(() => {
    let now = new Date();
    seconds.innerHTML = String(now.getSeconds()).padStart(2, "0");
    minutes.innerHTML = String(now.getMinutes()).padStart(2, "0");
    hours.innerHTML = now.getHours();
    day.innerHTML = String(now.getDate()).padStart(2, "0");
    month.innerHTML = String(now.getMonth() + 1).padStart(2, "0");
    year.innerHTML = now.getFullYear().toString().padStart(4, "0");
}, 1000);
// time();
startBtn.addEventListener("click", () => {
    // startBtn.innerHTML = "Stop"
    //   startBtn.className = "stop";
    let startTime = Date.now();
    let timeInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let hours = Math.floor(elapsedTime / 6000000);
        let minutes = Math.floor(elapsedTime / 60000);
        let seconds = Math.floor(elapsedTime / 1000);
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timer.innerHTML = `${hours} : ${minutes} : ${seconds}`;
    }, 1000);
    let resetBtn = document.querySelector(".reset");
    resetBtn.addEventListener("click", () => {
        clearInterval(timeInterval);
        timer.innerHTML = "00:00";
    });
});
