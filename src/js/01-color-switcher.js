const refs = {
    body: document.querySelector(`body`),
    start: document.querySelector(`button[data-start]`),
    stop:document.querySelector(`button[data-stop]`),
}
let intervalId = 0;
refs.stop.disabled = true;

refs.start.addEventListener('click', () => { 
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
        refs.start.disabled = true;
        refs.stop.disabled = false;
}, 1000);
});

refs.stop.addEventListener('click', () => { 
    clearInterval(intervalId);
    refs.start.disabled = false;
    refs.stop.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}