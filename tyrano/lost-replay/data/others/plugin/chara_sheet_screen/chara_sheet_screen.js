

/*
 #[chara_sheet ]
 :group
 プラグイン
 :title
 キャラシを画面に表示して変更できるタグ
 :exp
 コメントを、ゲーム画面の好きなタイミングで流すことができるプラグイン
 :sample
 [comment_screen text="あああああああああああああ" ]
 :param
 
 
 
 #[end]
 */
 
var chara_sheet_obj = {
    
    "j_screen_root":{},
      
};
 
TYRANO.kag.ftag.master_tag.chara_sheet_init = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
        
        "layer" : "message0",
        "page":"fore",
        "display":"false", //デフォルトは非表示
    
        
    },

    start : function(pm) {
        
        var that = this;
        
        var j_layer = this.kag.layer.getLayer(pm.layer, pm.page);
        
        var j_screen_root = $('<div class="screenCharaStatusArea"></div>');
        
        j_screen_root.css("font-family",'"Hiragino Sans","ヒラギノ角ゴシック Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif');
        
        var j_screen_center = $('<ul class="screenCharaStatusList screenCharaStatusListTop defaultBrown"></ul>');
        //j_screen_center.hide();
        
        var j_screen_left = $('<ul class="screenCharaStatusList screenCharaStatusListLeft defaultBrown"></ul>');
        var j_screen_right = $('<ul class="screenCharaStatusList screenCharaStatusListRight defaultBrown"></ul>');
        
        //j_layer.append(j_screen_center);
        
        j_screen_root.append(j_screen_center);
        j_screen_root.append(j_screen_left);
        j_screen_root.append(j_screen_right);
        
        if(pm.display=="false"){
            j_screen_root.hide();
        }
        
        j_layer.append(j_screen_root);
        
        chara_sheet_obj.j_screen_root = j_screen_root;
        
        this.kag.ftag.nextOrder();
        
    }
        
};


//キャラクター追加・更新 はこれ
TYRANO.kag.ftag.master_tag.chara_sheet_add = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
    
        name:"",
        chara_id:"",
        storage:"", //表情ファイル
        pos:"Top", //Left Top Right
        auto_trim:"false", //true or false サムネを自動で切り抜くか否か
        status:"", //json文字列で受け取る
        
        
    },

    start : function(pm) {
        
        var that = this;
        
        var j_screen_root = chara_sheet_obj.j_screen_root;
        
        var j_chara_list = j_screen_root.find(".screenCharaStatusList"+pm.pos);
        
        var html = '\
        			  <p><img src="'+pm.storage+'" alt="" title="'+pm.name+'"></p>\
					  <ul class="screenCharaStatusItem">\
						  <li><strong class="name" style="font-weight:bold">'+pm.name+'</strong></li>\
					  </ul>\
				    ';
        
        var j_chara_root = $('<li screen-chara-id="'+pm.chara_id+'" ></li>');
        var j_chara = $(html);
		
        
        var current_j_chara = j_chara_list.find("li[screen-chara-id='"+pm.chara_id+"']");
        
        if(pm.auto_trim == "true"){
            j_chara.find("img").wrap("<span>");
        }
        
        //存在するもの
        if(current_j_chara.get(0)){
            j_chara_root = current_j_chara;
            j_chara_root.empty();
            j_chara_root.append(j_chara);
            
        }else{
            
            j_chara_root.append(j_chara);
            
            j_chara_list.append(j_chara_root);		    
		}
		
		var array_tmp = pm.status.split(";");
        
        if(pm.status==""){
            this.kag.ftag.nextOrder();
            return;
        }
        
        if(array_tmp.length > 0 ){
            
            for(var key in array_tmp){
                var tmp = array_tmp[key].split(":");
                j_chara_root.find("ul").append("<li><strong style='font-weight:bold'>"+tmp[0]+"</strong><span>"+tmp[1]+"</span></li>");
            }
            
        }
        
        this.kag.ftag.nextOrder();
        
        
    }
        
};


TYRANO.kag.ftag.master_tag.chara_sheet_theme = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
    
        theme:"Brown",
        
    },

    start : function(pm) {
        
        var that = this;
        
        var j_screen_root = chara_sheet_obj.j_screen_root;
        
        j_screen_root.find(".screenCharaStatusList").removeClass("defaultBrown");
        j_screen_root.find(".screenCharaStatusList").removeClass("defaultBlack");
        j_screen_root.find(".screenCharaStatusList").removeClass("defaultWhite");
        
        
        j_screen_root.find(".screenCharaStatusList").addClass("default"+pm.theme);
        
        this.kag.ftag.nextOrder();
           
    }
        
};


//キャラクター全削除
TYRANO.kag.ftag.master_tag.chara_sheet_delete_all = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
    
        
    },

    start : function(pm) {
        
        var that = this;
        
        var j_screen_root = chara_sheet_obj.j_screen_root;
        
        j_screen_root.find(".screenCharaStatusList").empty();
        
        
        this.kag.ftag.nextOrder();
        
        
    }
        
};



//キャラクター追加・更新 はこれ
TYRANO.kag.ftag.master_tag.chara_sheet_update_status = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
        
        name:"",
        chara_id:"",
        status:"", //json文字列で受け取る
        
    },

    start : function(pm) {
        
        var that = this;
        
        var j_screen_root = chara_sheet_obj.j_screen_root;
        
        var j_chara_list = j_screen_root.find(".screenCharaStatusList");
        
        var j_chara = j_chara_list.find("li[screen-chara-id='"+pm.chara_id+"']");
        
        var j_chara_status_list = j_chara.find(".screenCharaStatusItem");
        j_chara_status_list.empty();
        
        j_chara_status_list.append('<li><strong class="name" style="font-weight:bold">'+pm.name+'</strong></li>');
        
        if(pm.status==""){
            j_chara.hide();
            this.kag.ftag.nextOrder();
        
            return;
        }
        
        j_chara.show();
        
        var array_tmp = pm.status.split(";");
        
        for(var key in array_tmp){
            var tmp = array_tmp[key].split(":");
            j_chara_status_list.append("<li><strong style='font-weight:bold'>"+tmp[0]+"</strong><span>"+tmp[1]+"</span></li>");
        }
        
        
        this.kag.ftag.nextOrder();
        
        
    }
        
};


TYRANO.kag.ftag.master_tag.chara_sheet_show= {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
    },

    start : function(pm) {
        
        var that = this;
        var j_screen_root = chara_sheet_obj.j_screen_root;
        j_screen_root.show();
        
        this.kag.ftag.nextOrder();
        
        
    }
        
};


TYRANO.kag.ftag.master_tag.chara_sheet_hide= {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
    },

    start : function(pm) {
        
        var that = this;
        var j_screen_root = chara_sheet_obj.j_screen_root;
        j_screen_root.hide();
        
        this.kag.ftag.nextOrder();
        
        
    }
        
};




//プロット表示
TYRANO.kag.ftag.master_tag.plot_show = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
    
        "array_chara_name":"",
        "array_chara_val":"",
        "theme":""
        
    },

    start : function(pm) {
        
        var that = this;
        
        var array_plot_chara = pm.array_chara_name.split(":");
        var array_plot_val   = pm.array_chara_val.split(":");
        
        var j_plot_screen = $('<ul class="screenCharaPlotArea" style="z-index:2000" ></ul>');
        
        for(var key in array_plot_chara){
            
            var plot_chara = array_plot_chara[key];
            var plot_val   = array_plot_val[key];
            
            var plot_list = '<li><strong class="name">'+plot_chara+'</strong><span>'+plot_val+'</span></li>';
            j_plot_screen.append(plot_list);
            
        }
        
        j_plot_screen.addClass(pm.theme);
        
        var j_layer = this.kag.layer.getLayer("message0", "fore");
        j_layer.append(j_plot_screen);
        
        this.kag.ftag.nextOrder();
        
        
    }
        
};

TYRANO.kag.ftag.master_tag.plot_hide = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
    
    },

    start : function(pm) {
        
        var that = this;
        
                
        var j_layer = this.kag.layer.getLayer("message0", "fore");
        j_layer.find(".screenCharaPlotArea").remove();
        this.kag.ftag.nextOrder();
        
    }
        
};




