const events = [];

function openModal() {
  const modal = document.getElementsByClassName("modal")[0];

  modal.className = "modal modal--shown";
}

function closeModal() {
  const modal = document.getElementsByClassName("modal")[0];

  modal.className = "modal modal--shown modal--disappearing";
  setTimeout(() => {
    modal.className = "modal";
  }, 200);
}

window.onclick = (event) => {
  const modal = document.getElementsByClassName("modal")[0];
  if (event.target === modal) {
    closeModal();
  }
}

function addEvent(e) {
  e.preventDefault();
  const eventName = document.getElementsByName("eventname")[0].value;
  const eventDate = document.getElementsByName("eventdate")[0].value; 
  const eventTime = document.getElementsByName("eventtime")[0].value;

  const eventsDiv = document.getElementsByClassName("events")[0];

  const div = createEvent(eventName, eventDate, eventTime);
  eventsDiv.appendChild(div);
  events.push(div);
  if(window.screen.width < 1200) {
    closeModal();
  }  
  return false;
}

function createEvent(eventName, eventDate, eventTime) {
  eventTime = eventTime ? eventTime : "00:00";
  const eventDiv = createDiv("div", "event");
  const eventHeader = createDiv("div", "event__header");
  const eventTarget = createDiv("div", "event__target");
  const eventCountdown = createDiv("div", "event__countdown");

  const headerName = createDiv("span", "event__header-name");
  headerName.textContent = eventName;
  
  const eventDelete = createDiv("span", "event__delete");
  eventDelete.textContent = "Delete ";
  
  const deleteIcon = createDiv("i", "fas fa-trash");
  eventDelete.appendChild(deleteIcon);

  eventDelete.addEventListener("click", deleteEventDiv);

  eventHeader.appendChild(headerName);
  eventHeader.appendChild(eventDelete);
  eventDiv.appendChild(eventHeader);

  eventTarget.textContent = eventDate + ", " + eventTime;
  eventDiv.appendChild(eventTarget);

  const remainingTime = getTimeLeft(eventDate, eventTime);
  const parsedRemainingTime = parseTimeLeft(remainingTime);
  const timeText = ["Days", "Hours", "Minutes", "Seconds"];

  for(let i = 0; i < 4; i++) {
    const countdown = createDiv("div", "countdown");
    const countdownBox = createDiv("div", "countdown__box");

    countdown.textContent = timeText[i];
    countdownBox.textContent = parsedRemainingTime[i];
    countdown.appendChild(countdownBox);
    eventCountdown.appendChild(countdown);
  }

  eventDiv.appendChild(eventCountdown);
  return eventDiv;
}

function createDiv(element, elementClass) {
  const ele = document.createElement(element);
  ele.className = elementClass;

  return ele;
}

function getTimeLeft(date, time) {
  let year, month, day, hour, minute;
  [year, month, day] = date.split("-");
  [hour, minute] = time.split(":");
  month = parseInt(month) - 1;
  const targetDate = new Date(year, month, day, hour, minute);
  const currentDate = new Date();
  const timeLeft = targetDate - currentDate;

  return timeLeft < 0 ? 0 : timeLeft;
}

function parseTimeLeft(time) {
  const days = Math.floor(time / 86400000);
  const daysRemainder = time % 86400000;
  const hours = Math.floor(daysRemainder / 3600000);
  const hoursRemainder = daysRemainder % 3600000;
  const minutes = Math.floor(hoursRemainder / 60000);
  const minutesRemainder = hoursRemainder % 60000;
  const seconds = ~~(minutesRemainder / 1000);

  const timeLeft = [days, hours, minutes, seconds];
  return timeLeft;
}

function countdownEvents() {
  if(events.length <= 0) return false;
  events.forEach((event, index) => {
    const targetTime = event.querySelector(".event__target").textContent;
    const [date, time] = targetTime.split(", ");
    const timeLeft = getTimeLeft(date, time);
    const parsedTimeLeft = parseTimeLeft(timeLeft);
    const countdown = event.querySelectorAll(".countdown__box");
    countdown.forEach((box, index) => {
      box.textContent = parsedTimeLeft[index];
    })
    if(Object.values(parsedTimeLeft).every((val) => val === 0)) {
      alert("Event Reached");
      events.splice(index, 1);
    }
  })
}

function deleteEventDiv(event) {
  const eventDiv = event.target.closest(".event")
  const eventParent = eventDiv.parentNode;
  eventDiv.className = "event event--deleting"
  setTimeout(() => {
    eventParent.removeChild(eventDiv);
  }, 500);
}

const cdEvents = setInterval(countdownEvents, 1000);