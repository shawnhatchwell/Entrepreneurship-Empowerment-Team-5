
/* Slideshow Script */
var slideIndex = 1;
show();

function nextSlide(n) {
    show(slideIndex += n);
}

function currentSlide(n) {
    show(slideIndex = n);
}

function show(n) {
    var index;
    var slides = document.getElementsByClassName("mySlides")
    var dots = document.getElementsByClassName("dot");
    
    if(n > slides.length) {
        slideIndex = 1;
    }
    
    if(n < 1) {
        slideIndex = slides.length;
    }
    
    for(index = 0; index < slides.length; index++) {
        slides[index].style.display = "none";
    }
    
    for(index = 0; index < dots.length; index++) {
        dots[index].className = dots[index].className.replace(" active","");
    }
    
    slides[slideIndex-1].style.display = "block"; 
    dots[slideIndex-1].className += " active";
}

/* Login Script */

var modal = document.getElementById('login');

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}