// scrollNone：画面固定

export default function scrollNone() {
  if($('body').hasClass('fixed')) {
    var scrollpos = $('body').attr('data-scrollpos') || 0;
    $('body').removeClass('fixed').css({'top': 0});
    window.scrollTo( 0 , scrollpos );

  }else {
    // scroll固定
    var scrollpos = $(window).scrollTop();
    $('body').addClass('fixed').css({'top': - scrollpos}).attr('data-scrollpos', scrollpos);

  }
}