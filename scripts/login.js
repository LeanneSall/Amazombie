
var totalCostJson = JSON.parse(localStorage.getItem('totalCost'))

if(totalCostJson) {

  document.querySelector('#cart-meta p').textContent = totalCostJson;
}


function myFunction() {
  var x = document.getElementById("my-password");
  var y = document.getElementById("hide-1");
  var z = document.getElementById("hide-2");

  if (x.type === "password") {
    x.type = "text";
    y.style.display = "block";
    z.style.display = "none";
  } else {
    x.type = "password";
    y.style.display = "none";
    z.style.display = "block";
  }
}