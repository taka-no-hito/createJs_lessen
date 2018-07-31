// smoothScroll：ページ内リンク

export default function smoothScroll(){
   $('a[href^="#"]').click(function() {
      var speed = 400;
      var margin = 10;
      var headerHeight = $('.header-wrapper').innerHeight() + margin;
      var href= $(this).attr("href");
      var $target = $(href == "#" || href == "" ? 'html' : href);
      var position = $target.offset().top - headerHeight;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
}