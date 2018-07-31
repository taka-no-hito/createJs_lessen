// headerCurrent：urlと「js-currentLink」内のhrefを比較し、
//                現在のページには「is_current」を付与

export default function headerCurrent() {
  var $currentLink = $('.js-currentLink');

  if(!($currentLink[0])) return;

  var splitNum = 1;
  var currntUrl = location.pathname.split("/")[splitNum];
  $currentLink.each(function() {
    var thisUrl = $(this).attr('href').split("/")[splitNum];
    if(currntUrl == thisUrl) {
      $(this).addClass('is-current')
    }
  });
}