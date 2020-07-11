(function($) {


    $.chatConfig = function() {
        
        if(typeof TYRANO.kag.stat.tchat == "undefined"){
            
            TYRANO.kag.stat.tchat = {
                "current_top":0,
                "current_scroll":0, //スクロールされた幅を保持しておく
                "layer" : "0",
                "face_width":"100",//表情アイコンの横サイズ
                "margin_face":"20", 
                "bgcolor":"", //背景色
                "left_bgcolor":"0xFFC0CB",
                "right_bgcolor":"0xFFFFFF",
                "center_bgcolor":"0xDCDCDC",
                "anim_time":"", //アニメーションタイム
                "width":"",
                "height":"",
                "left":"0",
                "top":"0",
                "se":"",
                "backlog":"true",
                "overflow":"remove",
                "name_font_size":"16",
                "name_font_color":"0x000000",
                "edit_mode":"false", //開発モードです。スタジオから表示されているときはこれ 
				"zindex":""
            };
            
            var under_height = parseInt(TYRANO.kag.config.scHeight) *0.7;
            TYRANO.kag.stat.tchat["under_height"] = under_height;
            
            TYRANO.kag.stat.tchat.width  = TYRANO.kag.config.scWidth;
            TYRANO.kag.stat.tchat.height = TYRANO.kag.config.scHeight;
            
            
        }
        
        return TYRANO.kag.stat.tchat;
        

    };
    
    //オブジェクトを引き継ぐ。
    $.extendObj = function(pm,target){
        
        var tmp = target;
        
        for(key in target){
            
            if(pm[key]){
                if(pm[key]!=""){
                    target[key] = pm[key];
                }
            }
            
        }
        
        return target;
        
    };
    
    //オブジェクトを引き継ぐ。
    $.getAreaChat = function(target_layer){
        
        var j_area_chat = target_layer.find(".area_tchat");
        
        if(!j_area_chat.length){
            
            var chat_config = $.chatConfig();
            
            //要素が存在しない場合は要素を作成する
            j_area_chat = $("<div class='area_tchat' ></div>");
            j_area_chat.css({
                "position":"absolute",
                "overflow":"hidden",
                "left":parseInt(chat_config.left),
                "top":parseInt(chat_config.top),
                "width":parseInt(chat_config.width),
                "height":parseInt(chat_config.height)
            });
        	
        	target_layer.append(j_area_chat);
                     
        }
        
        return j_area_chat;
        
    };

    
})(jQuery);




        
/*
 #[chat_talk]
 :group
 ティラノストーリー
 :title
 チャットの表示
 :exp
 吹き出しを画面に表示することができます
 :sample

;画面中央のメッセージ
[chat_talk pos="center" text="ある日のこと" bgcolor="0x000000" ]
[p]

;画面の右側に吹き出しを表示
[chat_talk pos="right" name="やまと" text="おーい" face="chat/yamato/normal.png"]
[p]

;画面の左側に吹き出しを表示
[chat_talk pos="left" name="あかね" text="なんだい？"  face="chat/akane/hirameki.png" delay=1500 ]
[p]

:param
name=チャットを話してる人の下に表示される名前。文字列で指定してください,
layer=チャットを表示するレイヤを指定できます。デフォルトは0 または、chat_configでlayerを設定している場合はそのレイヤが採用されます。,
page=foreかbackを指定します。デフォルトはforeです,
id=半角英数字を指定できます。ここで指定した文字列が、クラス名として付与されます。あとからJavaScriptなどで編集したい場合は指定してください,
face=吹き出しの表情アイコンを指定する。画像ファイルはfgimageフォルダ以下に配置してください。ここの指定がない場合は表情なしの吹き出しを表示できます。,
time=吹き出しのフェードインにかかる時間をミリ秒で指定できます。デフォルトは300ミリ秒です,
text=吹き出しの中のテキストを指定できます,
pos=チャットの表示位置を指定します。left（左）right（右）center（中央）を指定できます。デフォルトはleft。この値は l(left) r(right) c(center)と省略することもできます ,
color=吹き出しの文字色を指定できます。0x000000形式で指定します。,
bgcolor=吹き出しの背景色を指定できます。0x000000形式で指定します。「transparent」を指定すると吹き出し部分が透明になります,
graphic=吹き出しの中に画像を指定できます。画像ファイルはfgimageフォルダ以下に配置してください。folderパラメータを指定するとfgimage以外の画像を指定することができます,
graphic_width=graphicパラメータで指定した画像の横幅を指定できます,
graphic_height=graphicパラメータで指定した画像の高さを指定できます,
folder=graphicパラメータで指定する画像ファイルのフォルダを変更できます。デフォルトはfgimage。image や bgimageを指定すると任意のフォルダ以下の画像を吹き出しに表示できます,
width=吹き出しの横幅を指定できます。指定しない場合は文字数によって吹き出しの大きさが自動的にきまります。,
bottom=ピクセルで指定します。吹き出しテキストの下にスペースを挿入することができます。,
se=吹き出しが表示された時の効果音を指定できます。ファイルはsoundフォルダ以下に配置してください,
delay=吹き出しのテキストが表示されるまでに、遅延を挿入することができます。チャット入力中のような演出が簡単に表現できます。表示時間をミリ秒で指定してください。ローディング画像はプラグインのassets/write.gifファイルを変更することで自由にカスタマイズできます,
reflect=true or falseで指定します。trueを指定すると、表情画像を反転することができます。
 #[end]
 */
 
TYRANO.kag.ftag.master_tag.chat_talk = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
        
        "layer":"",
        "page":"fore",
        "name" : "",
        "id":"",
        "face":"", //表情アイコン 空白の場合は名前のみになる
        "text":"",
        "pos":"left", //left right center
        "color":"", //文字色
        "bgcolor":"",
        "graphic":"",
        "graphic_width":"",
        "graphic_height":"",
        "folder":"",
        "time":"300", //表情がフェードインする時間を指定できます
        
        "width":"",
        "bottom":"", //吹き出しの下にスペースが作れる
        
        "se":"",
        "delay":"",
        
        ///
        "reflect":"false", //trueを指定すると画像を反転
        
        "update":"false", //editmodeの場合だけ有効    
        "insert_chat_id":"", //editmodeの場合だけ有効  
        "face_path_full":"false", 
            
    },

    start : function(pm) {
        
        var that = this;
        
        that.kag.layer.hideEventLayer();
        
        var chat_config = $.chatConfig();
        var storage_url = "";
        
        if(pm.face!=""){
            if ($.isHTTP(pm.face) || pm.face_path_full=="true") {
                storage_url = pm.face;
            } else {
                storage_url = "./data/fgimage/" + pm.face;
            }
        }
        
        //表情画像を先読み
        var tmp = $('<img src="'+storage_url+'" />');
        
        var pos = pm.pos;
        var f_pos = "right";
        
        if(pos=="right"){
            f_pos="left";
        }
        
        if(pos=="l"){ 
            pos="left";
        }else if(pos=="r"){
            pos="right";
        }else if(pos=="c"){
            pos="center";
        }
        
        if(pm.bgcolor==""){
            if(pos=="left"){
                pm.bgcolor = chat_config.left_bgcolor;
            }else if(pos=="right"){
                pm.bgcolor = chat_config.right_bgcolor;
            }else if(pos=="center"){
                pm.bgcolor = chat_config.center_bgcolor;
            }
        }
        
        var se_storage ="";
        
        if(pm.se !="" ){
            se_storage = pm.se ;
        }else if(chat_config.se!="" && chat_config.se!="none"){
            se_storage = chat_config.se ;
        }
        
        if(se_storage!=""){
            that.kag.ftag.startTag("playse", {
                "storage" : se_storage,
                "stop" : true
            });
        }
        
        
        var html = '\
            <div style="display:none;position:absolute" class="tchat">\
                 <figure class="t_chat_face tchat-img-'+pos+'">\
                    <img class="face_img" src="'+storage_url+'" alt="″>\
                    <figcaption class="tchat_name_text tchat-img-description">\
                    <div class="t_chat_name" style="justify-content:center;display:flex;text−align:center;width:'+chat_config.face_width+'px"><p>'+pm.name+'</p></div>\
                    </figcaption>\
                 </figure>\
                 <div class="t_chat_text tchat-text-'+f_pos+'">\
                   <div class="text_f-before tchat-text-'+f_pos+'-f-before"></div>\
                   <p class="tchat-text-inner">\
                   </p>\
                   <div class="text_f-after tchat-text-'+f_pos+'-f-after"></div>\
                 </div>\
                </div>\
            ';
             
        var j_tchat = $(html);
        
        //クラス名追加
        $.setName(j_tchat,"tyrano_story_"+pm.name);
        $.setName(j_tchat,pm.id);
        j_tchat.attr("chat-id",pm.id);
        
        
        if(chat_config.zindex!=""){
            j_tchat.css("z-index",parseInt(chat_config.zindex));
        }
                
        if(pos=="left"){
            j_tchat.css("left",0);
        }else{
            j_tchat.css("right",0);
        }
        
        if(pos=="left"){
        
            j_tchat.find(".t_chat_text").css({
                "margin-top":parseInt(chat_config.margin_top),
                "margin-left":parseInt(chat_config.face_width)+20,
                "margin-right":100
            });
            
            j_tchat.css("margin-left",20);
            
            //吹き出しの口
            j_tchat.find(".tchat-text-right-f-after").css({
                "border-right": "10px solid " + $.convertColor(pm.bgcolor)
            });
        
            
        }else if(pos=="right"){
            
            j_tchat.find(".t_chat_text").css({
                "margin-top":parseInt(chat_config.margin_top),
                "margin-right":parseInt(chat_config.face_width)+20,
                "margin-left":100
            });

            j_tchat.css("margin-right",20);
            
            //吹き出しの口
            j_tchat.find(".tchat-text-left-f-after").css({
                "border-left": "10px solid " + $.convertColor(pm.bgcolor)
            });
        
        }else if(pos=="center"){
            
            j_tchat.find(".t_chat_face").remove();
            
            j_tchat.css("width","100%");
            j_tchat.find(".t_chat_text").css({
                "margin-top":25,
                "text-align":"center"
            });

            
        }
        
        //顔指定がない場合は、削除する
        if(pm.face==""){
            j_tchat.find(".face_img").remove();
            //顔指定がない場合はぴったり寄せる
            j_tchat.find(".tchat-text-"+f_pos).css("margin-"+pos,0);

        }else{
        
            if(pm.reflect=="true"){
                j_tchat.find(".face_img").addClass("reflect");
            }
            
            j_tchat.find(".t_chat_face").css({
                "width":parseInt(chat_config.face_width),
                "height":parseInt(chat_config.face_width)
            });
                        
        }

        
        //吹き出しの背景色
        j_tchat.find(".tchat-text-"+f_pos).css({
            "background-color":$.convertColor(pm.bgcolor)
        });
                
        //テキスト内部      
        var j_tchat_text = j_tchat.find(".tchat-text-inner");
        
        j_tchat_text.html(pm.text);
        
        //// フォントのスタイル設定 /////////////////
        if(pm.color==""){
        	pm.color = that.kag.stat.font.color 
        }
        
        var font_style = {
            "color":$.convertColor(pm.color),
            "font-weight": that.kag.stat.font.bold,
            "font-size": that.kag.stat.font.size + "px",
            "font-family": that.kag.stat.font.face,
            "font-style":that.kag.stat.font.italic
        };
        
        j_tchat_text.css(font_style);
        
        //吹き出しのサイズを指定できる
        if(pm.width!=""){
            j_tchat_text.css("width",parseInt(pm.width));
        }
        
        //バックログへの追加を調整
        if(chat_config.backlog=="true"){
            var logstr = "";
            if(pm.text != ""){
                
                if(pm.name != ""){
                    logstr += "<b class='backlog_chara_name "+pm.name+"'>"+pm.name+"</b>：";
                }
                
                logstr += "<span class='backlog_text "+pm.name+"'>"+ pm.text +"</span>";
                
                this.kag.pushBackLog(logstr, "add");
            
            }
            
        }
        
        
        ///// 名前部分のテキスト ///////////////////
        j_tchat_name = j_tchat.find(".t_chat_name").css({
            "font-size":parseInt(chat_config.name_font_size),
            "color":$.convertColor(chat_config.name_font_color),
            "font-family": that.kag.stat.font.face
        });
        
        //レイヤを直接指定することもできる。
        if(pm.layer==""){
            pm.layer = chat_config.layer;
        }
        
        var target_layer = that.kag.layer.getLayer(pm.layer, pm.page);
        var j_area_chat = $.getAreaChat(target_layer);
        
        target_layer.show();
        j_area_chat.show();
        
        
        
        if(chat_config.edit_mode=="false" && pm["update"]=="false"){
        	j_area_chat.append(j_tchat);
        }
        
        //吹き出しに画像を指定する場合
        if(pm.graphic != ""){
            img_load_flag = 1
            
            var foler="";
            if (pm.folder != "") {
                folder = pm.folder;
            } else {
                folder = "fgimage";
            }
            
            var storage_url = "";            
            if ($.isHTTP(pm.graphic)) {
                storage_url = pm.graphic;
            } else {
                storage_url = "./data/"+folder+"/" + pm.graphic;
            }
            
            var j_img = $("<img class='img_graphic' />");
            
            j_img.attr("src",storage_url).on("load",function(){
                
                if(pm.graphic_width!=""){
                    j_img.css("width",parseInt(pm.graphic_width));
                }
                
                if(pm.graphic_height!=""){
                    j_img.css("height",parseInt(pm.graphic_height));
                }
                
                j_tchat.find(".tchat-text-inner").after(j_img);
                
                //吹き出し口の下にスペースを配置
                if(pm.bottom !=""){
                    j_img.after("<div style='height:"+parseInt(pm.bottom)+"px'></div>");
                }

                
                setTimeout(function(){
                    that.show(j_tchat,chat_config,pm);
                },1);
            })
            
        }
        
        //グラフィック指定がないなら実行
        if(pm.graphic==""){
            
            if(pm.bottom !=""){
                j_tchat.find(".tchat-text-inner").after("<div style='height:"+parseInt(pm.bottom)+"px'></div>");
            }
            
            setTimeout(function(){
                that.show(j_tchat,chat_config,pm);
            },1);
            
        }
        	    
        
    },
    
    show:function(j_tchat,chat_config,pm){
	    
        var that = this;
        
        var target_layer = that.kag.layer.getLayer(chat_config.layer, "fore");
        
        var height = parseInt(j_tchat.css("height")); 
            
        var new_top = that.kag.stat.tchat.current_top;
        
        if(chat_config.edit_mode=="false"){
	        
	        //もし、スクロールされた痕跡があるなら、元に戻す
	        if(chat_config.current_scroll!=0){
	            
	            target_layer.find(".tchat_talked").each(function(){
	                
	                var top = parseInt($(this).css("top"));
	                top = top - chat_config.current_scroll;
	                $(this).css("top",top);
	                
	            });
	            
	            chat_config.current_scroll = 0;
	        }
	        
	        
	        if(chat_config.current_top > parseInt(chat_config.under_height)){
	            
	            //はじめて切り替わる時用の調整
	            var s = chat_config.current_top - parseInt(chat_config.under_height);
	            
	            chat_config.current_top = parseInt(chat_config.under_height)+1; 
	            
	            new_top = that.kag.stat.tchat.under_height - height;
	            
	            var num_target = target_layer.find(".tchat_talked").length;
	            var cnt_target = 0;
	            
	            target_layer.find(".tchat_talked").each(function(){
	                
	                var j_obj = $(this);
	                var tmp = parseInt(j_obj.css("top"));
	                var top = tmp - height - 40 - s;
	                
	                if(chat_config.anim_time=="0" || chat_config.anim_time==""){
	                    
	                    j_obj.css("top",top);
	                    
	                    if(chat_config.overflow=="remove"){
	                        if(top + parseInt(j_obj.css("height")) < 0) {
	                            j_obj.remove();
	                        }
	                    }
	                    
	                    cnt_target++;
	                    if(num_target==cnt_target){
	                        that.talk_in(j_tchat,new_top,pm);
	                    }
	                    
	                }else{
	                    
	                    j_obj.animate(
	                        {"top":top},
	                        parseInt(chat_config.anim_time), 
	                        function(){
	                            
	                            if(top + parseInt(j_obj.css("height")) < 0) {
	                                j_obj.remove();
	                            }
	                            
	                            cnt_target++;
	                            if(num_target==cnt_target){
	                                that.talk_in(j_tchat,new_top,pm);
	                            }                        
	                        }
	                    );
	                }
	                
	            });
	            
	        }else{
	            that.kag.stat.tchat.current_top += height + 40 ;
	            this.talk_in(j_tchat,new_top,pm);
	        }
        
        }else{
	        
	        //開発モード
        	that.kag.stat.tchat.current_top += height + 40 ;
        	
        	j_tchat.css("position","relative");
        	j_tchat.css("margin-top","40px");
        	
        	j_tchat.attr("data-pm",JSON.stringify(pm));
        	
        	//同じIDのやつがあるなら、一旦削除
        	var j_area_chat = $.getAreaChat(target_layer);
			
			
			if(pm.update=="true"){
				
				var j_old = j_area_chat.find("."+pm["id"]);
				
				//後ろに挿入
				j_old.after(j_tchat);
				
				//削除
				j_old.remove();
				
				j_tchat.trigger("click");
				
				
			}else{
				
				if(pm.insert_chat_id != ""){
					
					//途中への挿入
					var j_obj = j_area_chat.find("." + pm.insert_chat_id);
					
					if(j_obj.length>0){
						j_obj.after(j_tchat);
					}else{
						j_area_chat.append(j_tchat);
					}
					
					j_tchat.trigger("click");
				
					
				}else{
				
					j_area_chat.append(j_tchat);
				
				}
			}
			
        	j_tchat.show();
        	
        	that.kag.ftag.nextOrder();

        }
            
    
    },
    
    talk_in:function(j_tchat,new_top,pm){
        
        var that = this;
        
        j_tchat.addClass("tchat_talked");
        j_tchat.css("top",new_top + 20);
        
        //delayが設定されているなら、一時的にローディングを表示してから
        if(pm.delay!=""){
            
            j_tchat.find(".tchat-text-inner").hide();
            j_tchat.find(".img_graphic").hide();
            
            var j_load_img = $("<img class='write_gif' src='./data/others/plugin/chat_story/assets/write.gif'/>");
            j_tchat.find(".tchat-text-inner").after(j_load_img);
            
            j_tchat.show();
            setTimeout(function(){
                j_load_img.remove();
                j_tchat.find(".img_graphic").show();
                j_tchat.find(".tchat-text-inner").fadeIn(parseInt(that.kag.cutTimeWithSkip(pm.time)),function(){
                    that.kag.layer.showEventLayer();
                    that.kag.ftag.nextOrder();
                });
            },parseInt(that.kag.cutTimeWithSkip(pm.delay)));
            
        }else{
            
            j_tchat.fadeIn(parseInt(that.kag.cutTimeWithSkip(pm.time)),function(){
                that.kag.layer.showEventLayer();
                that.kag.ftag.nextOrder();
            });
            
        }
        
    }
    
    
    
        
};


/*
 #[chat_config]
 :group
 ティラノストーリー
 :title
 チャットの基本設定
 :exp
 チャットの基本的な設定を行うことができます。
 :sample

[chat_config face_width=100 under_height=700 se="sound.ogg" center_bgcolor="0xFFFFFF"]


:param
layer=チャットを表示するデフォルトレイヤを指定できます。デフォルトは0,
width=チャットを表示するエリアの横幅。指定ししない場合は画面いっぱいを使用します,
height=チャットを表示するエリアの高さ。指定しない場合は画面いっぱいを使用します,
top=チャットエリアの縦位置を指定できます,
backlog=true or false を指定。trueを指定すると会話がバックログに追加されます。デフォルトはtrue,
overflow=hidden or remove を指定。removeを指定すると見えなくなったチャットは消去されます。デフォルトはremove。removeを指定すると動作が軽くなりますが、ログを遡って表示することができなくなります。,
left=チャットエリアの左からの横位置を指定できます,
face_width=表情部分のイメージ幅を指定することができます。デフォルトは100です,
margin_face=表情部分の画面端のf空間を変更することができます。デフォルトは20です,
bgcolor=背景色を指定できます。0x000000形式で指定してください。,
left_bgcolor=左に表示するチャットの背景色デフォルトを指定できます。0x000000形式で指定してください。「transparent」を指定すると透明にできます,
right_bgcolor=中央に表示するチャットの背景色デフォルトを指定できます。0x000000形式で指定してください。「transparent」を指定すると透明にできます,
center_bgcolor=右に表示するチャットの背景色デフォルトを指定できます。0x000000形式で指定してください。「transparent」を指定すると透明にできます,
name_font_size=名前部分のフォントサイズを指定できます,
name_font_color=名前部分のフォント色を指定できます。0x000000形式で指定してください,
under_height=吹き出しが表示される高さを指定できます。つまり吹き出しがこの高さまできた時に吹き出しが上にスクロールされます。画面下にタップできるスペースを残せるくらいがよいでしょう。デフォルトは画面の高さの７割が自動的に設定されます。pxで指定してください,
margin_top=吹き出しの上部に空ける空間を指定できます。デフォルトは25です。,
zindex=レイヤの中での重なりを指定できます。値が大きいほど前に表示されます,
anim_time=数値を指定できます。0以上の値を指定すると、吹き出しがアニメーションしながら移動します。ミリ秒で指定してください,
se=吹き出しを表示する時に効果音を設定することができます
 #[end]
*/


TYRANO.kag.ftag.master_tag.chat_config = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
        
        "layer" : "",
        "face_width":"",//表情アイコンの横サイズ
        "margin_face":"", 
        
        "bgcolor":"", //背景色を指定できます。
        
        "left_bgcolor":"",
        "right_bgcolor":"",
        "center_bgcolor":"",
        
        "name_font_size":"",
        "name_font_color":"",
        "margin_top":"",
        
        "under_height":"", //最後の所 Under 
        "anim_time":"",
        "se":"", //デフォルトのSE
        
        "width":"",
        "height":"",
        "top":"",
        "left":"",
        
        "edit_mode":"",
        
        "backlog":""
        
    },

    start : function(pm) {
        
        var that = this;
        
        var chat_config = $.chatConfig();
        
        //背景色はすぐに変更してくれ
        if(pm.bgcolor !=""){
	    	$(".tyrano_base").find(".base_fore").css("background-image","");
	    	$(".tyrano_base").find(".base_fore").css("background-color",$.convertColor(pm.bgcolor));
	    }
	    
        //コンフィグを適応する
        TYRANO.kag.stat.tchat = $.extendObj(pm, chat_config);
        
        that.kag.ftag.nextOrder();
        
    }
        
};

/*
 #[chat_clear]
 :group
 ティラノストーリー
 :title
 チャットのクリア
 :exp
 チャットをすべてクリアします
 :sample

[chat_clear time=300 ]


:param
time=フェードアウトするための時間をミリ秒で指定できます。デフォルトは200ミリ秒
#[end]
*/

//チャットのクリア
TYRANO.kag.ftag.master_tag.chat_clear = {
    
    kag: TYRANO.kag,
	vital : [],
    	
    pm : {
        time:"200"
    },

    start : function(pm) {
        
        var that = this;
        
        var chat_config = $.chatConfig();
        
        //コンフィグを適応する
        TYRANO.kag.stat.tchat = $.extendObj(pm, chat_config);
        var target_layer = that.kag.layer.getLayer(chat_config.layer, pm.page);
        
        var j_area_chat = $.getAreaChat(target_layer);
        
        j_area_chat.fadeOut(parseInt(pm.time),function(){
                
            $(this).remove();
            chat_config.current_top = 0;
            that.kag.ftag.nextOrder();
        });
        
        
    }
        
};


/*
 #[chat_scroll]
 :group
 ティラノストーリー
 :title
 チャットのログ位置を指定位置に戻すことができます。
 :exp
 重要：chat_configでoverflow=hidden を指定する必要があります。
 これを行わないと、見えなくなった部分のログは削除されているので、遡ることができません。
 :sample
[chat_scroll direction="up" top=200  time=300 ]

:param

time=スクロールにかける時間をミリ秒で指定できます,
direction= up or down を指定。デフォルトはup。upを指定すると上方向に巻き戻ります,
effect=変化のエフェクトを指定します。指定できる文字列は以下の種類です。jswing｜def｜easeInQuad｜easeOutQuad｜easeInOutQuad｜easeInCubic｜easeOutCubic｜easeInOutCubic｜easeInQuart｜easeOutQuart｜easeInOutQuart｜easeInQuint｜easeOutQuint｜easeInOutQuint｜easeInSine｜easeOutSine｜easeInOutSine｜easeInExpo｜easeOutExpo｜easeInOutExpo｜easeInCirc｜easeOutCirc｜easeInOutCirc｜easeInElastic｜easeOutElastic｜easeInOutElastic｜easeInBack｜easeOutBack｜easeInOutBack｜easeInBounce｜easeOutBounce｜easeInOutBounce,
top=スクロールする幅を指定してください

#[end]
*/

//チャットのクリア
TYRANO.kag.ftag.master_tag.chat_scroll = {
    
    kag: TYRANO.kag,
	vital : ["top"],
    	
    pm : {
        time:"500",
        direction:"up",
        effect:"easeInQuad",
        top:""
    },

    start : function(pm) {
        
        var that = this;
        
        var chat_config = $.chatConfig();
        
        var target_layer = that.kag.layer.getLayer(chat_config.layer, "fore");
        var j_area_chat = $.getAreaChat(target_layer);
        
        var num_target = target_layer.find(".tchat_talked").length;
        var cnt_target = 0;
        
        var top = "+=" + pm.top;
            
        if(pm.direction=="down"){
            top = "-=" + pm.top;
            chat_config.current_scroll -= parseInt(pm.top);
        }else{
            top = "+=" + pm.top;
            chat_config.current_scroll += parseInt(pm.top);
        }
        
        j_area_chat.find(".tchat_talked").each(function(){
                
            var j_obj = $(this);
            
            j_obj.animate(
                {"top":top},
                parseInt(pm.time), 
                pm.effect,
                function(){
                    cnt_target++;
                    if(num_target == cnt_target){
                        that.kag.ftag.nextOrder();
                    }
                                    
                }
            );
        
        });
        
        
    }
        
};


