
/*
 #[comment_screen]
 :group
 プラグイン
 :title
 コメントを画面に流せるプラグイン
 :exp
 コメントを、ゲーム画面の好きなタイミングで流すことができるプラグイン
 :sample
 [comment_screen text="あああああああああああああ" ]
 :param
 name=テキストに名前をを指定します,
 text=画面に流すテキストを指定します,
 page=backかforeを指定できます。デフォルトはfore,
 top=流す位置を指定できます。指定しない場合は位置を自動的に計算して文字が重ならないように設定できます。,
 size=フォントサイズをピクセルで指定してください,
 face=フォントの種類を指定してください。非KAG互換ですが、ウェブフォントも使用できます,
 color=フォントの色を指定します,
 bold=太字指定 boldと指定してください　HTML５互換ならfont-style指定に変換できます,
 opacity=レイヤの不透明度を指定します。０～２５５の範囲で指定してください（２５５で全くの不透明）
 edge=文字の縁取りを有効にできます。縁取りする文字色を 0xRRGGBB 形式で指定します。,
 shadow=文字に影をつけます。影の色を 0xRRGGBB 形式で指定します。縁取りをしている場合は無効化されます。,
 time=テキストが流れる速度を指定します。指定したミリ秒かけて、テキストが流れます。指定しない場合は文字列の長さから自動的に速度を決定します,
 delay=このタグから指定したミリ秒あとに、テキストが流れ始めます。
 wait=true or false を指定。trueを指定するとコメントが流れ終わるのを待ちます。デフォルトはfalse

 #[end]
 */
 
TYRANO.kag.ftag.master_tag.comment_screen = {
    
    kag: TYRANO.kag,
	vital : ["text"],
    	
    pm : {
        
        "layer" : "0",
        "name" : "",
        "page" : "fore",
        "top":"",
        "time":"",
        "delay":"0",
        "wait":"false",
        "size" : "24",
        "face" : "",
        "color" : "0xFFFFFF", //白
        "italic" : "",
        "bold" : "",
        "align":"left",
        "edge" : "",
        "shadow" : "0x000000", //黒
        "opacity":"",
        "next":"true"
        
    },

    start : function(pm) {
        
        var that = this;
        
        if(pm.face ==""){
            pm.face=that.kag.stat.font.face;
        }
        
        if(pm.color == ""){
            pm.color=$.convertColor(that.kag.stat.font.color);
        }else{
            pm.color = $.convertColor(pm.color);
        }
        
        var font_new_style = {

            "color" : pm.color,
            "font-weight" : pm.bold,
            "font-style" : pm.fontstyle,
            "font-size" : pm.size + "px",
            "font-family" : pm.face,
            "z-index" : "99999",
            "cursor" : "default"
        
        };
        
        if(pm.edge !=""){
            var edge_color = $.convertColor(pm.edge);
            font_new_style["text-shadow"] = "1px 1px 0 "+edge_color+", -1px 1px 0 "+edge_color+",1px -1px 0 "+edge_color+",-1px -1px 0 "+edge_color+"";
        }else if(pm.shadow !=""){
            font_new_style["text-shadow"] = "2px 2px 2px " + $.convertColor(pm.shadow);    
        }
        
        var j_text = $("<p></p>");
        
        j_text.css("position", "absolute");
        j_text.css("white-space","nowrap")
        
        //透明度
        if (pm.opacity != "") {
            j_text.css("opacity", $.convertOpacity(pm.opacity))
        }
        
        //オブジェクトにクラス名をセットします
        $.setName(j_text, pm.name);
        j_text.html($.escapeHTML(pm.text));
        
        
        this.kag.setStyles(j_text, font_new_style);
        
        //アニメーション開始。
        var from_left = parseInt(that.kag.config.scWidth);
        j_text.css("left",from_left);
        
        
        $("#tyrano_base").append(j_text);
        
        var to_left = parseInt(j_text.css("width"))*-1;
                        
        //指定していない場合は自動的に決定する
        if(pm.time==""){
            pm.time = 6000;
        }
        
        setTimeout(function(){
            
            //指定されていない時は、自動で位置を決める
            if(pm.top==""){
                
                if(that.kag.variable.tf.comment_screen>5){
                    that.kag.variable.tf.comment_screen = 0;    
                }
                
                var top = parseInt(j_text.css("height"));
                
                if(!that.kag.variable.tf.comment_screen){
                    that.kag.variable.tf.comment_screen = 0;
                }
                
                //上から
                pm.top = top * that.kag.variable.tf.comment_screen ;
                that.kag.variable.tf.comment_screen++;
                
            }   
            
            j_text.css("top", pm.top + "px");

            
            (function(){
    			var _j_text = j_text;
    			_j_text.animate({
    				left: to_left+"px"
    			}, {
        			easing:"linear",
        			duration: parseInt(pm.time),
    				complete: function(){
        				_j_text.remove();
        				that.kag.variable.tf.comment_screen--;
        				
        				if(that.kag.variable.tf.comment_screen < 0){
                            that.kag.variable.tf.comment_screen = 0;
                        }
        				
                		if(pm.wait==="true"){
                    		if(pm.next==="true"){
                                that.kag.ftag.nextOrder();
                            }
                        }
    					
    				}
    				
    			});
    		})();
    		
        },parseInt(pm.delay));
        
        if(pm.next==="true"){
            if(pm.wait==="false"){
                this.kag.ftag.nextOrder();
            }
        }
    }
        
};


