 function cougarParallax() {
     scrollPos = $(this).scrollTop();
     $('#main').css({
         'background-position': '50% ' + (-scrollPos / 4) + "px"
     });
     $('#mainText').css({
         'margin-top': (scrollPos / 4) + "px",
         'opacity': 1 - (scrollPos / 300)
     });


     $('#styleBlock').css({
         'background-position': (-scrollPos / 4) + "px"
     });
     
 }
 $(document).ready(function () {
     $(window).scroll(function () {
         cougarParallax();
     });
 });