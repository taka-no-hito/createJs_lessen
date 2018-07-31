// deviceJudge：bodyにis_pc or is_spクラスどちらかを付与
//              また、tab対応エリアではis_tabも追加で付与

export default function deviceJudge() {
  var spBreakpoint = 767;
  var tabBreakpoint = 1024;
  _init();
  // リサイズ時に実行
  $(window).resize(function() {
    _init();
  });

  function _init() {
    if($(window).width() <= spBreakpoint) {
      // spエリア
      $('body').addClass('is-sp')
               .removeClass('is-pc is-tab');
    } else if($(window).width() <= tabBreakpoint && spBreakpoint < $(window).width()) {
      // tabエリア
      $('body').addClass('is-tab')
               .removeClass('is-sp is-pc');
    } else {
      // pcエリア
      $('body').addClass('is-pc')
               .removeClass('is-tab is-sp');
    }
  }
}