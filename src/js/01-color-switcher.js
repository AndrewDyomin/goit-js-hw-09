const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = randomColor();
    console.log('started');
  }, 1000);
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled', '');
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled', '');
  console.log(`Interval with id ${timerId} has stopped!`);
});
