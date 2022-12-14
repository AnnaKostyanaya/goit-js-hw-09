

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector(`button[data-start]`),
    days: document.querySelector(`span[data-days]`),
    hours: document.querySelector(`span[data-hours]`),
    minutes: document.querySelector(`span[data-minutes]`),
    seconds: document.querySelector(`span[data-seconds]`),
    calendar: document.querySelector(`#datetime-picker`),
};
let chooseDate = 0;

flatpickr(refs.calendar, {
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
});
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
        refs.calendar.disabled = true;
        refs.startBtn.disabled = true;
        this.intervalId = setInterval(() => {
            const nowDate = Date.now();
            const delta = chooseDate - nowDate;
            const { days, hours, minutes, seconds } = convertMs(delta);
            if (delta <= 0) { 
                timer.stop();
                } updateClockface(days, hours, minutes, seconds);
        }, 1000);
    },
    stop() {
        this.isActive = false;
        refs.calendar.disabled = false;
        refs.startBtn.disabled = false;
        clearInterval(this.intervalId);
        const time = this.convertMs(0);
    },
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