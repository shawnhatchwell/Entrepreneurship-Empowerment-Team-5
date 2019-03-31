function onPageLoad(googleUser){
  try {
      var profile=googleUser.getBasicProfile();
}
catch(e) {
  console.log("this is null my man");
}
}
window.onload=onPageLoad;

function onSignIn(googleUser){
  var profile=googleUser.getBasicProfile();
  $(".g-signin2").css("display","none");
  $(".data").css("display","block");
  console.log(profile.getEmail());
  $("#pic").attr('src',profile.getImageUrl());
  $("#email").text(profile.getEmail());
}

function signOut(googleUser){
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function(){
    alert("You have been signed out :)");
    $(".g-signin2").css("display","block");
    $(".data").css("display","none");
  })
}
