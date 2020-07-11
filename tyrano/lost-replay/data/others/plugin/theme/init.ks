; ティラノスクリプト テーマプラグイン theme_kopanda_08
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/

[iscript]

//初期化
mp.font_color    = mp.font_color    || "0x66564C";
mp.name_color    = mp.name_color    || "0xfafafa";
mp.frame_opacity = mp.frame_opacity || "255";

// 既読テキストのフォントカラーを設定
// 設定は《未読テキストと同じ色》にしていますので必要に応じて編集してください
mp.font_color2   = mp.font_color2   || "0x66564C";

// Config.tjsで既読テキストのフォントカラーを「default」にしている場合はmp.font_color2は反映されません
if(TG.config.alreadyReadTextColor != "default"){
  TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

;キャラシのテーマ
[chara_sheet_theme theme="Brown"]

;名前部分のメッセージレイヤ削除
[free name="chara_name_area" layer="message0"]

;メッセージウィンドウの設定
[position layer="message0" width="1280" height="210" top="515" left="0"]
[position layer="message0" frame="../others/plugin/theme/image/frame_message.png" margint="50" marginl="140" marginr="150" opacity="&mp.frame_opacity" page="fore"]

;名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="26" bold="true" x="30" y="524" width="340" align="center"]
[chara_config ptext="chara_name_area"]

;デフォルトのフォントカラー指定
[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

;===========================
; 機能ボタンを表示するマクロ
;===========================
;機能ボタンを表示したいシーンで[add_theme_button]と記述してください（消去は[clreafix]タグ）
[macro  name="add_theme_button"]

;歯車ボタン（メニューボタン）非表示
[hidemenubutton]

; ロールボタン配置

;クイックセーブボタン
[button name="role_button" role="quicksave" graphic="../others/plugin/theme/image/button/qsave.png" enterimg="../others/plugin/theme/image/button/qsave2.png" x="152" y="693"]

;クイックロードボタン
[button name="role_button" role="quickload" graphic="../others/plugin/theme/image/button/qload.png" enterimg="../others/plugin/theme/image/button/qload2.png" x="234" y="693"]

;セーブボタン
[button name="role_button" role="save" graphic="../others/plugin/theme/image/button/save.png" enterimg="../others/plugin/theme/image/button/save2.png" x="316" y="693"]

;ロードボタン
[button name="role_button" role="load" graphic="../others/plugin/theme/image/button/load.png" enterimg="../others/plugin/theme/image/button/load2.png" x="398" y="693"]

;オートボタン
[button name="role_button" role="auto" graphic="../others/plugin/theme/image/button/auto.png" enterimg="../others/plugin/theme/image/button/auto2.png" x="480" y="693"]

;スキップボタン
[button name="role_button" role="skip" graphic="../others/plugin/theme/image/button/skip.png" enterimg="../others/plugin/theme/image/button/skip2.png" x="562" y="693"]

;バックログボタン
[button name="role_button" role="backlog" graphic="../others/plugin/theme/image/button/log.png" enterimg="../others/plugin/theme/image/button/log2.png" x="644" y="693"]

;フルスクリーン切替ボタン
[button name="role_button" role="fullscreen" graphic="../others/plugin/theme/image/button/screen.png" enterimg="../others/plugin/theme/image/button/screen2.png" x="726" y="693"]

;コンフィグボタン（※sleepgame を使用して config.ks を呼び出しています）
[button name="role_button" role="sleepgame" graphic="../others/plugin/theme/image/button/sleep.png" enterimg="../others/plugin/theme/image/button/sleep2.png" storage="../others/plugin/theme/config.ks" x="808" y="693"]

;メニュー呼び出しボタン（※ロールボタンを使うなら不要）
[button name="role_button" role="menu" graphic="../others/plugin/theme/image/button/menu.png" enterimg="../others/plugin/theme/image/button/menu2.png" x="890" y="693"]

;メッセージウィンドウ非表示ボタン
[button name="role_button" role="window" graphic="../others/plugin/theme/image/button/close.png" enterimg="../others/plugin/theme/image/button/close2.png" x="972" y="693"]

;タイトルに戻るボタン
[button name="role_button" role="title" graphic="../others/plugin/theme/image/button/title.png" enterimg="../others/plugin/theme/image/button/title2.png" x="1054" y="693"]

[endmacro]

;===========================
;システムで利用するHTML,CSSの設定
;===========================
;セーブ画面
[sysview type="save" storage="./data/others/plugin/theme/html/save.html" ]
;ロード画面
[sysview type="load" storage="./data/others/plugin/theme/html/load.html" ]
;バックログ画面
[sysview type="backlog" storage="./data/others/plugin/theme/html/backlog.html" ]
;メニュー画面
[sysview type="menu" storage="./data/others/plugin/theme/html/menu.html" ]
;CSS
[loadcss file="./data/others/plugin/theme/ts08.css"]


;===========================
;画像のプリロード
;===========================

[iscript]

f.theme_img_list = [
'./data/others/plugin/theme/image/config/c_btn.gif',
'./data/others/plugin/theme/image/config/set1.png',
'./data/others/plugin/theme/image/config/set2.png',
'./data/others/plugin/theme/image/config/c_btn_back.png',
'./data/others/plugin/theme/image/config/c_btn_back2.png',
'./data/others/plugin/theme/image/config/bg_config.png',
'./data/others/plugin/theme/image/config/skip_on.png',
'./data/others/plugin/theme/image/config/skip_off.png',

'./data/others/plugin/theme/image/system/arrow_down.png',
'./data/others/plugin/theme/image/system/arrow_next.png',
'./data/others/plugin/theme/image/system/arrow_prev.png',
'./data/others/plugin/theme/image/system/arrow_up.png',
'./data/others/plugin/theme/image/system/menu_button_close.png',
'./data/others/plugin/theme/image/system/menu_button_close2.png',
'./data/others/plugin/theme/image/system/menu_button_load.png',
'./data/others/plugin/theme/image/system/menu_button_load2.png',
'./data/others/plugin/theme/image/system/menu_button_save.png',
'./data/others/plugin/theme/image/system/menu_button_save2.png',
'./data/others/plugin/theme/image/system/menu_button_skip.png',
'./data/others/plugin/theme/image/system/menu_button_skip2.png',
'./data/others/plugin/theme/image/system/menu_button_title.png',
'./data/others/plugin/theme/image/system/menu_button_title2.png',
'./data/others/plugin/theme/image/system/menu_load_bg.png',
'./data/others/plugin/theme/image/system/menu_log_bg.png',
'./data/others/plugin/theme/image/system/menu_message_close.png',
'./data/others/plugin/theme/image/system/menu_message_close2.png',
'./data/others/plugin/theme/image/system/menu_save_bg.png',
'./data/others/plugin/theme/image/system/saveslot.png',

'./data/others/plugin/theme/image/button/auto.png',
'./data/others/plugin/theme/image/button/auto2.png',
'./data/others/plugin/theme/image/button/close.png',
'./data/others/plugin/theme/image/button/close2.png',
'./data/others/plugin/theme/image/button/load.png',
'./data/others/plugin/theme/image/button/load2.png',
'./data/others/plugin/theme/image/button/log.png',
'./data/others/plugin/theme/image/button/log2.png',
'./data/others/plugin/theme/image/button/menu.png',
'./data/others/plugin/theme/image/button/menu2.png',
'./data/others/plugin/theme/image/button/qload.png',
'./data/others/plugin/theme/image/button/qload2.png',
'./data/others/plugin/theme/image/button/qsave.png',
'./data/others/plugin/theme/image/button/qsave2.png',
'./data/others/plugin/theme/image/button/save.png',
'./data/others/plugin/theme/image/button/save2.png',
'./data/others/plugin/theme/image/button/screen.png',
'./data/others/plugin/theme/image/button/screen2.png',
'./data/others/plugin/theme/image/button/skip.png',
'./data/others/plugin/theme/image/button/skip2.png',
'./data/others/plugin/theme/image/button/sleep.png',
'./data/others/plugin/theme/image/button/sleep2.png',
'./data/others/plugin/theme/image/button/title.png',
'./data/others/plugin/theme/image/button/title2.png',

'./data/others/plugin/theme/image/frame_message.png'

];

[endscript]

[preload storage="&f.theme_img_list" wait="false"]

;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
[loadjs storage="plugin/theme/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme/testMessagePlus/style.css"]

[macro name="test_message_start"]
[eval exp="gMessageTester.create()"]
[endmacro]

[macro name="test_message_end"]
[eval exp="gMessageTester.destroy()"]
[endmacro]

[macro name="test_message_reset"]
[eval exp="gMessageTester.currentTextNumber=0;gMessageTester.next(true)"]
[endmacro]

[return]
