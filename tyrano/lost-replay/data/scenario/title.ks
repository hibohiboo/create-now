
[cm]

@clearstack
@bg storage ="lost/losttop.png" time=100
@wait time = 200

*start
; キャラクターの準備
@call storage="lost/characters.ks"
; ここからテスト
@jump target=gamestart4
[s]
; ここまでテスト

[glink target="gamestart" text="キャラクターメイキング" size=20 width="300" x=50 y=50]
[glink target="gamestart2" text="キャラクター紹介" size=20 width="300" x=50 y=100]
[glink target="gamestart3" text="【第一話】キャンプフェイズ" size=20 width="300" x=50 y=150]
[glink target="gamestart4" text="【第一話】探索フェイズ" size=20 width="300" x=50 y=200]

; glink color="blue" graphic="button/button_test.png" storage="scene1.ks" size="20" x="260" width="300" y="100" enterse="button_2.ogg"]
;[button x=135 y=230 graphic="title/button_start.png" enterimg="title/button_start2.png"  target="gamestart"]
;[button x=135 y=320 graphic="title/button_load.png" enterimg="title/button_load2.png" role="load" ]
;[button x=135 y=410 graphic="title/button_cg.png" enterimg="title/button_cg2.png" storage="cg.ks" ]
;[button x=135 y=500 graphic="title/button_replay.png" enterimg="title/button_replay2.png" storage="replay.ks" ]
;[button x=135 y=590 graphic="title/button_config.png" enterimg="title/button_config2.png" role="sleepgame" storage="config.ks" ]

[s]

*gamestart
;一番最初のシナリオファイルへジャンプする
@jump storage="scenes/session0/character-make.ks"

*gamestart2
@jump storage="scenes/session0/characters.ks"

*gamestart3
@jump storage="scenes/session1/camp.ks"
*gamestart4
@jump storage="scenes/session1/explorer.ks"
