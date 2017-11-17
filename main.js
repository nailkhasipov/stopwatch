var Stopwatch = function(config) {
  this.running = false;
  this.time = null;
  this.timestamp = null;
  this.timer = config.timer;
  this.stopButton = config.stopButton;
  this.startButton = config.startButton;
  this.resetButton = config.resetButton;
  this.lapButton = config.lapButton;
  this.results = config.results;
}

Stopwatch.prototype.start = function() {
  if (!this.timestamp)
    this.timestamp = Date.now();
  this.running = true;
  this.step();
  this.showStop();
  this.showLap();
}

Stopwatch.prototype.stop = function() {
  this.running = false;
  this.showStart();
  this.showReset();
}

Stopwatch.prototype.reset = function() {
  if (!this.timestamp) {
    return;
  } else {
    this.timestamp = null;
    this.time = null;
  }
  this.running = false;
  this.timer.innerText = '00:00:00';
  this.results.innerHTML = '';
  this.showStart();
  this.showLap(true);
}

Stopwatch.prototype.lap = function() {
  if (!this.time)
    return;
  let li = document.createElement('li');
  li.innerText = this.format();
  this.results.appendChild(li);
}

Stopwatch.prototype.step = function() {
  if (!this.running) 
    return;
  this.time = new Date(Date.now() - this.timestamp);
  this.print();
  requestAnimationFrame(this.step.bind(this));
}

Stopwatch.prototype.print = function() {
  timer.innerText = this.format();
}

Stopwatch.prototype.format = function() {
  return zeroPad(this.time.getMinutes(), 2) + ':' +
         zeroPad(this.time.getSeconds(), 2) + ':' +
         zeroPad(Math.floor(this.time.getMilliseconds()/10, 2), 2);
}

Stopwatch.prototype.showStart = function() {
  this.stopButton.classList.add('hidden');
  this.startButton.classList.remove('hidden');
}

Stopwatch.prototype.showStop = function() {
  this.stopButton.classList.remove('hidden');
  this.startButton.classList.add('hidden');
}

Stopwatch.prototype.showLap = function(disable) {
  if (disable) {
    this.lapButton.classList.add('disable');
  } else {
    this.lapButton.classList.remove('disable');
  }
  this.resetButton.classList.add('hidden');
  this.lapButton.classList.remove('hidden');
}

Stopwatch.prototype.showReset = function() {
  this.resetButton.classList.remove('hidden');
  this.lapButton.classList.add('hidden');
}

const config = {
  timer: document.getElementById('timer'),
  stopButton: document.getElementById('stopButton'),
  startButton: document.getElementById('startButton'),
  resetButton: document.getElementById('resetButton'),
  lapButton: document.getElementById('lapButton'),
  results: document.getElementById('results')
}

let stopwatch = new Stopwatch(config);

function zeroPad(number, width) {
  var string = String(number);
  while (string.length < width)
    string = '0' + string;
  return string;
}