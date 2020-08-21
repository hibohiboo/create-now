;ティラノスクリプトサンプルゲーム

*start
; 共通設定/プラグイン読込
@call storage="common/common.ks"
[bg storage="forest.jpg" time="100"]

@hidemenubutton
;メッセージウィンドウの設定
[position layer="message0" left=160 top=500 width=1000 height=200 page=fore visible=true]

;文字が表示される領域を調整
[position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"]


;メッセージウィンドウの表示
@layopt layer=message0 visible=true

; キャラクターの準備
@call storage="common/characters.ks"
[chara_show  name="akane"]

[p]

