*start

[cm]
[clearfix]
[start_keyconfig]
[bg2 storage="lost/school.jpg" time="100"]
;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=180 y=510]

;上記で定義した領域がキャラクターの名前表示であることを宣言（これがないと#の部分でエラーになります）
[chara_config ptext="chara_name_area"]

;このゲームで登場するキャラクターを宣言
;akane
[chara_new  name="mugi" storage="chara/mugi/2020.7.7.png" jname="ムギ"  ]

[chara_sheet_add name="ムギ" chara_id="1" storage="./data/fgimage/chara/mugi/2020.7.7.png" auto_trim="false" local_file="2020.7.7.png" status='{"info":{"chara_name":"ムギ","age":"","sex":"","job":"ニューエイジ/センシ","commands":"","remarks":"10歳。女の子。\n小さくても力持ち。"},"array_forms":[{"type":"charaSheetInputCloneNumber","title":"ステータス","forms":[{"text":"体力基準値","panel":false,"number":5},{"text":"体力","panel":false,"number":10},{"text":"気力基準値","panel":false,"number":12},{"text":"気力","panel":false,"number":12},{"text":"所持限界","panel":false,"number":5}]},{"type":"charaSheetInputCloneNote","title":"容姿","forms":[{"textarea":"ウェーブかかった肩くらいの髪。\n前髪を麦の穂デザインの髪留めで止めている。\n頭に一本生えた小さな角。\n麦わら帽子で隠している。"}]},{"type":"charaSheetInputCloneCheckTable","title":"特技","array_th":[{"t":"技術","c":false,"k":1},{"t":"頭部","c":false,"k":1},{"t":"腕部","c":false,"k":1},{"t":"胴部","c":false,"k":1},{"t":"脚部","c":false,"k":1},{"t":"環境","c":false,"k":1}],"array_tr":[[{"t":"追跡","c":false,"k":1},{"t":"聴く","c":false,"k":1},{"t":"操作","c":false,"k":1},{"t":"塞ぐ","c":false,"k":1},{"t":"泳ぐ","c":false,"k":1},{"t":"地理","c":false,"k":1}],[{"t":"探索","c":true,"k":1},{"t":"感覚器","c":false,"k":1},{"t":"殴る","c":false,"k":1},{"t":"呼吸器","c":true,"k":1},{"t":"走る","c":false,"k":1},{"t":"休まない","c":false,"k":1}],[{"t":"鑑定","c":false,"k":1},{"t":"見つける","c":false,"k":1},{"t":"斬る","c":false,"k":1},{"t":"止める","c":false,"k":1},{"t":"蹴る","c":false,"k":1},{"t":"待つ","c":false,"k":1}],[{"t":"手当","c":false,"k":1},{"t":"反応","c":false,"k":1},{"t":"利き腕","c":false,"k":1},{"t":"動かない","c":false,"k":1},{"t":"利き脚","c":false,"k":1},{"t":"捕らえる","c":true,"k":1}],[{"t":"雑学","c":false,"k":1},{"t":"閃く","c":false,"k":1},{"t":"撃つ","c":false,"k":1},{"t":"受ける","c":false,"k":1},{"t":"跳ぶ","c":false,"k":1},{"t":"隠れる","c":false,"k":1}],[{"t":"機械","c":false,"k":1},{"t":"脳","c":false,"k":1},{"t":"掴む","c":false,"k":1},{"t":"心臓","c":false,"k":1},{"t":"仕掛ける","c":false,"k":1},{"t":"休む","c":false,"k":1}],[{"t":"作る","c":false,"k":1},{"t":"考える","c":false,"k":1},{"t":"投げる","c":true,"k":1},{"t":"逸らす","c":false,"k":1},{"t":"しゃがむ","c":false,"k":1},{"t":"バランス","c":false,"k":1}],[{"t":"化学","c":false,"k":1},{"t":"予感","c":false,"k":1},{"t":"逆腕","c":false,"k":1},{"t":"かわす","c":false,"k":1},{"t":"逆脚","c":false,"k":1},{"t":"現れる","c":false,"k":1}],[{"t":"料理","c":false,"k":1},{"t":"叫ぶ","c":false,"k":1},{"t":"刺す","c":false,"k":1},{"t":"落ちる","c":false,"k":1},{"t":"滑る","c":false,"k":1},{"t":"追い込む","c":false,"k":1}],[{"t":"伝える","c":false,"k":1},{"t":"口","c":false,"k":1},{"t":"振る","c":true,"k":1},{"t":"消化器","c":false,"k":1},{"t":"踏む","c":true,"k":1},{"t":"逃げる","c":false,"k":1}],[{"t":"歌う","c":false,"k":1},{"t":"噛む","c":false,"k":1},{"t":"締める","c":false,"k":1},{"t":"耐える","c":false,"k":1},{"t":"歩く","c":false,"k":1},{"t":"罠","c":false,"k":1}]]},{"type":"charaSheetInputCloneTextTable","title":"アビリティ","array_th":["名前","グループ","タイプ","特技","対象","反動","効果"],"array_tr":[["火炎弾","ニューエイジ","攻撃","《投げる》","単体","2","指定特技の判定に成功すると、対象に『炎上』の変調を与える。"],["なぎ払い","センシ","攻撃","《振る》","3体","3","指定特技の判定に成功すると、3体までの対象に装備中の武器1つの[攻撃力]点のダメージを与える。"],["突然変異【鋭角】","ニューエイジ","補助","-","自身","2","ダメージ+1"],["たからもの","汎用","割込み","-","自身","3","自身の振ったダイス1つの出目を6にする。シナリオ1回。また、生死判定に失敗したとき、この【アビリティ】を失うことでそれを成功にできる。これには気力を消費しない。"],["切り返し","センシ","割込み","なし","自身","1","命中判定の直後に使用する。その判定を振り直す。"]]},{"type":"charaSheetInputCloneTextTable","title":"装備","array_th":["名前","タイプ","特技","対象","特性","効果"],"array_tr":[["投手の手袋","装備","-","自身","判定強化","《投げる》が指定特技の判定にプラス1の修正がつく。"]]},{"type":"charaSheetInputCloneTextTable","title":"アイテム","array_th":["名前","個数","価格","重量","タイプ","部位","特技","対象","特性","効果"],"array_tr":[["コカの葉",1,2,0,"割込み","-","-",null,"消耗品","【体力】を2点増加させる。"],["火付け道具",1,2,0,"道具","-","-",null,"","マッチやライター、火打ち石とほくちのセットなどのこと。焚き火があれば休憩しやすくなる。"],["嗜好品",1,3,0,"割込み","-","-",null,"消耗品","おやつやタバコなど。【気力】を2点増加させる。"],["嗜好品",1,3,0,"割込み","-","-",null,"消耗品","おやつやタバコなど。【気力】を2点増加させる。"]]},{"type":"charaSheetInputCloneTextTable","title":"追加装備","array_th":["名前","個数","価格","重量","タイプ","部位","特技","対象","特性","効果"],"array_tr":[["鎖（ムチ）",1,2,"武器","片手","《振る》《とらえる》",null,null,"攻撃力3。変調を持つ相手へのダメージ+1。変調が2つ以上ならダメージ+3。変調4つで+6。"],["麦わら帽子",1,1,null,"頭部",null,null,null,null]]},{"type":"charaSheetInputCloneTextTable","title":"リュックサック","array_th":["名前","個数","価格","重量","タイプ","部位","特技","対象","特性","効果"],"array_tr":[["ポリタンク",1,3,"道具","-","-",null,"","キャンプや水場で水を補充できる。水が補充されている場合、いつでもリミットの増加を試みることができる。一度使うと水はなくなる。空なら重量3、水を満タンにすると重量は8となる。"],["ジャーキー",2,1,"支援","-","-",null,"食料","1日分の食料。【気力】が1点増加する。通貨単位J。"]]},{"type":"charaSheetInputCloneNote","title":"詳細","forms":[{"textarea":"初期経験点20点。\nオリジナルアイテム・アビリティ使用。\n"}]}]}']
[chara_sheet_update_status name="ムギ" chara_id="1"]
2020年。7月某日。Discord上に一人のGMと3人のプレイヤーが集まりました。[lr]
目的は、LOST～廃墟の森の子供たち～のオンラインセッションです。[lr]
特殊なシチュエーションのキャンペーンのため、アイテムなどキャンペーン専用のものも出てきます。
[p]

# 【ゲームマスター(以下GM)】はぐれけだま
よろしくお願いします！！！[r]
いのはらさんとひぼさんとは遊ぶこと自体初なのでたのしみです[p]

# 【プレイヤー】 ひぼ いのはら すずらくと
よろしくお願いしまーす[p]

# GM
世界観は「隕石が落ちた影響でほとんどの文化が滅びた廃墟だらけの日本」です。[lr]
まずは、その世界で生きるキャラクターを作りましょう。[lr]
TRPGが初めてな、いのはらさんから作りますか。
[p]
# いのはら
お願いします…！
[p]

# GM
[nowait]①クラスの決定[endnowait][r]
クラスを１～２つ習得します。[lr]
クラスは、基本ルールには12種類あります。[lr]
ビッグ、[image layer=0 storage=lost/big.png width=250 height=250 visible=true x=10 y=10][l]
チビ、[image layer=0 storage=lost/tibi.png width=250 height=250 visible=true x=270 y=10][l]
オトナ、[image layer=0 storage=lost/otona.png width=250 height=250 visible=true x=530 y=10][l]
ニューエイジ、[image layer=0 storage=lost/new.png width=250 height=250 visible=true x=790 y=10][lr]

キズモノ、[image layer=0 storage=lost/kizu.png width=250 height=250 visible=true x=10 y=270][l]
センシ、[image layer=0 storage=lost/sensi.png width=250 height=250 visible=true x=270 y=270][l]
スカウト、[image layer=0 storage=lost/sukauto.png width=250 height=250 visible=true x=530 y=270][l]
ハンター、[image layer=0 storage=lost/hunter.png width=250 height=250 visible=true x=790 y=270][lr]

[freeimage layer=0 ]
ハカセ、[image layer=0 storage=lost/hakase.png width=250 height=250 visible=true x=10 y=10][l]
ショクニン、[image layer=0 storage=lost/syokunin.png width=250 height=250 visible=true x=270 y=10][l]
ホープ、[image layer=0 storage=lost/kibou.png width=250 height=250 visible=true x=530 y=10][l]
ママ。[image layer=0 storage=lost/mama.png width=250 height=250 visible=true x=790 y=10][lr]

サプリメントの終末列島百景で追加されたクラスからも選択できます。[lr]
[freeimage layer=0 ]
アキンド、[image layer=0 storage=lost/akindo.png width=250 height=250 visible=true x=10 y=10][l]
カイヌシ、[image layer=0 storage=lost/kainusi.png width=250 height=250 visible=true x=270 y=10][l]
オガミヤ、[image layer=0 storage=lost/ogamiya.png width=250 height=250 visible=true x=530 y=10][l]
アイドル、[image layer=0 storage=lost/idol.png width=250 height=250 visible=true x=790 y=10][lr]
ヤセイジの5種類が追加されています。[image layer=0 storage=lost/yaseizi.png width=250 height=250 visible=true x=10 y=270][p]


# いのはら
………………[lr]
長考しました…そしたらクラス　スカウトがいいですね…
[freeimage layer=0 ]
[image layer=0 storage=lost/sukauto.png width=250 height=250 visible=true x=10 y=10][p]

# GM
おお！！スカウト神・・・[lr]
実はパーティにひとり以上欲しいタイプのクラスです[lr]
スカウト１つにしますか！（２つえらべます）[p]

# いのはら
ひとつだと不利とかありますか？[p]

# GM
不利は特にないです！[lr]
１つに絞った場合は初期アビリティを余計に１つ習得できます[p]

# いのはら
じゃあひとつで大丈夫です！[p]

# GM
[nowait]②アビリティの決定[endnowait][r]
汎用と選んだクラスのアビリティから合計３つ選んで習得します。[l]
今回はスカウト一本ということで４つ習得できます[p]

# GM
汎用グループからオススメは「武器攻撃」、[l]
武器で攻撃したときに命中力+2されます（すごくたかいです）[lr]
気力の消費もなし[p]

# GM
スカウトからオススメはぜんぶです　ぜんぶほしいです[p]

[freeimage layer=0 ]
[layopt layer=0 visible=true]
[ability x=10 y=0 name=武器攻撃 group=汎用 specialty="" type="攻撃" recoil="-" target=単体 effect1="武器の[攻撃力]点のダメージを与える。" effect2="命中判定の達成値プラス2" ]


# いのはら
じゃあ武器攻撃[l]
[ability x=10 y=180 name=とんずら group=スカウト specialty="逃げる" type="支援"  target=全体 recoil="3" effect1="味方を好きなだけ選んで撤退させることができる。" effect2="達成値マイナス[自身以外に撤退させる人数]。" ]

　とんずら　[l]
[ability x=10 y=360 name=攪乱 group=スカウト specialty="-" type="補助"  target="-" recoil="2" effect1="組み合わせた攻撃が命中した場合" effect2="対象はラウンド間【対象：全体】のアビリティ使用不可。" ]

攪乱　[l]
[ability x=10 y=540 name=マルチワーク group=スカウト specialty="休まない" type="割込み"  target="自身" recoil="2" effect1="探索フェイズの行動前に使用する。" effect2="行動を2回行うことができる。" ]

マルチワーク　で[p]

# ひぼ
いいですね～。とても素早そうなこ[p]

# GM
[nowait]③武器の購入[endnowait]　[r]
好きな武器を選んで購入しましょう。[r]
あなたの所持Jは<20>です。[p]

[freeimage layer=0]
[item-table x=10 y=10 name=刺剣 weight=2 specialty="《刺す》《跳ぶ》" area="片手" type="装備"  target="単体"  effect1="攻撃力2。" effect2="先攻の場合、攻撃力+2。命中判定の達成値+2。" ]

# いのはら
刺剣かいます[p]

# すずらくと
かっこいい[p]

# GM
[freeimage layer=0]
[image layer=0 storage=lost/replay/blank-speacialty-table.png width=1280 height=560 visible=true x=%x_img y=%y_img color]

[nowait]④特技の決定[endnowait][r]
キャラクターの特技を特技表から6つ選んで決定します。[r]
②で選んだアビリティの指定特技、そして③で選んだ武器の指定特技を優先しましょう。[p]

# GM
アビリティや武器を使うときにこの特技が使用できない状況だと、　判定にすさまじいペナルティが入ります。[p]

# GM
困ったら　♪オススメ：余ったら《反応》《予感》《動かない》《走る》《隠れる》《追い込む》　から！[lr]
戦闘中の先制判定で使用する特技です。　あると敵に先行できる確率が高まります。[p]

# GM
《噛む》《斬る》あたりも　…………　このゲームの回避のシステム上、取っておくと有利になりやすいです[p]

# ひぼ
敵の動物、よく噛んできますね。攻撃に使われた特技が回避の特技になるので、《噛む》攻撃を避けるためには《噛む》特技が必要に。[p]

[image layer=0 storage=lost/replay/morisaki-speacialty-table.png width=1280 height=560 visible=true x=%x_img y=%y_img color]


#いのはら
刺す　跳ぶ　逃げる　休まない　予感　噛む　で[p]

# GM
！！！！　予感　何だか良いですね。[r]
この環境を生き抜くのに必要そう[p]


# GM
④特技　まで完璧に設定できました！[lr]
次に・・・　２０J - 6J(刺剣)　で余った１４Jで　アイテムと防具を買いましょう！[p]

# GM
[nowait]⑤アイテム・防具の購入[endnowait][r]
　武器を買って余ったJを使ってお買い物をしましょう。[lr]
　　♪オススメ：まず防具１つ[lr]
　　※この世界ではお買い物の機会が限られています。装備を真っ先に確保しましょう！[p]

# GM
お買い物できる機会がほんとうにすくないのでJは使い切っちゃうといいかもしれません！[r]
（J=ジャーキー、食料の意味　この世界ではオカネ）
[p]

#ひぼ
お店屋さんが毎日営業している世界ではないのです[p]

#GM
コンビニとかジャスコももれなく滅んでいます[p]

#いのはら
そんな・・・・(TT)[p]

#GM
ここでコマの編集方法をおしえます。[lr]
リュックサックは最初からみんなにプレゼントされています。[p]

#GM
1W(W=重量)以上のアイテムはリュックサックのなかに　　買った防具は「腕：」などに　かいていきましょう！[lr]
今回は特別に　「1W　カブトムシ」（効果なし）をプレゼントします[p]

#
ここで、オンセツールのチュートリアルを行いました。[p]
[freeimage layer=0]
[item-table x=10 y=10 name=サバイバルベスト weight=2 specialty="-" area="胴部" type="装備"  target="-" effect1="【体力基準値】+1。" effect2="" ]

#いのはら
装備買いました[p]
[freeimage layer=0]
[item-table x=10 y=10 name=鎮痛剤 weight=1 specialty="-" area="-" type="割込み"  target="自身" effect1="【体力】を3点増加させる。" effect2="変調を1つ回復する。" ]
[item-table x=10 y=190 name=嗜好品 weight=0 specialty="-" area="-" type="割込み"  target="自身" effect1="【気力】を2点増加させる。" effect2="おやつやタバコなど。" ]
[item-table x=10 y=370 name=リュックサック weight=2 specialty="-" area="-" type="道具"  target="-" effect1="総重量10まで袋の中にアイテムを入れることができる。" effect2="" ]

#いのはら
持物も買いました[p]
[freeimage layer=0]
[item-table x=10 y=10 name=かぶとむし weight=1 specialty="-" area="-" type="道具"  target="-" effect1="効果なし" effect2="" ]

#いのはら
リュックサックにかぶとむしを入れました。[p]

#GM
いのはらさんが鎮痛剤買ってくれてる・・・[lr]
嗜好品をしっかり外に出してる　IQ9000[lr]
リュックから取り出すのにはひと手間かかることを考慮している[p]

#ひぼ
戦闘中はリュックから出してる暇ほぼないですものねー[p]

#GM
鎮痛剤も貴重なものなので最初に買っておくの"良"～～～～[lr]
カブトムシずっと持ってる　立派にそだててね[p]

#いのはら
相棒って呼んでます[p]

#GM
あ！　あと、
経験点が実は２０配られているので……　成長が可能です[p]

#GM
気力基準値の上昇（10点）　特技の習得（15点）　アビリティの習得（15点）　体力基準値の上昇（20点）[lr]
おすすめはアビリティの習得です！
[p]


[freeimage layer=0 ]
[layopt layer=0 visible=true]
[ability x=10 y=0 name=先手必勝 group=スカウト specialty="-" type="常駐" recoil="-" target=自身 effect1="先制判定の達成値にプラス1の修正がつく。" effect2="先行時、与えるダメージ+1" ]

#いのはら
じゃあアビリティ習得します[p]

#GM
あとはキャラのなまえなどを決めて圧倒的完成です！[p]

#
ほかの二人もキャラクターを作って完成しました。[p]

[freeimage layer=0]



