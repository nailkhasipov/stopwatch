var Stopwatch = function() {
  this.interval = null;
  this.timestamp = null;

  this.drawActions();
}

Stopwatch.prototype.start = function() {
  this.timestamp = Date.now();
  this.interval = setInterval(function(){
    this.print();
  }.bind(this), 1);
  this.drawActions();
}

Stopwatch.prototype.stop = function() {
  clearInterval(this.interval);
  this.interval = null;
  this.drawActions();
}

Stopwatch.prototype.print = function() {
  let current = new Date(Date.now() - this.timestamp);
  
  let minutes = zeroPad(current.getMinutes(), 2);
  let seconds = zeroPad(current.getSeconds(), 2);
  let milliseconds = zeroPad(Math.floor(current.getMilliseconds()/10, 2), 2);

  document.getElementById('timer').innerText = `${minutes}:${seconds}:${milliseconds}`;
}

Stopwatch.prototype.drawActions = function() {
  let startButton = document.createElement("button");
  startButton.innerText = 'Start';
  startButton.onclick = this.start.bind(this);

  let stopButton = document.createElement("button");
  stopButton.innerText = 'Stop';
  stopButton.onclick = this.stop.bind(this);

  let resetButton = document.createElement("button");
  resetButton.className = 'disable';
  resetButton.innerText = 'Reset';
  resetButton.onclick = this.start.bind(this);

  document.getElementById("actions").innerHTML = "";

  if (this.interval) {
    document.getElementById("actions").appendChild(resetButton);
    document.getElementById("actions").appendChild(stopButton);
  } else {
    document.getElementById("actions").appendChild(resetButton);
    document.getElementById("actions").appendChild(startButton);
  }
}

let stopwatch = new Stopwatch();

function zeroPad(number, width) {
  var string = String(number);
  while (string.length < width)
    string = '0' + string;
  return string;
}