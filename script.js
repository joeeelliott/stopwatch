const btns = document.querySelectorAll('button');

// define variables to hold time values
let milliSeconds = 0; 
let seconds = 0;
let minutes = 0;
let hours = 0;

// define variable to hold 'display' value (the '0's before each value hits 10)
let displayMilliSeconds = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

// define our setInterval id
let interval;


// stopwatch function (logic to determine when to increment next value etc.)
function stopWatch(){

  milliSeconds ++;

  if(milliSeconds / 10 === 1){
    seconds++;  // everytime this function is called, the seconds variable increments
    milliSeconds = 0;
  }
  
  // logic to determine when to increment next value
  if(seconds / 60 === 1){  //if seconds gets to 60 (bcos thats how many there is in a minute), do the following... this condition only works when we get to a minute worth of seconds bcos 60/60 === 1. no number before 60 when divided by 60 === 1. 
    seconds = 0;  // reset seconds back to 0 bcos we reached a min
    minutes++;   // increment minutes variable by one
  }

  if(minutes / 60 === 1){  // same as above, if we hit an hour
    minutes = 0; // reset minutes back to 0 bcos we reached an hour
    hours++;   // increment hours variable by one 
  }

  // if seconds/minutes/hours are only one digit, add a leading 0 to the value
  if(milliSeconds < 10){
    displayMilliSeconds = `${milliSeconds.toString()}`; 
  } else {
    displayMilliSeconds = milliSeconds;
  }

  if(seconds < 10){
    displaySeconds = `0${seconds.toString()}`; 
  } else {
    displaySeconds = seconds; 
  }

  if(minutes < 10){
    displayMinutes = `0${minutes.toString()}`; 
  } else {
    displayMinutes = minutes; 
  }

  if(hours < 10){
    displayHours = `0${hours.toString()}`; 
  } else {
    displayHours = hours; 
  }

  // display updated time values to user - this is inside this function bcos we will be calling this function every 1 second in a setInterval, so as well as the logic, we also want to display this logic to the user. 
  document.querySelector('.count').innerHTML = `${displayHours}:${displayMinutes}:${displaySeconds}:${displayMilliSeconds}`;
}


// function that begins the recurring calling of stopWatch
function startClock(){
  interval = setInterval(stopWatch, 100); 
}


// function that stops the recurring calling of stopWatch. timer continues as it was when restarted bcos the seconds,minutes,hours variables still have values saved. 
function stopClock(){
  clearInterval(interval);
}

btns.forEach(button => {
  button.addEventListener('click', () => {
    if(button === btns[0]){
      button.classList.toggle('hide');   // hide start btn
      btns[1].classList.toggle('hide');   // show stop btn
      stopWatch();
      startClock();
    } else if(button === btns[1]){
      button.classList.toggle('hide');    // show start btn
      btns[0].classList.toggle('hide');    // hide stop btn
      stopClock();
    } else if(button === btns[2]){   // reset all variables
      milliSeconds = 0;
      seconds = 0;  
      minutes = 0;
      hours = 0;
      displayMilliSeconds = 0;
      displaySeconds = 0;
      displayMinutes = 0;
      displayMinutes = 0;
      document.querySelector('.count').innerHTML = `00:00:00:0`;
    }
  });
});