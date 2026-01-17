//שליפת הid של המשתמש מהlocalStorage
  let id = localStorage.getItem("id_thisUser")

  // טוען את המשתמשים הקיימים מה-localStorage, או יוצר מערך ריק אם אין
  let eventArr = JSON.parse(localStorage.getItem("events")) || [];

if (document.getElementById("title")) {

  // אם זו הפעם הראשונה ואין עדיין משתמשים — מוסיפים את ברירת המחדל שלך
  if (eventArr.length === 0) {
    eventArr.push({
      id: 1,
      eventI: 100 + eventArr.length,
      title: "חתונה",
      eventDate: "2025-06-29",
      start: "16:00",
      finish: "01:00",
      describe: "חתונה של חנה!!",
    });
    localStorage.setItem("events", JSON.stringify(eventArr));
  }

  let indexOfEvent = 0;

  document.getElementById("title").value = eventArr[indexOfEvent].title;
  document.getElementById("eventDate").value = eventArr[indexOfEvent].eventDate;
  document.getElementById("start").value = eventArr[indexOfEvent].start;
  document.getElementById("finish").value = eventArr[indexOfEvent].finish;
  document.getElementById("describe").value = eventArr[indexOfEvent].describe;

  localStorage.setItem("events", JSON.stringify(eventArr));


}
function funSave() {

  let id = localStorage.getItem("id_thisUser");

  let newAvent = {
    id: id,
    eventI: 100 + eventArr.length,
    title: document.getElementById("title").value,
    eventDate: document.getElementById("eventDate").value,
    start: document.getElementById("start").value,
    finish: document.getElementById("finish").value,
    describe: document.getElementById("describe").value,
  };

  eventArr.push(newAvent)

  localStorage.setItem("events", JSON.stringify(eventArr));

  document.getElementById("message").innerText = "הארוע התקבל בהצלחה"
}

function funCencel() {

  document.getElementById("message").innerText = "הארוע נמחק"

}
function returnToC()
{
      // מעבר לדף התחברות
  window.location.href = "calender.html";

}

/**/ 