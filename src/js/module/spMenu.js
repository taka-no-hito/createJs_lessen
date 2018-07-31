// spMenu：sp版メニューの開閉
//         scrollNoneによる画面固定

import scrollNone from "./scrollNone";
export default function spMenu() {
  var $spMenu = $('.js-menuSp');
  var $menuBtn = $('.js-menuSpBtn');

  if(!($spMenu[0])) return;

  $menuBtn.on('click', function() {
    $spMenu.toggleClass('is-open');
    $(this).toggleClass('is-open');
    scrollNone();
  });
}