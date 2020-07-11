;ティラノストーリー　サンプルゲーム

*start

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


;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=40 x=50 y=930]

;上記で定義した領域がキャラクターの名前表示であることを宣言（これがないと#の部分でエラーになります）
[chara_config ptext="chara_name_area"]

;このゲームで登場するキャラクターを宣言
;akane
[chara_new  name="akane" storage="chara/akane/normal.png" jname="あかね"  ]
;キャラクターの表情登録
[chara_face name="akane" face="angry" storage="chara/akane/angry.png"]
[chara_face name="akane" face="doki" storage="chara/akane/doki.png"]
[chara_face name="akane" face="happy" storage="chara/akane/happy.png"]
[chara_face name="akane" face="sad" storage="chara/akane/sad.png"]

;yamato
[chara_new  name="yamato"  storage="chara/yamato/normal.png" jname="やまと" ]

;プラグインの呼び出し
[plugin name="chat_story" ]

[font size=26 ]
[chat_config face_width=100 under_height=700 ]

;===============ここからチャット部分 ==========================

[chat_talk pos="center"  graphic="chat/logo.png" bgcolor="0x000000" ]
[p]

[chat_talk pos="right" name="やまと" text="おーい" face="chat/yamato/normal.png" delay=1000  ]
[p]

[chat_talk pos="right" name="やまと" text="あかねー" face="chat/yamato/normal.png" ]
[p]

[chat_talk pos="left" name="あかね" text="なんだい？"  face="chat/akane/hirameki.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="あ、いた。" face="chat/yamato/tameiki.png"]
[p]

[chat_talk pos="right" name="やまと" text="もう、待ち合わせ場所についてるよ。" face="chat/yamato/normal.png"]
[p]

[chat_talk pos="right" name="やまと" graphic="chat/picture/station.jpg" graphic_width=300 face="chat/yamato/normal.png" ]
[p]

[chat_talk pos="right" name="やまと" text="いまどこ？"  face="chat/yamato/normal.png" ]
[p]

[chat_talk pos="left" name="あかね" text="あ"  face="chat/akane/normal.png" ]
[p]

[chat_talk pos="right" name="やまと" text="あ？" face="chat/yamato/odoroki.png"]
[p]

[chat_talk pos="right" name="やまと" text="さては、、、" face="chat/yamato/odoroki.png" bottom=300 width=300 ]
[wait time=500]

[glink color="white" text="迷った？" width=160 x=410 y=440 target="*select1" ]
[glink color="white" text="電車？" width=160   x=410 y=520 target="*select2" ]
[glink color="white" text="駅？" width=160   x=410 y=600 target="*select3" ]

[s]

*select1
[chat_talk pos="right" name="やまと" text="道に迷っちゃった？" face="chat/yamato/odoroki.png" ]
@jump target="common1"

*select2
[chat_talk pos="right" name="やまと" text="電車で移動中？" face="chat/yamato/odoroki.png" ]
@jump target="common1"

*select3
[chat_talk pos="right" name="やまと" text="もう駅についてる？" face="chat/yamato/odoroki.png" ]
@jump target="common1"
*common1

[p]

[chat_talk pos="left" name="あかね" text="ぶっぶー"  face="chat/akane/egao.png" delay=1500 ]
[p]

[chat_talk pos="left" name="あかね" text="正解は、、、"  face="chat/akane/egao.png" ]
[p]

[chat_talk pos="left" name="あかね" text="寝てた" graphic_width=200 graphic="chat/picture/neko.png" face="chat/akane/kira.png" delay=1500 ]
[p]


[chat_talk pos="right" name="やまと" text="、、、、"  face="chat/yamato/iya.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="待ってる"  face="chat/yamato/iya.png" delay=1000 ]
[p]


[chat_talk pos="left" name="あかね" graphic="chat/picture/gomen.png" graphic_width=100  face="chat/akane/naki.png" ]
[p]

[chat_talk pos="center"  text="１０分後" ]
[p]

[chat_talk pos="right" name="やまと" text="今どこ？"  face="chat/yamato/normal.png" delay=1000 ]
[p]

[chat_talk pos="left" name="あかね" face="chat/akane/naki.png" graphic="chat/gif/mona_chari.gif" graphic_width=120]
[p]

[chat_talk pos="center"  text="さらに１０分後" ]
[p]

[chat_talk pos="right" name="やまと" text="今どこ？？"  face="chat/yamato/normal.png" delay=1000 ]
[p]

[chat_talk pos="left" name="あかね" face="chat/akane/naki.png" graphic="chat/picture/train.jpg" graphic_width=300 delay=2000]
[p]

[chat_talk pos="center" text="さらに１０分後" ]
[p]

[chat_talk pos="right" name="やまと" text="今どこ？？？"  face="chat/yamato/normal.png" delay=1000 ]
[p]

[chat_talk pos="left" name="あかね" text="ここ"  face="chat/akane/normal.png" delay=1000 ]
[p]

[chat_talk pos="right" name="やまと" text="どこ？"  face="chat/yamato/odoroki.png" ]
[p]

[chat_talk pos="left" name="あかね" face="chat/akane/normal.png" graphic="chat/picture/koko.png" graphic_width=300 delay=2000]
[p]

*dev

[chat_talk pos="right" name="やまと" text="あれ、、これ俺が写って、、、、"  face="chat/yamato/normal.png" ]
[p]

[mask time=1000 graphic="chat/picture/wa.png" folder="fgimage" effect="bounceIn"]

[chat_clear ]
[bg storage="station.png" time=1000 ]
[mask_off]

[layopt layer="message0" visible=true ]

[font color="0xFFFFFF" size=40 ]
#やまと
ぎゃああああああ[p]

[chara_show name="akane" width=800 top=100 left=20 ]

#あかね
あ、びっくりした？ [p]

#やまと
遅刻してよく[r]
そんなことできるね。。。？[p]

#あかね
ごめんごめん、で、[r]
今日はなんだっけ？ [p]

#やまと
新ツールの[r]「ティラノストーリー」について説明しなきゃでしょ。[p]

[chara_mod name="akane" face="happy" ]

#あかね
あっ、そうだった。[p]
コレ便利だよね〜。[p]

#やまと
じゃあ、もう一度。[r]
「チャットメッセージ」に戻るね[p]

[chara_hide_all]
[font size=26 color="0x000000"]
[layopt layer="message0" visible=false ]

[bg storage="station_dark.png" time=1000 ]

[chat_config name_font_color="0xFFFFFF"]

[chat_talk pos="right" name="やまと" text="こんな風に"  face="chat/yamato_f/normal.png" ]
[p]

[chat_talk pos="right" name="やまと" text="背景も自由に設定できるんだね"  face="chat/yamato_f/normal.png" ]
[p]

[chat_talk pos="left" name="あかね" text="メッセージアプリのような状況でも使えるし"  face="chat/akane_f/normal.png" ]
[p]

[chat_talk pos="left" name="あかね" text="会話シーンのように使ってもいいかもね"  face="chat/akane_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="特に強力なのが"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="ティラノスクリプトの全機能が使用できる点だよ"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="left" name="あかね" text="それって、やりたい放題じゃ。。。"  face="chat/akane_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="うん。じゃあBGMを再生してみるね"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="center"  text="注意：音が鳴ります"  ]
[p]

[playbgm storage="music.ogg" volume=40]

[chat_talk pos="left" name="あかね" text="他にもマスク機能を使えば、、"  face="chat/akane_f/normal.png"  ]
[p]

[chat_talk pos="left" name="あかね" text="ねぇねぇ、海で撮った写真みてよ"  face="chat/akane_f/normal.png"  ]
[p]

[mask time=1000 effect="slideInUp" graphic="chat/picture/still.png" folder="fgimage" ]
[wait time=2000]
[mask_off time=500 effect="slideOutDown"]

[chat_talk pos="right" name="やまと" text="おお〜、写真アプリが起動したみたいな演出！"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="left" name="あかね" text="選択肢で分岐したり"  face="chat/akane_f/normal.png"  ]
[p]

[chat_talk pos="left" name="あかね" text="ゲーム性の高い作品にもつくれそう"  face="chat/akane_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="作成したゲームは"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="PCゲーム"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="ブラウザゲーム"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="Android"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="iPhoneなど"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="色々な環境で動作するよ"  face="chat/yamato_f/normal.png"  ]
[p]

[chat_talk pos="left" name="あかね" text="よーし"  face="chat/akane_f/normal.png"  ]
[p]

[chat_talk pos="left" name="あかね" text="さっそく、作品をつくってやるぞ!"  face="chat/akane_f/normal.png"  ]
[p]

[playse storage="shakin.ogg" volue="40"]
[chat_talk pos="center" graphic_width=600 bgcolor="transparent" graphic="chat/picture/akane_eye.png"  ]
[p]

[chat_talk pos="right" name="やまと" text="やるぞーー！"  face="chat/yamato_f/normal.png"  ]
[p]

[playse storage="shakin.ogg" volue="40"]
[chat_talk pos="center" graphic_width=600 bgcolor="transparent" graphic="chat/picture/yamato_eye.png"  ]
[p]


[stopbgm]

[chat_talk pos="center" text="おわり" ]

[s]






[s]
