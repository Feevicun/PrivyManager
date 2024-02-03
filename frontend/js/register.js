function validateForm() {
  var password = document.getElementById('password').value;
  var repeatPassword = document.getElementById('repeatPassword').value;
  var passwordError = document.getElementById('passwordError');

  if (password !== repeatPassword) {
    passwordError.style.display = 'block';
    return false;
  } else {
    passwordError.style.display = 'none';
    return true;
  }
}


