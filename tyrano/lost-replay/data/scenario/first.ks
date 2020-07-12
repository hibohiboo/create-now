;一番最初に呼び出されるファイル

[title name="LOSTRPG リプレイ"]

[stop_keyconfig]

;ゲームで必ず必要な初期化処理はこのファイルに記述するのがオススメ
;コメント表示
[plugin name="comment_screen" ]
[plugin name="chara_sheet_screen" ]
[plugin name="dice"]
[plugin name="depth_mod"]

; 自分で定義したマクロ呼出
@call storage="macro/lost.ks"

;ティラノスクリプトが標準で用意している便利なライブラリ群
;コンフィグ、CG、回想モードを使う場合は必須
@call storage="tyrano.ks"
[call storage="system/chara_define.ks"]

;メッセージボックスは非表示
@layopt layer="message" visible=false

;最初は右下のメニューボタンを非表示にする
[hidemenubutton]

;タイトル画面へ移動
@jump storage="title.ks"
;コンフィグ設定に移動
;@jump storage="scene1.ks"

[s]


