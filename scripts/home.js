// ICON + HAMBURGER
const nav = document.querySelector('nav');

document.getElementById('icon').addEventListener('click', (e) => {
    (e.target.classList);

    if(e.target.classList.contains('active')){
        e.target.classList.remove('active');
        nav.classList.remove('active');
    }else{
        e.target.classList.add('active');
        nav.classList.add('active');
    }
});

// INIT COUNTDOWN
function handleTickInit(tick) {
    Tick.count.down('2020' + '-12-1').onupdate = function(value) {
        tick.value = value;
    };
}

// START CAROUSEL
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);
// const currentSlide = track.querySelector('.current-slide');
const carousel = document.querySelector('.carousel');

var isHover = false;

let slideWidth = slides[0].getBoundingClientRect().width;

window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    const currentSlide = track.querySelector('.current-slide');
    slides.forEach(setSlidePosition);
    setTrackPosition(currentSlide, track);

});

// Auto scrolling 
var count = 0;
setInterval(() =>{
    // Only auto scroll if user is not hovering over carousel
    if (!isHover){
    count += 0.5;}

    if (count > 2.5){
        count = 0;
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        
        if (nextSlide == null)  nextSlide = slides[0];
        const currentDot = dotsNav.querySelector('.current-slide');
        let nextDot = currentDot.nextElementSibling;
        if (nextDot == null) nextDot = dots[0];
    
        moveToSlide(track, currentSlide, nextSlide)
        updateDots(currentDot, nextDot);
    }
},500);

// Turn off auto scroll if hovering on carousel
carousel.addEventListener('mouseover', () => {
    isHover = true
});

carousel.addEventListener('mouseleave', () => {
    isHover = false
})

const setTrackPosition = (slide, track) => {
    track.style.transform = `translateX(-${slide.style.left})`;
}

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
    console.log('fired');
};
// arrange the slides next to one another
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}


//when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    //move the slide
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;

    if (prevSlide == null) prevSlide = slides[slides.length - 1];
    const currentDot = dotsNav.querySelector('.current-slide');
    let prevDot = currentDot.previousElementSibling;

    if (prevDot == null) {
        prevDot = dots[dots.length - 1];
    }

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot);
    count = 0;
});

//when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    //move the slide
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;

    
    if (nextSlide == null)  nextSlide = slides[0];
    const currentDot = dotsNav.querySelector('.current-slide');
    let nextDot = currentDot.nextElementSibling;
    if (nextDot == null) nextDot = dots[0];

    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDot);
    count = 0;
});

//when I click the nav indicators, move to that slide 
dotsNav.addEventListener('click', e => {
    // what indicator was clicked on
    const targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    count = 0;
});
