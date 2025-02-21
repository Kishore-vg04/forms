var username = ["student", "coordinator", "hod", "warden"];
var password = ["student", "coordinator", "hod", "warden"];
var pages = ["student.html", "coordinator.html", "hod.html", "warden.html"];

function validate(event) {        
    var name = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var index = username.indexOf(name);
    if (password[index] === pass) {
        window.open(pages[index], "_blank"); // Opens in a new tab
    } else {
        alert("Invalid Username or Password!");
    }
}