console.log("hello world");
$(document).ready(function(){
  $('.js--waypoint-1').waypoint(function(direction){
        $('.js--waypoint-1').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
});

$(function(){
  smoothScroll(1000);
});

function smoothScroll (duration) {
  $('a[href^="#"]').on('click', function(event){
    var target = $ ( $(this).attr('href') );
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, duration);
    }
  });
}
