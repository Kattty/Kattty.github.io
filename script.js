// UP-button               
$(function() {
// при нажатии на кнопку scrollup
$('.scrollup').click(function() {
// переместиться в верхнюю часть страницы
$("html, body").animate({
    scrollTop:0
 },1000);
})
})
// при прокрутке окна (window)
$(window).scroll(function() {
// если пользователь прокрутил страницу более чем на 200px
if ($(this).scrollTop()>200) {
// то сделать кнопку scrollup видимой
$('.scrollup').fadeIn();
}
// иначе скрыть кнопку scrollup
else {
$('.scrollup').fadeOut();
}
});

// CALLERY
function onClick(element){
    document.getElementById("img01").src=element.src;
    
    document.getElementById("myModal").style.display = "block";
}    

        
        
//   NAV_BAR     
       function myFunctionNavBar() {
  var x = document.getElementById("myNavBar");
  if (x.className === "nav-bar") {
    x.className += " responsive";
  } else {
    x.className = "nav-bar";
  }
}