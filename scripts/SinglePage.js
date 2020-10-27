// INIT COUNTDOWN
function handleTickInit(tick) {
    Tick.count.down('2020' + '-12-1').onupdate = function(value) {
        tick.value = value;
    };
}


document.getElementById("submitform").addEventListener('click', function(){
    document.querySelector(".form").reset();
    document.getElementById("thankyou").innerHTML = "Thank you for your review"
    
})