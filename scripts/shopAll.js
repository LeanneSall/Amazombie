// Hides cards as soon as screen width hits 767px
function myFunction(x) {
    if (x.matches) { // If media query matches
      $(".item-showcase").hide();
    } else {
      $(".item-showcase").show();
    }
  }

var x = window.matchMedia("(max-width: 767px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

// Toggles cards
$(".showcase-btn").on("click", function(){
    // $(".item-showcase").slideToggle();
    var clicked      = this.id;
    var hidden         = $(`#showcase-${clicked}`);
  
    hidden.slideToggle();
  })
  