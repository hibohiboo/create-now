        
/*
 #[depth_mod]
 :group
 レイヤ関連
 :title
 イメージの奥行を操作。
 :exp
 ゲーム画面に表示されているイメージとキャラ素材で重なりを操作できる。
 例えば通常、zindexが同一の場合、あとから追加した素材が前に表示されるが
 このプラグインを使用すると、最前面や再後面に配置できたりする。
 :sample
 
 [image layer=0 storage=myimg1.png name="myimg1" ]
 [image layer=0 storage=myimg2.png name="myimg2" ]
 [chara_show layer=0 name="akane"]
 
 ;akaneを最前面にもってくる
 [depth_mod layer=0 name="akane" depth="front" ]
 [p]

 ;akaneを一番うしろにもってくる
 [depth_mod layer=0 name="akane" depth="back" ]
 [p]
 
 
:param
name=画像やキャラのnameを指定してください。,
layer=nameで指定する素材が配置されているlayerを指定します。layerをまたいで変更することはできません。デフォルトは0です。,
page=fore・back を指定。表画面を対象とするか、裏画面を対象とするかを指定します。省略すると表ページとみなされます,
depth=対象をどの深さに表示するか指定できます。front（最前面） か back（最背面）を指定します。デフォルトはfront（最前面）。
 #[end]
*/
 
TYRANO.kag.ftag.master_tag.depth_mod = {
    
    kag: TYRANO.kag,
	vital : ["name"],
    	
    pm : {
        
        "layer":"0",
        "page":"fore",
        "name" : "",
        "depth":"front",
                
    },

    start : function(pm) {
        
        var that = this;
        
        //that.kag.layer.hideEventLayer();
        
        var target_layer = that.kag.layer.getLayer(pm.layer, pm.page);
        var array_obj = [];
        target_layer.find("img").each(function(e){
            
            var j_obj = $(this);
            
            //キャラの場合は一個上のレイヤにする。
            if(j_obj.hasClass("chara_img")){
                j_obj = j_obj.parent();
            }
            
            array_obj.push({"obj":j_obj,zindex:parseInt(j_obj.css("z-index"))});
            
        });
                
        var array_zindex = [];
        for(var i=0;i<array_obj.length;i++){
            var j_obj = array_obj[i].obj;
            if(j_obj.hasClass(pm.name)){
                array_zindex.push(j_obj);
            }
        }
        
        for(var i=0;i<array_zindex.length;i++){
            if(pm.depth=="back"){
                array_zindex[i].prependTo(target_layer);
            }else if(pm.depth=="front"){
                array_zindex[i].appendTo(target_layer);
            }
        }
        
        
        that.kag.ftag.nextOrder();
                
    }
    
}    
