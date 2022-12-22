function f1() {
    var firstNameJS = document.getElementById("firstName").value;
    var lastNameJS = document.getElementById("lastName").value;
    var emailJS = document.getElementById("email").value;
    var registerNumberJS = document.getElementById("registerNumber").value;
    var passwordJS = document.getElementById("psw").value;
    var confirmPasswordJS = document.getElementById("confirmPassword").value;

    if (!firstNameJS || !lastNameJS || !emailJS || !registerNumberJS || !passwordJS || !confirmPasswordJS)
        alert("all fields are mandatory")
    else
        alert("Singup successfully");
}


var nameError = document.getElementById('name-error');
var lastNameError = document.getElementById('lastName-error');
var emailError = document.getElementById('email-error');
var registerNumberError = document.getElementById('registerNumber-error');
var passwordError = document.getElementById('password-error');
var confirmPasswordError = document.getElementById('confirmPassword-error');

function validateName() {

    var firstNameJS = document.getElementById("firstName").value;
    var nameMatch = /^[A-Za-z]+$/;

    if (firstNameJS.length == 0)
        nameError.innerHTML = "name contains only character don't give space";
    if (!firstNameJS.match(nameMatch))
        nameError.innerHTML = '<i style="color: red" class="fa-solid fa-circle-exclamation"></i>';
    else
        nameError.innerHTML = '<i style="color: seagreen" id="rightClick" class="fa-solid fa-circle-check"></i>';
}

function validateLastName() {

    var lastNameJS = document.getElementById("lastName").value;
    var nameMatch = /^[A-Za-z]+$/;

    if (lastNameJS.length == 0)
        lastNameError.innerHTML = "name contains only character don't give space";
    if (!lastNameJS.match(nameMatch))
        lastNameError.innerHTML = '<i style="color: red" class="fa-solid fa-circle-exclamation"></i>';
    else
        lastNameError.innerHTML = '<i style="color: seagreen" id="rightClick" class="fa-solid fa-circle-check"></i>';
}
function validateEmail() {

    var emailJS = document.getElementById("email").value;
    var nameMatch = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (emailJS.length == 0)
        emailError.innerHTML = "Enter EmailId";
    if (!emailJS.match(nameMatch))
        emailError.innerHTML = '<i style="color: red" class="fa-solid fa-circle-exclamation"></i>';
    else
        emailError.innerHTML = '<i style="color: seagreen" id="rightClick" class="fa-solid fa-circle-check"></i>';
}

function validateRegisterNumber() {

    var registerNumberJS = document.getElementById("registerNumber").value;

    var nameMatch = /[A-Z]{3}(\d{7})/;

    if (registerNumberJS.length == 0)
        registerNumberError.innerHTML = "Register Number example: REG1451234";
    if (!registerNumberJS.match(nameMatch) || registerNumberJS.length > 10)
        registerNumberError.innerHTML = '<i style="color: red" class="fa-solid fa-circle-exclamation"></i>';
    else
        registerNumberError.innerHTML = '<i style="color: seagreen" id="rightClick" class="fa-solid fa-circle-check"></i>';

}
function validatePassword() {


    var passwordJS = document.getElementById("psw").value;

    var nameMatch = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (passwordJS.length == 0)
        passwordError.innerHTML = "Must contain at least one number,one uppercase and lowercase letter, and at least 8 or more characters";
    if (!passwordJS.match(nameMatch))
        passwordError.innerHTML = '<i style="color: red" class="fa-solid fa-circle-exclamation"></i>';
    else
        passwordError.innerHTML = '<i style="color: seagreen" id="rightClick" class="fa-solid fa-circle-check"></i>';

    return true;
}
function validateConfirmPassword() {
    var passwordJS = document.getElementById("psw").value;
    var confirmPasswordJS = document.getElementById("confirmPassword").value;

    if (confirmPasswordJS.length == 0)
        confirmPasswordError.innerHTML = "both passwords should be same";
    if (passwordJS != confirmPasswordJS)
        confirmPasswordError.innerHTML = '<i style="color: red" class="fa-solid fa-circle-exclamation"></i>';
    else
        confirmPasswordError.innerHTML = '<i style="color: seagreen" id="rightClick" class="fa-solid fa-circle-check"></i>';
    return true;
}