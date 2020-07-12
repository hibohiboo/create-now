(function(){
  var cp = tyrano.plugin.kag.tag.chara_ptext;
  var start = cp.start;
  cp.start = function(pm){
    
    if (TYRANO.kag.stat.autoTargetZIndex !== false && pm.name != "" && this.kag.stat.charas[pm.name]){
      var charas = $('#tyrano_base .tyrano_chara');
      var zIndexes = [];
      charas.sort(function(a, b){
        return parseInt($(a).css('z-index')) - parseInt($(b).css('z-index'));
      });
      charas.each(function(){
        var z = parseInt($(this).css('z-index'));
        //z-indexが同じ場合があるので、その場合増やす
        if(zIndexes.length > 0 && z <= zIndexes[zIndexes.length - 1]) z = zIndexes[zIndexes.length - 1] + 1;
        zIndexes.push(z);
      });
      var i = 0;
      charas.each(function(){
        if($(this).hasClass(pm.name)){
          $(this).css('z-index', zIndexes[zIndexes.length - 1]);
        }else{
          $(this).css('z-index', zIndexes[i]);
          i++;
        }
      });
    }
    start.call(this, pm);
  };

})();