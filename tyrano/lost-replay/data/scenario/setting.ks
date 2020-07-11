;一番最初に呼び出されるファイル

[title name="ティラノストーリー"]

[stop_keyconfig]


;ゲームで必ず必要な初期化処理はこのファイルに記述するのがオススメ

;メッセージボックスは非表示
@layopt layer="message" visible=false

;最初は右下のメニューボタンを非表示にする
[hidemenubutton]

;タイトル画面へ移動
@jump storage="scene1.ks"

[s]


