import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const formElements = evt.currentTarget.elements;
  let delay = +formElements.delay.value;
  const step = +formElements.step.value;
  const amount = +formElements.amount.value;

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
});
