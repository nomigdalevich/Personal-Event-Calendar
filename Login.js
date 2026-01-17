// טוען את המשתמשים הקיימים מה-localStorage, או יוצר מערך ריק אם אין
let user = JSON.parse(localStorage.getItem("users")) || [];

// אם זו הפעם הראשונה ואין עדיין משתמשים — מוסיפים את ברירת המחדל שלך
if (user.length === 0) {
  user.push({
    id: 1,
    FirstName: "נעמי",
    LastName: "גדלביץ",
    password: "N327738183",
    mail: "nomi@gmail.com",
    phone: "0583269495"
  });
  localStorage.setItem("users", JSON.stringify(user));
}

let countId=1
let count=0;


//פונקציה שעוברת על המערך ובודקת אם השם והסיסמה זהים לאוביקט במערך
function checkInArr()
{

    document.getElementById("notFindThisUser").innerHTML = "";

    let isFind=false;
    

    for(let i=0; i<user.length && !isFind; i++)
    {
        if(document.getElementById("name").value==user[i].FirstName+' '+user[i].LastName 
         && document.getElementById("password").value==user[i].password)
        {
            isFind=true; 
            localStorage.setItem("id_thisUser", user[i].id);      
        }
    }

    if(!isFind)
    {
        let note=document.createElement("label")
        note.innerText="משתמש לא קיים. אנא הירשם למערכת.";
        note.style.color=" #ff6b6b";

        // "⚠️ משתמש לא קיים. אנא הירשם למערכת.";
        document.getElementById("notFindThisUser").appendChild(note)  
        document.getElementById("notFindThisUser").style.display = "block";
     
    }

    else
    {
       enterPage()
    }

}

//במקרה שאין משתמש כזה נוצר כפתור חדש שבלחיצה עליו עוברים לדף הרישום
function formPage()
{
    window.location.href = "form.html";
}

//במקרה שקיים משתמש כזה אז הוא שולח לדף הכניסה
function enterPage()
{
    
    //console.log("הקוד שנשמר:",  user[i].id);
    window.location.href = "calender.html";

}

window.onload = function () {
  google.accounts.id.initialize({
  client_id: "899909944501-2vu3evihatkvloo5evm7s3te00ja3vc2.apps.googleusercontent.com",
  callback: handleCredentialResponse
});


  document.getElementById("googleLoginBtn").addEventListener("click", () => {
    google.accounts.id.prompt(); // פותח את חלון ההתחברות של גוגל
  });
};

function handleCredentialResponse(response) {
  const jwt = response.credential;
  console.log("JWT שהתקבל מ-Google:", jwt);

  // כאן את יכולה לעבור לעמוד אחר או לבצע כל פעולה שתרצי
  alert("התחברת בהצלחה עם Google!");
  window.location.href = "calender.html";
}
