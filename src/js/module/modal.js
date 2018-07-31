// modal：モーダル判定
//        scrollNoneによりモーダル表示中スクロール無効

import scrollNone from "./scrollNone";
export default function modal() {
  var $modalCont = $('.js-modal');
  var $modalOpen = $('.js-modalOpen');
  var $modalClose = $('.js-modalClose');

  if(!($modalCont[0])) return;

  $modalOpen.on('click', function(event) {
    if($('body').hasClass('is-sp')) {
      $modalCont.addClass('is-open');
    }else {
      $modalCont.fadeIn(400);
    }
    scrollNone();
  });
  $modalClose.on('click', function(event) {
    if($('body').hasClass('is-sp')) {
      $modalCont.removeClass('is-open');
    }else {
      $modalCont.fadeOut(400);
    }
    scrollNone();
  });
}