import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const inputArr = document.querySelectorAll('input');
const [ delay, step, amount ] = inputArr;

formEl.addEventListener('submit', createPromise);

let position = 1;
let timerId = null;

function createPromise(event) {
  event.preventDefault();
    setTimeout(() => {
      timerId = setInterval(() => {
        const shouldResolve = Math.random() > 0.3;
        const promise = new Promise((resolve, reject) => {
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        });
        if (position < amount.value) {
          position ++;
        } else {
          clearInterval(timerId);
        }
        promise
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay.value}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay.value}ms`);
        });
      }, step.value)
  }, delay.value)
};

