

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const notify = require("notiflix/build/notiflix-notify-aio");
const flatpickr = require("flatpickr");
let chooseDate = 0;

const refs = {
    startBtn: document.querySelector(`button[data-start]`),
    days: document.querySelector(`span[data-days]`),
    hours: document.querySelector(`span[data-hours]`),
    minutes: document.querySelector(`span[data-minutes]`),
    seconds: document.querySelector(`span[data-seconds]`),
    calendar: document.querySelector(`#datetime-picker`),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        chooseDate = selectedDates[0].getTime();
        const currentDate = Date.now();
        const deltaTime = currentDate - chooseDate;
        if (deltaTime >= 0) {
            // alert("Please choose a date in the future");
            Notiflix.Notify.info('Please choose a date in the future');
        } else { 
            refs.startBtn.disabled = false;
        }
    },
};

flatpickr(refs.calendar, options);
refs.startBtn.disabled = true;
refs.startBtn.addEventListener("click", () => {
    timer.start();
});

const timer = {
    intervalId: null,
    isActive: false,
    start() { 
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const nowDate = Date.now();
            const delta = chooseDate - nowDate;
            const { days, hours, minutes, seconds } = convertMs(delta);
            updateClockface(days, hours, minutes, seconds);
        }, 1000);
    },
    // stop() { 
    //     clearInterval(this.intervalId);
    //     this.isActive = false;
    // }
};

function convertMs(ms) { 
// Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function updateClockface(days, hours, minutes, seconds) { 
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function addLeadingZero(value) { 
    return String(value).padStart(2, '0');
}