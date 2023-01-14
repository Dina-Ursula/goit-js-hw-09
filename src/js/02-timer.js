import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate.getTime() <= Date.now()) {
      button.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }

    button.disabled = false;
  },
};

button.addEventListener('click', evt => {
  evt.preventDefault();

  const pickerDate = new Date(datetimePicker.value);

  let interval;
  interval = setInterval(() => {
    const timeDifference = pickerDate.getTime() - Date.now();

    if (timeDifference <= 0) {
      clearInterval(interval);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    spanDays.textContent = addLeadingZero(days);
    spanHours.textContent = addLeadingZero(hours);
    spanMinutes.textContent = addLeadingZero(minutes);
    spanSeconds.textContent = addLeadingZero(seconds);
  }, 1000);

  button.disabled = true;
});

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(datetimePicker, options);
button.disabled = true;
