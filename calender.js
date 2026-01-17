let indexMonth = 1;
let thisDate = new Date();
currentMonth = thisDate.getMonth() + 1;

let arrNameOfMonth = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
let arrNumDayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let arrOfFirstDayOfMonth = [4, 7, 7, 3, 5, 1, 3, 6, 2, 4, 7, 2];
let arrDaysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let table = document.getElementById("calender");
let s = new String("01" + "/" + currentMonth + "/2025");
let indexOfDays = 1;
let firstDayOfMonth = new Date(s);

eventArr = JSON.parse(localStorage.getItem("events")) || [];
let currentId = localStorage.getItem("id_thisUser");
let myEvents = eventArr.filter(e => String(e.id) == String(currentId));

function loadId() {
  const today = new Date(); 

  document.getElementById("month").innerText = arrNameOfMonth[today.getMonth()];
  document.getElementById("year").innerText = today.getFullYear();
  document.getElementById("day").innerText = today.getDate();
  document.getElementById("dayWord").innerText = arrDaysName[today.getDay()];

  thisDate = new Date();
  currentMonth = thisDate.getMonth() + 1;
  funcMonth(currentMonth); 
}

function funcMonth(currentMonth) {
  eventArr = JSON.parse(localStorage.getItem("events")) || [];
  myEvents = eventArr.filter(e => String(e.id) == String(currentId));

  table = document.getElementById("calender");
  s = new String("2025-" + currentMonth + "-01");
  indexOfDays = 1;
  firstDayOfMonth = new Date(s);

  document.getElementById("thisMonth").innerText = currentMonth;

  for (let i = 0; i < arrNameOfMonth.length; i++) {
    if (currentMonth - 1 == i) {
      document.getElementById("thisMonthName").innerText = arrNameOfMonth[i];
    }
  }

  for (let i = 0; i < arrNumDayOfMonth.length; i++) {
    if (currentMonth - 1 == i) {
      document.getElementById("thisCountDay").innerText = arrNumDayOfMonth[i];
    }
  }

  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    for (let j = 0; j < row.cells.length; j++) {
      row.cells[j].className = "";
      row.cells[j].innerText = "";
    }
  }

  let FirstRow = table.rows[1];
  for (let i = FirstRow.cells.length - 1 - (arrOfFirstDayOfMonth[currentMonth - 1] - 1); i >= 0; i--) {
    FirstRow.cells[i].innerText = indexOfDays;
    indexOfDays++;
  }

  for (let i = 2; i < table.rows.length; i++) {
    let row2 = table.rows[i];
    for (let j = row2.cells.length - 1; j >= 0; j--) {
      if (indexOfDays <= arrNumDayOfMonth[currentMonth - 1]) {
        row2.cells[j].innerText = indexOfDays;
        indexOfDays++;
      }
    }
  }

  indexOfDays = 1;
  for (let e = 0; e < myEvents.length; e++) {
    let eventDate = new Date(myEvents[e].eventDate);

    for (let i = 1; i < table.rows.length; i++) {
      let row = table.rows[i];
      for (let j = 0; j < row.cells.length; j++) {
        if (row.cells[j].innerText) {
          let thisD = new Date(2025, currentMonth - 1, row.cells[j].innerText);

          if (
            thisD.getFullYear() === eventDate.getFullYear() &&
            thisD.getMonth() === eventDate.getMonth() &&
            thisD.getDate() === eventDate.getDate()
          ) {
            row.cells[j].className = "dateWthEvent";
          }

          const today = new Date();
          if (
            thisD.getFullYear() === today.getFullYear() &&
            thisD.getMonth() === today.getMonth() &&
            thisD.getDate() === today.getDate()
          ) {
            row.cells[j].className = "thisDate";
          }
        }
      }
    }
  }
}

function funcMonthBefor() {
  if (currentMonth > 1) {
    currentMonth--;
    funcMonth(currentMonth);
  }
}

function funcMonthAfter() {
  if (currentMonth < 12) {
    currentMonth++;
    funcMonth(currentMonth);
  }
}

function funcPresentEvent(td) {
  document.getElementById("divWithEventDate").innerHTML = "";
  let count = 0;

  for (let e = 0; e < myEvents.length; e++) {
    let tdDate = new Date(2025, currentMonth - 1, td.innerText);
    let Edate = new Date(myEvents[e].eventDate);

    if (
      Edate.getDate() == tdDate.getDate() &&
      Edate.getMonth() == tdDate.getMonth() &&
      Edate.getFullYear() == tdDate.getFullYear()
    ) {
      count++;

      let eventDate = document.createElement("p");
      eventDate.innerText = myEvents[e].eventDate;
      let title = document.createElement("p");
      title.innerText = myEvents[e].title;
      let start = document.createElement("p");
      start.innerText = myEvents[e].start;
      let finish = document.createElement("p");
      finish.innerText = myEvents[e].finish;
      let describe = document.createElement("p");
      describe.innerText = myEvents[e].describe;
      let time1 = document.createElement("p");
      time1.innerText="זמן התחלה משוער:"
      let time2 = document.createElement("p");
      time2.innerText="זמן סיום משוער:"

      if (count == 1) {
        document.getElementById("divWithEventDate").appendChild(eventDate);
      }

      document.getElementById("divWithEventDate").appendChild(title);
      document.getElementById("divWithEventDate").appendChild(time1);
      document.getElementById("divWithEventDate").appendChild(start);
      document.getElementById("divWithEventDate").appendChild(time2);
      document.getElementById("divWithEventDate").appendChild(finish);
      document.getElementById("divWithEventDate").appendChild(describe);
    }
  }

  if (count == 0) {
    let text1 = document.createElement("p");
    text1.innerText = "לא נמצא ארוע בתאריך המבוקש";
    let button = document.createElement("button");
    button.innerText = "להוספת ארוע לחץ כאן";
    button.type = "button";
    button.onclick = funcEventPage;

    document.getElementById("divWithEventDate").appendChild(text1);
    document.getElementById("divWithEventDate").appendChild(button);
  }
}

function funcEventPage() {
  window.location.href = "event.html";
}

function funcSearchEvent() {
  window.location.href = "searchEvent.html";
}

function funcCalender()
{
  window.location.href = "Login.html";
}
