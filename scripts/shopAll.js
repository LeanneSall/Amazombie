// Hides cards as soon as screen width hits 767px
function myFunction(x) {
    if (x.matches) { // If media query matches
      $(".tier-description").hide();
    } else {
      $(".tier-description").show();
    }
  }

var x = window.matchMedia("(max-width: 767px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

// Toggles cards
$(".more").on("click", function(){
    var clicked      = this.id;
    var hidden         = $(`#desc${clicked}`);
  
    hidden.slideToggle();
  })

// JavaScript Document
$(document).ready(function() {
  $('.autoWidth').lightSlider({
      autoWidth:true,
      loop:true,
      onSliderLoad: function() {
          $('.autoWidth').removeClass('cS-hidden');
      } 
  });  
});