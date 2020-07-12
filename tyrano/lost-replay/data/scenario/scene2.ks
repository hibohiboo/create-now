*start

[cm]
[clearfix]
[start_keyconfig]
[bg storage="lost/school.jpg" time="100"]
;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=180 y=510]

;上記で定義した領域がキャラクターの名前表示であることを宣言（これがないと#の部分でエラーになります）
[chara_config ptext="chara_name_area"]

;このゲームで登場するキャラクターを宣言
;akane
[chara_new  name="mugi" storage="chara/mugi/2020.7.7.png" jname="ムギ"  ]
[chara_new  name="morisaki" storage="chara/morisaki/2020.7.4trpg.png" jname="森崎"  ]
[chara_new  name="yumisaki" storage="chara/yumisaki/31c9557cc2654edf.png" jname="弓崎"  ]
[chara_new  name="yamato" storage="chara/yumisaki/animal_01_a.png" jname="ヤマト"  ]

[chara_sheet_add name="ムギ" chara_id="1" storage="./data/fgimage/chara/mugi/2020.7.7.png" auto_trim="false" local_file="2020.7.7.png" status='{"info":{"chara_name":"ムギ","age":"","sex":"","job":"ニューエイジ/センシ","commands":"","remarks":"10歳。女の子。\n小さくても力持ち。"},"array_forms":[{"type":"charaSheetInputCloneNumber","title":"ステータス","forms":[{"text":"体力基準値","panel":false,"number":5},{"text":"体力","panel":false,"number":10},{"text":"気力基準値","panel":false,"number":12},{"text":"気力","panel":false,"number":12},{"text":"所持限界","panel":false,"number":5}]},{"type":"charaSheetInputCloneNote","title":"容姿","forms":[{"textarea":"ウェーブかかった肩くらいの髪。\n前髪を麦の穂デザインの髪留めで止めている。\n頭に一本生えた小さな角。\n麦わら帽子で隠している。"}]},{"type":"charaSheetInputCloneCheckTable","title":"特技","array_th":[{"t":"技術","c":false,"k":1},{"t":"頭部","c":false,"k":1},{"t":"腕部","c":false,"k":1},{"t":"胴部","c":false,"k":1},{"t":"脚部","c":false,"k":1},{"t":"環境","c":false,"k":1}],"array_tr":[[{"t":"追跡","c":false,"k":1},{"t":"聴く","c":false,"k":1},{"t":"操作","c":false,"k":1},{"t":"塞ぐ","c":false,"k":1},{"t":"泳ぐ","c":false,"k":1},{"t":"地理","c":false,"k":1}],[{"t":"探索","c":true,"k":1},{"t":"感覚器","c":false,"k":1},{"t":"殴る","c":false,"k":1},{"t":"呼吸器","c":true,"k":1},{"t":"走る","c":false,"k":1},{"t":"休まない","c":false,"k":1}],[{"t":"鑑定","c":false,"k":1},{"t":"見つける","c":false,"k":1},{"t":"斬る","c":false,"k":1},{"t":"止める","c":false,"k":1},{"t":"蹴る","c":false,"k":1},{"t":"待つ","c":false,"k":1}],[{"t":"手当","c":false,"k":1},{"t":"反応","c":false,"k":1},{"t":"利き腕","c":false,"k":1},{"t":"動かない","c":false,"k":1},{"t":"利き脚","c":false,"k":1},{"t":"捕らえる","c":true,"k":1}],[{"t":"雑学","c":false,"k":1},{"t":"閃く","c":false,"k":1},{"t":"撃つ","c":false,"k":1},{"t":"受ける","c":false,"k":1},{"t":"跳ぶ","c":false,"k":1},{"t":"隠れる","c":false,"k":1}],[{"t":"機械","c":false,"k":1},{"t":"脳","c":false,"k":1},{"t":"掴む","c":false,"k":1},{"t":"心臓","c":false,"k":1},{"t":"仕掛ける","c":false,"k":1},{"t":"休む","c":false,"k":1}],[{"t":"作る","c":false,"k":1},{"t":"考える","c":false,"k":1},{"t":"投げる","c":true,"k":1},{"t":"逸らす","c":false,"k":1},{"t":"しゃがむ","c":false,"k":1},{"t":"バランス","c":false,"k":1}],[{"t":"化学","c":false,"k":1},{"t":"予感","c":false,"k":1},{"t":"逆腕","c":false,"k":1},{"t":"かわす","c":false,"k":1},{"t":"逆脚","c":false,"k":1},{"t":"現れる","c":false,"k":1}],[{"t":"料理","c":false,"k":1},{"t":"叫ぶ","c":false,"k":1},{"t":"刺す","c":false,"k":1},{"t":"落ちる","c":false,"k":1},{"t":"滑る","c":false,"k":1},{"t":"追い込む","c":false,"k":1}],[{"t":"伝える","c":false,"k":1},{"t":"口","c":false,"k":1},{"t":"振る","c":true,"k":1},{"t":"消化器","c":false,"k":1},{"t":"踏む","c":true,"k":1},{"t":"逃げる","c":false,"k":1}],[{"t":"歌う","c":false,"k":1},{"t":"噛む","c":false,"k":1},{"t":"締める","c":false,"k":1},{"t":"耐える","c":false,"k":1},{"t":"歩く","c":false,"k":1},{"t":"罠","c":false,"k":1}]]},{"type":"charaSheetInputCloneTextTable","title":"アビリティ","array_th":["名前","グループ","タイプ","特技","対象","反動","効果"],"array_tr":[["火炎弾","ニューエイジ","攻撃","《投げる》","単体","2","指定特技の判定に成功すると、対象に『炎上』の変調を与える。"],["なぎ払い","センシ","攻撃","《振る》","3体","3","指定特技の判定に成功すると、3体までの対象に装備中の武器1つの[攻撃力]点のダメージを与える。"],["突然変異【鋭角】","ニューエイジ","補助","-","自身","2","ダメージ+1"],["たからもの","汎用","割込み","-","自身","3","自身の振ったダイス1つの出目を6にする。シナリオ1回。また、生死判定に失敗したとき、この【アビリティ】を失うことでそれを成功にできる。これには気力を消費しない。"],["切り返し","センシ","割込み","なし","自身","1","命中判定の直後に使用する。その判定を振り直す。"]]},{"type":"charaSheetInputCloneTextTable","title":"装備","array_th":["名前","タイプ","特技","対象","特性","効果"],"array_tr":[["投手の手袋","装備","-","自身","判定強化","《投げる》が指定特技の判定にプラス1の修正がつく。"]]},{"type":"charaSheetInputCloneTextTable","title":"アイテム","array_th":["名前","個数","価格","重量","タイプ","部位","特技","対象","特性","効果"],"array_tr":[["コカの葉",1,2,0,"割込み","-","-",null,"消耗品","【体力】を2点増加させる。"],["火付け道具",1,2,0,"道具","-","-",null,"","マッチやライター、火打ち石とほくちのセットなどのこと。焚き火があれば休憩しやすくなる。"],["嗜好品",1,3,0,"割込み","-","-",null,"消耗品","おやつやタバコなど。【気力】を2点増加させる。"],["嗜好品",1,3,0,"割込み","-","-",null,"消耗品","おやつやタバコなど。【気力】を2点増加させる。"]]},{"type":"charaSheetInputCloneTextTable","title":"追加装備","array_th":["名前","個数","価格","重量","タイプ","部位","特技","対象","特性","効果"],"array_tr":[["鎖（ムチ）",1,2,"武器","片手","《振る》《とらえる》",null,null,"攻撃力3。変調を持つ相手へのダメージ+1。変調が2つ以上ならダメージ+3。変調4つで+6。"],["麦わら帽子",1,1,null,"頭部",null,null,null,null]]},{"type":"charaSheetInputCloneTextTable","title":"リュックサック","array_th":["名前","個数","価格","重量","タイプ","部位","特技","対象","特性","効果"],"array_tr":[["ポリタンク",1,3,"道具","-","-",null,"","キャンプや水場で水を補充できる。水が補充されている場合、いつでもリミットの増加を試みることができる。一度使うと水はなくなる。空なら重量3、水を満タンにすると重量は8となる。"],["ジャーキー",2,1,"支援","-","-",null,"食料","1日分の食料。【気力】が1点増加する。通貨単位J。"]]},{"type":"charaSheetInputCloneNote","title":"詳細","forms":[{"textarea":"初期経験点20点。\nオリジナルアイテム・アビリティ使用。\n"}]}]}']
[chara_sheet_update_status name="ムギ" chara_id="1"]

[chara_sheet_delete_all]

[chara_show  name="morisaki"]
#森崎
[nowait]【プレイヤー】いのはら[r][endnowait]
クラス[r]
スカウト
[p]
特技[r]
《刺す》《跳ぶ》《逃げる》《休まない》《予感》《噛む》
[p]

アビリティ[r]
【武器攻撃:刺す】【とんずら】【攪乱】【マルチワーク】【先手必勝】
[p]

装備[r]
【片手】刺剣[r]
【胴部】サバイバルベスト
[p]
アイテム[r]
鎮痛剤、嗜好品、リュックサック
[p]
リュックサック[r]
カブトムシ
[p]

[chara_hide_all]
[chara_show  name="yamato"]
[chara_show  name="yumisaki"]

#弓崎
[nowait]【プレイヤー】すずらくと[r][endnowait]
クラス[r]
ハンター/カイヌシ[p]

特技[r]
《反応》　《叫ぶ》　《撃つ》《投げる》　《隠れる》　《罠》
[p]

アビリティ[r]
【相棒】【コンビネーション】【毒矢】【猟師】
[p]

装備[r]
【両手】ボウガン[r]
【頭部】ゴーグル
[p]
アイテム[r]
矢筒、矢(30本)、リュックサック、手書きのメモ
[p]

[chara_hide_all]
[chara_show  name="mugi"]

#ムギ
[nowait]【プレイヤー】ひぼ[r][endnowait]
クラス[r]
ニューエイジ/センシ[p]

特技[r]
《振る》《捕らえる》《投げる》《探索》《呼吸器》《踏む》
[p]

アビリティ[r]
【突然変異：鋭角】【なぎ払い】【火炎弾】【たからもの】
[p]

装備[r]
【片手】鎖(ムチ相当)[r]
【頭部】麦わら帽子(お洒落な服相当)[r]
【腕部】籠手

[p]
アイテム[r]
火付け道具
[p]

@jump storage=scene3.ks
