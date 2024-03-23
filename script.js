let timer;
let running = false;
let startTime;
let currentTime = 0;
let laps = [];

function startStop() {
  if (!running) {
    start();
  } else {
    stop();
  }
}

function start() {
  running = true;
  startTime = Date.now() - currentTime;
  timer = setInterval(updateDisplay, 10);
  document.getElementById('startStop').innerText = 'Stop';
  document.getElementById('lapReset').innerText = 'Lap';
}

function stop() {
  running = false;
  clearInterval(timer);
  document.getElementById('startStop').innerText = 'Start';
  document.getElementById('lapReset').innerText = 'Reset';
}

function updateDisplay() {
  let elapsed = Date.now() - startTime;
  currentTime = elapsed;
  let timeFormatted = new Date(elapsed).toISOString().substr(11, 8);
  document.getElementById('display').innerText = timeFormatted;
}

function lapReset() {
  if (running) {
    let elapsed = Date.now() - startTime;
    let lapTime = new Date(elapsed).toISOString().substr(11, 8);
    laps.push(lapTime);
    displayLaps();
  } else {
    reset();
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  currentTime = 0;
  laps = [];
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('startStop').innerText = 'Start';
  document.getElementById('lapReset').innerText = 'Lap';
  document.getElementById('laps').innerHTML = '';
}

function displayLaps() {
  let lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    let li = document.createElement('li');
    li.innerText = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}
