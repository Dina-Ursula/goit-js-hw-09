const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let interval;

startButton.addEventListener('click', evt => {
  evt.preventDefault();

  startButton.disabled = true;
  stopButton.disabled = false;

  interval = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', evt => {
  evt.preventDefault();

  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(interval);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopButton.disabled = true;
