
let user = JSON.parse(localStorage.getItem("users")) || [];
let countId = 1;
// let user = [];

function isDigit(event) {
  if (event.key < '0' || event.key > '9') {
    event.preventDefault();
  }
}

function isLetters(event) {
  if (!/[a-zA-Zא-ת]/.test(event.key)) {
    event.preventDefault();
  }
}

function isValidIsraeliID(id) {
  id = id.trim();
  if (id.length !== 9 || isNaN(id)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = Number(id[i]) * ((i % 2) + 1);
    if (num > 9) num -= 9;
    sum += num;
  }

  return sum % 10 === 0;
}

function checkForm() {
  let isValid = true;

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const id = document.getElementById("idInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const phone = document.getElementById("phoneNum").value.trim();

  // שם פרטי
  document.getElementById("warningLable1").className = firstName === "" ? "notTrue" : "labelHidd";
  isValid &= firstName !== "";

  // שם משפחה
  document.getElementById("warningLable2").className = lastName === "" ? "notTrue" : "labelHidd";
  isValid &= lastName !== "";

  // תעודת זהות
  document.getElementById("warningId").className = !isValidIsraeliID(id) ? "notTrue" : "labelHidd";
  isValid &= isValidIsraeliID(id);

  // סיסמה
  const passwordValid = password.length >= 8 && /^[A-Z]/.test(password);
  document.getElementById("warningPassword").className = passwordValid ? "labelHidd" : "notTrue";
  isValid &= passwordValid;

  // מייל
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  document.getElementById("warningEmail").className = emailValid ? "labelHidd" : "notTrue";
  isValid &= emailValid;

  // טלפון
  const phoneValid = phone.length === 10 && !isNaN(phone);
  document.getElementById("warningPhone").className = phoneValid ? "labelHidd" : "notTrue";
  isValid &= phoneValid;

  // הודעה כללית
  const msg = document.getElementById("message");
  if (isValid) {
    msg.className = "visitM";
    msg.innerText = "הטופס מאושר ✅";
    addUser();
  } else {
    msg.className = "notTrue";
    msg.innerText = "הטופס לא תקין ❌";
  }
}

function addUser() {

  user = JSON.parse(localStorage.getItem("users")) || [];

  let nextId = user.length > 0
  ? Math.max(...user.map(u => Number(u.id))) + 1
  : 1;


  let newUser = {
    id: nextId,
    FirstName: document.getElementById("firstName").value,
    LastName: document.getElementById("lastName").value,
    password: document.getElementById("passwordInput").value,
    mail: document.getElementById("emailInput").value,
    phone: document.getElementById("phoneNum").value
  };

  user = JSON.parse(localStorage.getItem("users")) || [];


  user.push(newUser);

  localStorage.setItem("id_thisUser", newUser.id);
  localStorage.setItem("users", JSON.stringify(user));

  window.location.href = "calender.html";
}

document.getElementById("logoutBtn").addEventListener("click", function () {
  
  // מעבר לדף התחברות
  window.location.href = "Login.html";
});