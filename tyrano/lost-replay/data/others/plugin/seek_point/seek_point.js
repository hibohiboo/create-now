
$.tobj = function(tag,pm){
        
    if(!pm){
        pm = {};
    }
    
    var tobj = {
        "tag":tag,
        "pm":pm    
    };
    
    return tobj
};


//シーク
(function(){
	
	
	if(TYRANO.kag.stat.f.load_seek_point){
		return false;
	}

    
    var scene = {
        "text":"",
        "bg":"",
        "chara":{},
        "chara_index":[],
        "images":{},
        "ptext":{},
        "bgm":"",
        "sheet_visible":false,
        "sheet_snap":{},
        "depth_cnt_down":10000,
        "depth_cnt_up":10000,
        "index":0,
        
        "theme_type":"",
        "sheet_snap":{}, //リプレイのシーク用に使う
        "sheet_visible":false,

    };
    
    
    var seek = {};
    var seek_index = 0;
    var CNT_SEP = 1;
    var cnt_p = 0;
    
    var start_index = -1; 
    
    var map_array_s = {};
    
    map_array_s["chara"] = TYRANO.kag.cache_scenario["./data/scenario/system/chara_define.ks"].array_s;
    map_array_s["scene1"] = TYRANO.kag.cache_scenario["./data/scenario/scene1.ks"].array_s;
    
    for(var key in map_array_s){
        
        var array_tag_obj = map_array_s[key];
        
        for(var i=0 ;i<array_tag_obj.length;i++){
            
            var tobj = array_tag_obj[i];
            
            var tag = tobj.name;
            var pm  = tobj.pm;
            
            scene["index"] = i;
            
            //タグによって処理分け
            //テキストの場合、バックログに追加
            if(tag=="text"){
                
                scene["text"] = pm.val;
                
            ////背景    
            }else if(tag=="bg"){
                
                scene["bg"] = pm.storage;
                
                ////キャラクター        
            }else if(tag=="chara_new"){
                
                var chara_name = pm.name;
                
                //表示と非表示の状況を設定
                if(!scene.chara[chara_name]){
                    scene.chara[chara_name] = {};
                }
                
            }else if(tag=="chara_show"){
                
                var chara_name = pm.name;
                
                if(scene.chara[chara_name]){
                    
                    //すでに重複するのがある場合は削除
                    scene.chara_index = scene.chara_index.filter(function(v, i) {
                        return (v !== chara_name);
                    });
                                        
                    scene.chara_index.push(chara_name);
                    
                    if(pm.depth=="back"){
                        scene.chara[chara_name]["_depth_cnt"] = --scene.depth_cnt_down;
                    }else{
                        scene.chara[chara_name]["_depth_cnt"] = ++scene.depth_cnt_up;
                    }
    
                    scene.chara[chara_name]["name"] = pm.name;
                    scene.chara[chara_name]["left"] = pm.left;
                    scene.chara[chara_name]["top"] = pm.top;
                    scene.chara[chara_name]["width"] = pm.width;
                    scene.chara[chara_name]["visible"] = true;
                    scene.chara[chara_name]["storage"] = pm.storage;
                    scene.chara[chara_name]["reflect"] = pm.reflect;
                    
                }
                
            }else if(tag=="depth_mod"){
                
                var chara_name = pm.name;
                
                if(scene.chara[chara_name]){
                    
                    if(pm.depth=="back"){
                        scene.chara[chara_name]["_depth_cnt"] = --scene.depth_cnt_down;
                    }else{
                        scene.chara[chara_name]["_depth_cnt"] = ++scene.depth_cnt_up;
                    }
                    
                }
                
            }else if(tag=="chara_mod"){
                
                var chara_name = pm.name;
                
                if(scene.chara[chara_name]){
                    scene.chara[chara_name]["name"] = pm.name;
                    scene.chara[chara_name]["storage"] = pm.storage;
                    scene.chara[chara_name]["reflect"] = pm.reflect;
                }
                
            }else if(tag=="chara_move"){
                
                var chara_name = pm.name;
                
                if(scene.chara[chara_name]){
                    scene.chara[chara_name]["name"] = pm.name;
                    scene.chara[chara_name]["left"] = pm.left;
                    scene.chara[chara_name]["top"] = pm.top;
                    scene.chara[chara_name]["width"] = pm.width;
                }
                
            }else if(tag=="chara_hide"){
                var chara_name = pm.name;
            
                if(scene.chara[chara_name]){
                                        
                    scene.chara[chara_name]["name"] = pm.name;
                    scene.chara[chara_name]["visible"] = false;
                
                }
                
            }else if(tag=="chara_hide_all"){
            
                for(var key in scene.chara){
                    scene.chara[key]["visible"] = false;
                }
    
            }else if(tag=="image"){
                
                //深さを保持する。
                if(pm.depth=="back"){
                    pm["_depth_cnt"] = --scene.depth_cnt_down;
                }else{
                    pm["_depth_cnt"] = ++scene.depth_cnt_up;
                }
                
                scene.images[pm.name] = pm;
                
                
            }else if(tag=="anim"){
                
                //イメージのアニメ
                if(pm.name.indexOf("trpg_img_")!=-1){
                    
                    var name_key = pm.name+",tyrano_image";
                    
                    if(scene.images[name_key]){
                        
                        scene.images[name_key]["left"] = pm.left;
                        scene.images[name_key]["top"] = pm.top;
                        scene.images[name_key]["width"] = pm.width;
                        
                    }
                       
                }
                
                
            }else if(tag=="free"){
                
                if(pm.name=="tyrano_ptext"){
                    scene.ptext = {};
                }else if(pm.name=="tyrano_image"){
                    scene.images = {};
                }else if(pm.name.indexOf("trpg_img_")!=-1){
                    delete scene.images[pm.name+",tyrano_image"];
                }else if(pm.name.indexOf("trpg_ptext_")!=-1){
                    delete scene.ptext[pm.name+",tyrano_ptext"];
                }
                               
            }else if(tag=="freeimage"){
                
                scene.ptext = {};
                scene.images = {};
                
                for(var key in scene.chara){
                    scene.chara[key]["visible"] = false;
                }
    
            
            }else if(tag=="ptext"){
                
                scene.ptext[pm.name] = pm;
            	
                
            }            
            ////BGM        
            else if(tag=="playbgm" ){
                
                scene.bgm = pm.storage;
                scene.bgm_volume = pm.volume;
                
            }else if(tag=="stopbgm"){
                
                scene.bgm ="";
                
            }else if(tag=="set_message_theme"){
                scene.theme_type = pm.type;
            }else if(tag=="chara_sheet_show"){
                scene.sheet_visible = true;
            }else if(tag=="chara_sheet_hide"){
                scene.sheet_visible = false;
            }else if(tag =="chara_sheet_add"){
                
                if(!scene.sheet_snap[pm.chara_id]){
                    scene.sheet_snap[pm.chara_id] = {};    
                }
                
                scene.sheet_snap[pm.chara_id]["add_pm"] = pm;
                
            }else if(tag=="chara_sheet_update_status"){
                
                if(!scene.sheet_snap[pm.chara_id]){
                    scene.sheet_snap[pm.chara_id] = {};    
                }
                
                scene.sheet_snap[pm.chara_id]["up_pm"] = pm;
            
            }else if(tag=="p"){
                
                cnt_p++;
                
                if(cnt_p>=CNT_SEP){
                    
                    seek[seek_index] = $.extend(true, {}, scene);
                    seek_index++;
                    cnt_p = 0;
                    
                }
                
            }
       
            
        }
    
    }
    
    
    ///////////////////
    
    
    var max = parseInt(Object.keys(seek).length)-1;
    
    var j_seek = $('\
        <div class="seekberOverlay" id="seekberOverlay" style="z-index:9999999">\
            <div class="seekberWrap" id="seekberWrap">\
                <p class="seekText" style="margin-right:30px"><span class="seek_current_text"></span></p>\
                <div class="seekberCount">\
                    <span class="seekCount">1</span>\
                    <input type="range" class="white seek_bar" id="seekber" min="-1" max="'+max+'">\
                </div>\
            </div>\
        </div>\
    ');
    
    /*
    var j_text = $('<input id="seek_text_val" type="text" style="width:50px;margin:10px" />');
    var j_text_label = $('<input type="text" style="width:250px;margin:10px" />');
    var j_btn_seek = $('<input type="button" value="移動する" style="margin:10px" />');
    */
        
    var j_seek_icon = $('<a href="#" class="seekberIcon fixlayer" id="seekberIcon" style="z-index:9999999"><img src="./data/others/plugin/seek_point/image/icon_seekber.png" alt=""></a>');
    
    $(".tyrano_base").append(j_seek_icon);
    $(".tyrano_base").append(j_seek);
    
    
    //▼シークバー-------------------------------------------------------------------
    var seekbar = $("#seekber");
    var seekbarOverlay = $("#seekberOverlay");
    seekbarOverlay.hide();
      
    $("#seekberIcon").on("click", function(){
        
        start_index = seekbar.val();
        
        //クリックまちになってないと次に行かない。
        //画面効果中は実行できないようにする
        if(TYRANO.kag.layer.layer_event.css("display") =="none" && TYRANO.kag.stat.is_strong_stop != true){
            return false;
        }
        
        TYRANO.kag.layer.hideMessageLayers();
        $(this).hide();
        
        seekbarOverlay.show();
        
        //ドラッグできるように。
        $("body").attr("ontouchmove","");
        
        j_seek.off("click.seek");
        j_seek.on("click.seek",function(e){
            
            e.preventDefault();
            
            if(!e.target.closest("#seekberWrap")){
                TYRANO.kag.layer.showMessageLayers();
                seekbarOverlay.hide();
                $("#seekberIcon").show();
            }
            
            
        });
        
        
        ref_seek_bar();
        
        
        return false;
    
    });
    
      
    seekbar.on("change input",function(){
        
        var num = $(this).val();
        var text = "";
        
        if(num == -1){
	    	text = "先頭から再生する";
	    }else{
			text = seek[num]["text"]; 
		}
        
        //テキストの値を更新する
        var seek_current_text = text + '<i id="seekTextArrow"></i>';
        
        $(".seek_current_text").html(seek_current_text);
        
        //$(".seekCount").html(num);
        //$(".seek_bar").val(num);
        
        ref_seek_bar();
        
        
    });
    
    seekbar.on("mouseup touchend",function(){
      	
        var num = $(this).val();
        
        //変化がない場合はなし。
        if(start_index == num){
	    	return;
	    }
        
        //ドラッグできるように。
        $("body").attr("ontouchmove","event.preventDefault();");
        
        if(num==-1){
	    	location.reload();
	    	return;
	    }
        
        go_seek(num);
        
        
    })
      
    //▲シークバー-------------------------------------------------------------------
    
    
    function ref_seek_bar(){
        
        var max = parseInt(seekbar.attr("max"))+1;
        var val = parseInt(seekbar.val()) + 1;
        
        var width = parseInt(seekbar.css("width"));
        
        var tmp = Math.round(width/max);
        var current = 20 + (tmp*val);
        
        $("#seekTextArrow").css("left",(current)+"px");
    
    }
    
    function go_seek(num){
        
        var scene = seek[num];
        
        current_index = scene["index"];
        
        //画面をつくってジャンプする。ラベルに
        
        var array_tag_obj = [];
            
        array_tag_obj.push($.tobj("mask",{time:"10"}));
        
        //シーンのオブジェクトをすべて削除する
        array_tag_obj.push($.tobj("chara_hide_all",{time:"10"}));
        array_tag_obj.push($.tobj("free",{layer:"0",name:"tyrano_image",time:10}));
        array_tag_obj.push($.tobj("free",{layer:"0",name:"tyrano_ptext",time:10} ));
        
        ///////// bgの復元
        if(scene.bg !=""){
            var bg = scene.bg;
            array_tag_obj.push($.tobj("bg",{"storage":scene.bg,"time":10}));
        
        }
        
        //復元用の順番をつくる//////////////
        var array_element = [];
        
        if(scene.chara){
            var charas = scene.chara;
            for(var key in charas){
                //delete charas[key]["depth"];
                array_element.push({t:"ch",obj:charas[key]});
            }
        }
        
        if(scene.images){
            var images = scene.images;
            for(var key in images){
                //delete images[key]["depth"];
                array_element.push({t:"img",obj:images[key]});
            }
        }
        
        //ソートする
        array_element.sort(function(a, b) {
            
            if(typeof a.obj._depth_cnt =="undefined"){
                a.obj._depth_cnt = -9999999;
            }
            
            if(typeof b.obj._depth_cnt =="undefined"){
                b.obj._depth_cnt = -9999999;
            }

            if (a.obj._depth_cnt > b.obj._depth_cnt) {
                return 1;
            }else {
                return -1;
            }
         
        });
        
        //////////////////////////        
        
        //順番も復元するための処置。
        for(var i=0;i<array_element.length;i++){
            
            var image_obj = array_element[i];
            
            if(image_obj.t=="ch"){
                
                var chara = image_obj.obj;
                if(chara.visible == true){
                    //chara_show の 順番を
                    array_tag_obj.push($.tobj("chara_show",{name:chara.name, storage:chara.storage, left:chara.left, top:chara.top, width:chara.width, reflect:chara.reflect,time:10, "_chara_id":chara._chara_id } ));
                
                }
                
            }else if(image_obj.t=="img"){
                
                var pm = image_obj.obj;
                pm["time"] = 10;
                pm["_is_recover"] = 1;
                array_tag_obj.push($.tobj("image",pm));
                
            }
            
        }
        
        
        if(scene.ptext){
            
            for(var key in scene.ptext){
                
                var pm = scene.ptext[key];
                pm["time"] = 10;
                //pm["_is_recover"] = 1;
                array_tag_obj.push($.tobj("ptext",pm));
                
            }
            
        }

        ///////// bgmの復元
        if(scene.bgm !=""){
            var bgm = scene.bgm;
            array_tag_obj.push($.tobj("playbgm",{"storage":scene.bgm,"volume":scene.bgm_volume}));
            
        }else{
	        array_tag_obj.push($.tobj("stopbgm",{}));
        }
        
        /////キャラシの復元
        array_tag_obj.push($.tobj("chara_sheet_delete_all",pm));
        if(scene.sheet_visible == true){
            
            if(scene.sheet_snap){
                
                for(var key in scene.sheet_snap){
                    
                    var add_pm = scene.sheet_snap[key]["add_pm"];
                    var up_pm  = scene.sheet_snap[key]["up_pm"];
                    
                    array_tag_obj.push($.tobj("chara_sheet_add",add_pm));
                    array_tag_obj.push($.tobj("chara_sheet_update_status",up_pm));
        
                }
                
            }
            
            array_tag_obj.push($.tobj("chara_sheet_show",{}));
            
        }
        
        //パネル削除
        array_tag_obj.push($.tobj("free",{layer:"0",name:"panel_text",time:10} ));
        array_tag_obj.push($.tobj("free",{layer:"0",name:"panel",time:10} ));
        
        
        //マスク解除
        array_tag_obj.push($.tobj("mask_off",{time:"1000"}));
        
        TYRANO.kag.stat.is_strong_stop = true;
        
        for(var key in array_tag_obj){
            var obj = array_tag_obj[key];
            TYRANO.kag.ftag.startTag(obj.tag, obj.pm);
        }
        
        var i = 0;
        
        var timer = setInterval(function(){
                
            var obj = array_tag_obj[i];
            TYRANO.kag.ftag.startTag(obj.tag, obj.pm);
    
            i++;

            //カウント用変数「i」が配列の要素数「array_count」になればsetInterval関数をキャンセル
            if(i == array_tag_obj.length){
                
                clearInterval(timer);
                
                setTimeout(function(){
                    
                    TYRANO.kag.stat.is_strong_stop = false;
                    
                    //indexにジャンプする
                    var scene_index = scene["index"];
                    TYRANO.kag.ftag.nextOrderWithIndex(scene_index-1, "scene1.ks", undefined, undefined, false);
                    
                    //シナリオに挟み込む
                    var text = scene["text"];
                    
                    var stat = TYRANO.kag.stat;
                    var j_span = $("<span>"+text+"</span>");
                    
                    j_span.css({
	                "color":stat.font.color,
	                "font-weight": stat.font.bold,
	                "font-size": stat.font.size + "px",
	                "font-family": stat.font.face,
	                "font-style":stat.font.italic
	                });
	                
	                if(stat.font.edge !=""){
	                    var edge_color = stat.font.edge;
	                    j_span.css("text-shadow","1px 1px 0 "+edge_color+", -1px 1px 0 "+edge_color+",1px -1px 0 "+edge_color+",-1px -1px 0 "+edge_color+"");
	                
	                }else if(stat.font.shadow != ""){
	                    //j_span.css()
	                    j_span.css("text-shadow","2px 2px 2px "+stat.font.shadow);
	                }
                    $(".tyrano_base").find(".message0_fore").find(".message_inner").append(j_span);
                    
                    
                    seekbarOverlay.hide();
                    $("#seekberIcon").show();
                    
                },1000);
                
            }
            
        }, 30);
        
    }
    
    
    //現在のシーク場所を復元するための仕組み
    var current_index_old =-1;
    
    var timer_seek = setInterval(function(){
        
        if(TYRANO.kag.stat.current_scenario != "scene1.ks"){
            return;
        }
        
        var current_index = TYRANO.kag.ftag.current_order_index;
        
        if(current_index_old == current_index){
            return;
        }
            
        current_index_old = current_index;
        
        var target_key = 0;
        var target_text = "";
        
        for(var key in seek){
            
            var index = seek[key]["index"];
            if(current_index < index){
                //最初の準備中とかはkeyが0だよ
                if(key-1 >= 0){
                    target_text = seek[key-1]["text"];
                    target_key = key - 1;
                }
                break;    
                
            }
            
        }
        
        
        var seek_current_text = target_text + '<i id="seekTextArrow"></i>';
        
        $(".seek_current_text").html(seek_current_text);
        $(".seek_bar").val(parseInt(target_key));
        
        //オート中はメニューバーは消す。
        if(TYRANO.kag.stat.is_auto==true){
	    	$(".tyrano_base").find(".fixlayer").hide();
	    }else{
		    
		    if(seekbarOverlay.css("display")=="none"){
				$(".tyrano_base").find(".fixlayer").show();
			}
	    }
	    
        
    },1000);
    
    
    const inputRange = new RangeTouch('[type=range]');
    

})();





//
TYRANO.kag.ftag.master_tag.seek_point = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
        
        "mum" : "0",
        
    },

    start : function(pm) {
        
        var that = this;
        
        $("#seek_text_val").val(pm.num);
        $(".seek_bar").val(pm.num);
        
        this.kag.ftag.nextOrder();
        
    }
        
};





