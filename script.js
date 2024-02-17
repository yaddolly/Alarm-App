function setTimer(e) {
    e.preventDefault();
  
    check();
  
    const timerInfo = document.createElement("div");
    timerInfo.classList.add("timer-info");
  
    const div = document.createElement("div");
    const timeLeftPara = document.createElement("p");
    timeLeftPara.innerText = "Time Left :";
    div.appendChild(timeLeftPara);
  
    const activeDisplay = document.createElement("div");
    activeDisplay.classList.add("active-time-display");
  
    const hourDisplay = document.createElement("p");
    hourDisplay.classList.add("hour-display");
    hourDisplay.innerText = form.hours.value.trim();
  
    const minutesDisplay = document.createElement("p");
    minutesDisplay.classList.add("minute-display");
    minutesDisplay.innerText = form.minutes.value.trim();
  
    const secondsDisplay = document.createElement("p");
    secondsDisplay.classList.add("second-display");
    secondsDisplay.innerText = form.seconds.value.trim();
  
    const p1 = document.createElement("p");
    p1.innerText = ":";
    const p2 = document.createElement("p");
    p2.innerText = ":";
  
    activeDisplay.appendChild(hourDisplay);
    activeDisplay.appendChild(p1);
    activeDisplay.appendChild(minutesDisplay);
    activeDisplay.appendChild(p2);
    activeDisplay.appendChild(secondsDisplay);
  
    const deleteDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", (e) => {
      e.target.parentNode.parentNode.remove();
      check();
    });
  
    deleteDiv.append(deleteBtn);
    timerInfo.appendChild(div);
    timerInfo.appendChild(activeDisplay);
    timerInfo.appendChild(deleteDiv);
  
    activeTimers.appendChild(timerInfo);
  
    form.reset();
    countdown(hourDisplay, minutesDisplay, secondsDisplay);
  }
  
  function countdown(hourDisplay, minuteDisplay, secondDisplay) {
    let hours = parseInt(hourDisplay.innerText);
    let minutes = parseInt(minuteDisplay.innerText);
    let seconds = parseInt(secondDisplay.innerText);
  
    const interval = setInterval(() => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        alertSound.play();
        clearInterval(interval);
        setTimeout(() => {
          hourDisplay.parentNode.parentNode.remove();
        }, 4000);
        return;
      }
  
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours !== 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
  
      hourDisplay.innerText = padZero(hours);
      minuteDisplay.innerText = padZero(minutes);
      secondDisplay.innerText = padZero(seconds);
    }, 1000);
  }
  
  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  
  function check() {
    if (activeTimers.innerHTML === "You have no timers currently!") {
      activeTimers.innerHTML = "";
    } else if (activeTimers.innerHTML === "") {
      activeTimers.innerHTML = "You have no timers currently!";
    }
  }
  
  const form = document.querySelector("#form");
  form.addEventListener("submit", setTimer);
  const activeTimers = document.querySelector(".active-timer");
  const alertSound = new Audio("assets/alert.mp3");