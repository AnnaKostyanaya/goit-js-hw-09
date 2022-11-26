import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('input'),
}

refs.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const delay = Number(evt.currentTarget.elements.delay.value);
  const step= evt.currentTarget.elements.step.value;
  const amount = evt.currentTarget.elements.amount.value;

  for (let i = 0; i < amount; i += 1) {
    let delay2 = delay + step * i;
    createPromise(i+1, delay2).then(onMakeSuccess).catch(onMakeError);;
  } 
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } 
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
};

function onMakeSuccess(message) {
  Notiflix.Notify.info(message);
};
 
function onMakeError(message) {
  Notiflix.Notify.info(message);
};