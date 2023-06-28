import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

document.querySelector('.timer').style.cssText= `
    margin-top: 5px;
    display: flex;
    gap: 5px;
`;
document.querySelectorAll('.field').forEach(function callback(el) {
  el.style.cssText= `
  display: flex;
  flex-direction: column;
  background: #ddd;
  min-width: 70px;
  padding: 3px;
  gap: 5px;
  text-align: center;
  border: 2px solid #000;
  border-radius: 3px;
`;
});

startBtn.setAttribute('disabled', '');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= Date.now()) {
        Notiflix.Report.warning('Warning', 'Please choose a date in the future', 'Close');
      } else {
        startBtn.removeAttribute('disabled', '');
      };
    },
  };

  const flat = flatpickr(inputEl, options);

  function convertMs(ms) {
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };

  function addZero (v) {
    return String(v).padStart(2, 0)
  };

  const startBtnClickHandler = () => {
    setInterval(() => {
        const date = Date.now();
        const ms = (flat.selectedDates[0].getTime() - date);
        if (flat.selectedDates[0].getTime() >= date) {
        updateTimer(convertMs(ms));
        }
        return;
    }, 1000);
  };

  function updateTimer({ days, hours, minutes, seconds }) {
    daysEl.textContent = addZero(days);
    hoursEl.textContent = addZero(hours);
    minutesEl.textContent = addZero(minutes);
    secondsEl.textContent = addZero(seconds);
  };

  startBtn.addEventListener('click', startBtnClickHandler);