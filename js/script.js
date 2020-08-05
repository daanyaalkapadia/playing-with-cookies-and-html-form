var key = 'secret';
function checkCookiesForLogin(){
  var username,password,expDate;
  var nowDate = new Date();
  var cookieArr = document.cookie.split(";");
  for(var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if("expires" == cookiePair[0].trim()){
      expDate = new Date(cookiePair[1]);
    }else if("username" == cookiePair[0].trim()) {
      var username = CryptoJS.AES.decrypt(cookiePair[1], key).toString(CryptoJS.enc.Utf8);
    }else if("password" == cookiePair[0].trim()) {
      var password = CryptoJS.AES.decrypt(cookiePair[1], key).toString(CryptoJS.enc.Utf8);
    }
  }if(nowDate < expDate){
    if(username == "LTI" && password == "123"){
      window.location="welcome.html";
      return false;
    }
  }
}
function submitted(){
  const cb = document.getElementById('rm');
  var username = document.login.username.value;
  var password = document.login.password.value;
  var now = new Date();
  now.setDate(now.getDate() + 1);
  if(username == "LTI" && password == "123"){
    //var enUsername = CryptoJS.AES.encrypt(username, key);
    document.cookie = "username=" + CryptoJS.AES.encrypt(username, key);
    if(cb.checked == true){
      //var enPassword = CryptoJS.AES.encrypt(password, key);
      document.cookie = "password=" + CryptoJS.AES.encrypt(password, key);
    }
    document.cookie = "expires=" + now.toUTCString();
    window.location="welcome.html";
    return false;
  }else{
    document.getElementById('errorMsg').innerHTML='<p id="msg">Invalid Username/Password. Try again!</p>';
    return false;
  }
}
function getUserName(){
  var cookieArr = document.cookie.split(";");
  for(var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if("username" == cookiePair[0].trim()) {
      var username = CryptoJS.AES.decrypt(cookiePair[1], key).toString(CryptoJS.enc.Utf8);
      document.getElementById("welcome").innerHTML = "Welcome Back, "+username;
    }
  }
}