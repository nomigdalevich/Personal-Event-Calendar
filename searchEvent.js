let eventArr = JSON.parse(localStorage.getItem("events")) || [];

let currentId = localStorage.getItem("id_thisUser");
//מערך פילטר זה בעצם כמו מעבר על מערך וסינון לפי תנאי מסוים - התנאי בתוך הסוגריים
let myEvents = eventArr.filter(e => String(e.id) == String(currentId));
// let myEvents = eventArr;


let isCreateTh;
let isFindEvent;
let tableEvent;

JSON.parse(localStorage.getItem("events"))[0]


function funcSearch() {
  tableEvent = null;
  isCreateTh = false;
  isFindEvent = false;

  document.getElementById("playEvent").innerHTML = "";

  let dateE = document.getElementById("dateS").value;
  let titlE = document.getElementById("titleS").value;
  let descE = document.getElementById("desS").value;

  for (let i = 0; i < myEvents.length; i++) {
    let isDateMatch = false;
    let isTitleMatch = false;
    let isDescMatch = false;

    
    if (dateE) {
      let DateInput = new Date(dateE);
      let dateEvent = new Date(myEvents[i].eventDate);

      isDateMatch =
        DateInput.getDate() === dateEvent.getDate() &&
        DateInput.getMonth() === dateEvent.getMonth() &&
        DateInput.getFullYear() === dateEvent.getFullYear();
    }

    
    if (titlE) {
      isTitleMatch = myEvents[i].title.includes(titlE);
    }

    if (descE) {
      isDescMatch = myEvents[i].describe.includes(descE);
    }

    //אם אחד מהדברים קיים בארוע הנוכחי
    if (isDateMatch || isTitleMatch || isDescMatch) {
      isFindEvent = true;

      if (!isCreateTh) {
        isCreateTh = true;

        tableEvent = document.createElement("table");
        tableEvent.className = "resultsTable";

        let trE = document.createElement("tr");
        let td1 = document.createElement("th");
        let td2 = document.createElement("th");
        let td3 = document.createElement("th");

        td1.innerText = "תאריך";
        td2.innerText = "כותרת";
        td3.innerText = "תיאור";

        trE.appendChild(td1);
        trE.appendChild(td2);
        trE.appendChild(td3);

        tableEvent.appendChild(trE);
        document.getElementById("playEvent").appendChild(tableEvent);
      }

      if (!tableEvent) {
        tableEvent = document.querySelector(".resultsTable");
      }

      let newTr = document.createElement("tr");
      let newTd1 = document.createElement("td");
      let newTd2 = document.createElement("td");
      let newTd3 = document.createElement("td");

      newTd1.innerText = myEvents[i].eventDate;
      newTd2.innerText = myEvents[i].title;
      newTd3.innerText = myEvents[i].describe;

      newTr.appendChild(newTd1);
      newTr.appendChild(newTd2);
      newTr.appendChild(newTd3);
      tableEvent.appendChild(newTr);
    }
  }

  //אם לא מצאנו ארוע, תציג הודעה
  if (!isFindEvent) {
    const p = document.createElement("p");
    p.innerText = "לא נמצאו תוצאות התואמות לחיפוש שלך.";
    document.getElementById("playEvent").appendChild(p);
  }
}
function funcCl(){
 
      // מעבר לדף התחברות
  window.location.href = "calender.html";

}

/**/ 
