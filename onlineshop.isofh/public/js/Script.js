// var slideIndex;
// showSlides(slideIndex = 1);
// showSlidesCustom(slideIndex = 0)

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlidesCustom(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
//   slides[slideIndex-1].style.display = "block";  
// }
// function showSlidesCustom() {
//   var i;
//   var slides = document.getElementsByClassName("mySlidesNew");
//   var dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//      slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" activeDot", "");
//   }

//   slides[slideIndex].style.display = "block";  
//   dots[slideIndex].className += " activeDot";
//   slideIndex++;
//   if (slideIndex > slides.length - 1) {
//     slideIndex = 0
//   }    
//   setTimeout(showSlidesCustom, 5000);
// }
// function openNav() {
//   var screen767 = document.getElementById("panel");
//   screen767.classList.remove("topnav");
//   document.getElementById("panel").style.width = "250px";
//   document.getElementById("panel").style.height = "100%";
//   document.getElementById("panel").style.display="block";
//   setTimeout(function(){ 
//   document.getElementById("closebtn").style.display="block";
//   }, 300);
//   document.getElementById("panel").style.transition = "all 0.5s ease 0s"
// }

// function closeNav() {
//   var screen767 = document.getElementById("panel");
//   screen767.classList.add("topnav");
//   document.getElementById("closebtn").style.display="none";
//   document.getElementById("panel").style.transition="all 0.5s ease 0s";
// }