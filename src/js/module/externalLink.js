// externalLink：別ページからのページ内リンク

export default function externalLink() {
    var speed = 400;
    var margin = 50;
    var headerHeight = $('header').innerHeight() + margin;
    var url = $(location).attr('href');
    if(url.indexOf("?id=") != -1){
      var id = url.split("?id=");
      console.log(id[0]);
      var $target = $('#' + id[id.length - 1]);
      if($target.length){
        var position = $target.offset().top - headerHeight;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        history.replaceState('','',id[0]);
        return false;
      }
    }
  }