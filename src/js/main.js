
// プラグインの呼び出し
// import "./libs/slick.min.js"


// モジュールの呼び出し
import smoothScroll from "./module/smoothScroll";
import deviceJudge from "./module/deviceJudge";
// import spMenu from "./module/spMenu";
// import externalLink from "./module/externalLink";
// import headerCurrent from "./module/headerCurrent";

// モジュールの実行
$(function(){
  // 全てのページで実行
  smoothScroll();                           //ページ内リンク
  deviceJudge();                            //device判定
  // spMenu();                                 //sp版メニュー
  // externalLink();                           //外部からの内部ページリンク
  // headerCurrent();                           //headerカレント表示

  //cssアニメーションバグ回避用
  $("body").removeClass("preload");

  // 特定ページでのみ実行
  if($('main#top').length) {
    // topのみで実行
  }
});

