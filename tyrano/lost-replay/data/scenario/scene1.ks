*start

[cm]
[clearfix]
[start_keyconfig]
[bg2 storage="lost/losttop.png" time="100"]
;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=180 y=510]

;上記で定義した領域がキャラクターの名前表示であることを宣言（これがないと#の部分でエラーになります）
[chara_config ptext="chara_name_area"]

;このゲームで登場するキャラクターを宣言
;akane
[chara_new  name="mugi" storage="chara/mugi/2020.7.7.png" jname="ムギ"  ]

[chara_sheet_add name="ムギ" chara_id="1" storage="./data/fgimage/chara/mugi/2020.7.7.png" auto_trim="false" local_file="2020.7.7.png" pos="Top"]
[chara_sheet_update_status name="ムギ" chara_id="1"]
#ムギ
テストですー[r]
