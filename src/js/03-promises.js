import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const inputArr = document.querySelectorAll('input');
const [ delay, step, amount ] = inputArr;

formEl.addEventListener('submit', createPromise);

let position = 1;
let timerId = null;



function createPromise(event) {
  let currentDelay = delay.value - step.value;
  let currentStep = Number(step.value);
  console.log(currentDelay);
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
        };

        promise
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${(currentDelay + currentStep)}ms`);
          currentStep = currentStep + Number(step.value);
          console.log(currentStep);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${(currentDelay + currentStep)}ms`);
          currentStep = currentStep + Number(step.value);
          console.log(currentStep);
        });
      }, currentStep)
  }, currentDelay)
};

