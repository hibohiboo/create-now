;ティラノストーリー　サンプルゲーム

*start
[plugin name="dice"]
;キー操作を無効にするか、有効にするかを設定するか。
[start_keyconfig]

;背景を設定する所
[bg storage="bgchat.png" time="100"]

;メニューボタンの表示
@showmenubutton

;メッセージウィンドウの設定
[position layer="message0" left=20 top=900 width=820 height=300 page=fore visible=false ]

;文字が表示される領域を調整
[position layer=message0 page=fore margint="95" marginl="50" marginr="70" marginb="60" ]



; キャラクターの準備
@call storage="common/characters.ks"
;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=40 x=50 y=930]
;プラグインの呼び出し
[plugin name="chat_story" ]

[font size=26 ]
[chat_config face_width=100 under_height=700 ]

; 文字色変更
[deffont color="0x242424"]
[resetfont]
;===============ここからチャット部分 ==========================
[p]
