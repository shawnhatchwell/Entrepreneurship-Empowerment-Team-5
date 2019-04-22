
function onSubmitPass(){
  var pass = document.getElementById("pass").value;
  console.log(pass);
  if (pass == "spoderMan245"){
    $(".col-lg-2").css("display","block");
    $(".col-lg-1").css("display","block");
    $(".col-lg-3").css("display","block");
    $(".tableWrapper").css("display","block");
    $(".button").css("display","block");
    $(".emailbody").css("display","block");
    $(".adminpass").css("display","none");
    alert("Correct Password!");
  }
  else{
    alert("WRONG!!!");
  }
}
