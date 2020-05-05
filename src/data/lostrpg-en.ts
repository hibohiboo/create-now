export const abilitiesColumns = [
  { title: 'name', field: 'name' },
  { title: 'group', field: 'group' },
  { title: 'type', field: 'type' },
  { title: 'specialty', field: 'specialty' },
  { title: 'target', field: 'target' },
  { title: 'recoil', field: 'recoil' },
  { title: 'effect', field: 'effect' },
]

export const itemsColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Number', field: 'number', type: 'numeric' as 'numeric' },
  { title: 'Value', field: 'j', type: 'numeric' as 'numeric' },
  { title: 'Weight', field: 'weight', type: 'numeric' as 'numeric' },
  { title: 'Type', field: 'type' },
  { title: 'Area', field: 'area' },
  { title: 'Specialty', field: 'specialty' },
  { title: 'Target', field: 'target' },
  { title: 'Trait', field: 'trait' },
  { title: 'Effect', field: 'effect' },
]

export const equipmentColumns = [
  { title: 'Type', field: 'type' },
  { title: 'Specialty', field: 'specialty' },
  { title: 'Target', field: 'target' },
  { title: 'Trait', field: 'trait' },
  { title: 'Effect', field: 'effect' },
]

export const statusAilments = [
  {
    name: 'Poison',
    effect:
      'Character takes 1D6 damage to their [Stamina] at the end of each round. Does not cause Body Part damage.',
  },
  {
    name: 'Burning',
    effect:
      'At the end of each round, character takes 1 damage to [Willpower] and [Stamina]。',
  },
  {
    name: 'Paralysis',
    effect: 'The results of all checks made by this character are -1',
  },
  {
    name: 'Captured',
    effect: 'The results of all Hit Checks made by this character are -1.',
  },
  {
    name: 'Downed',
    effect: 'The results of all Evasion Checks made by this character are -2.',
  },
  {
    name: 'Heavily Wounded',
    effect: 'The results of all Death Checks made by this character are -1.',
  },
  {
    name: 'Exposed',
    effect:
      'All data on this character is revealed. Also, all damage dealt to this character through attacks is +1.',
  },
]

export const classList = [
  { name: 'Big', id: 'big' },
  { name: 'Little', id: 'little' },
  { name: 'Adult', id: 'adult' },
  { name: 'New Age', id: 'newage' },
  { name: 'Wounded', id: 'wounded' },
  { name: 'Fighter', id: 'fighter' },
  { name: 'Scout', id: 'scout' },
  { name: 'Hunter', id: 'hunter' },
  { name: 'Professor', id: 'professor' },
  { name: 'Worker', id: 'worker' },
  { name: 'Hope', id: 'hope' },
  { name: 'Mama', id: 'mama' },
]

export const abilityList = [
  {
    name: 'General',
    id: 'general',
    list: [
      {
        name: '武器攻撃',
        group: '汎用',
        type: '攻撃',
        recoil: '0',
        specialty: '自由',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、装備中の《指定特技》が一致している武器1つの[攻撃力]点のダメージを与える。この時、命中判定の達成値にプラス2の修正がつく。指定特技ごとに別の【アビリティ】として扱う。',
      },
      {
        name: 'かばう',
        group: '汎用',
        type: '割込み',
        recoil: '2',
        specialty: '《受ける》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、キャラクター1人のダメージを肩代わりできる。',
      },
      {
        name: '見切り',
        group: '汎用',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect:
          '回避判定に組み合わせて使用する。回避判定の指定特技を《かわす/胴部9》に変更する。',
      },
      {
        name: '強打',
        group: '汎用',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。命中した攻撃のダメージを1増加させる。',
      },
      {
        name: '応急手当',
        group: '汎用',
        type: '支援',
        recoil: '3',
        specialty: '《手当》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象の【体力】が1点増加する。',
      },
      {
        name: '足払い',
        group: '汎用',
        type: '攻撃',
        recoil: '3',
        specialty: '《しゃがむ》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『転倒』の変調を与える。',
      },
      {
        name: '乱舞',
        group: '汎用',
        type: '補助',
        recoil: '8',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。命中した攻撃のダメージを3増加させる。',
      },
      {
        name: '集中',
        group: '汎用',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。命中判定の達成値にプラス1の修正がつく。',
      },
      {
        name: 'たからもの',
        group: '汎用',
        type: '割込み',
        recoil: '3',
        specialty: '-',
        target: '自身',
        effect:
          '自身の振ったダイス1つの出目を6にする。シナリオ1回。また、生死判定に失敗したとき、この【アビリティ】を失うことでそれを成功にできる。これには気力を消費しない。',
      },
      {
        name: '説得',
        group: '汎用',
        type: '攻撃',
        recoil: '6',
        specialty: '自由',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象の気力を2点減少させる。',
      },
    ],
  },
  {
    name: 'Big',
    id: 'big',
    list: [
      {
        name: 'におうだち',
        group: 'Big',
        type: '割込み',
        recoil: '5',
        specialty: '《塞ぐ》',
        target: '自身',
        effect:
          '指定特技の判定に成功すると、今行われている攻撃の対象を自分1人に変更する。',
      },
      {
        name: '鉄拳',
        group: 'Big',
        type: '攻撃',
        recoil: '0',
        specialty: '《殴る》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、1点のダメージを与える。このとき命中判定の達成値にプラス3の修正がつく。',
      },
      {
        name: '怪力',
        group: 'Big',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: '白兵攻撃や肉体を使った攻撃により与えるダメージが1点上昇する。',
      },
      {
        name: '頑強',
        group: 'Big',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: 'あなたの【体力】の「基準値」を2点増加する。',
      },
      {
        name: '馬鹿力',
        group: 'Big',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'あなたは「装備部位：両手」のアイテムを「装備部位：片手」として扱うことができる。',
      },
      {
        name: '押し倒し',
        group: 'Big',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect:
          '白兵攻撃や肉体を使った攻撃の命中判定に組み合わせて使用する。対象に『転倒』の変調を与える。',
      },
    ],
  },
  {
    name: 'Little',
    id: 'little',
    list: [
      {
        name: '痩身',
        group: 'Little',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: '回避判定の達成値にプラス1の修正がつく。',
      },
      {
        name: '両手利き',
        group: 'Little',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          '《利き腕》と《逆腕》の特技を追加で習得する。さらに、代用判定の時、腕部分野の上下のリストが繋がっているように扱う。',
      },
      {
        name: '奇襲',
        group: 'Little',
        type: '割込み',
        recoil: '5',
        specialty: '《隠れる》',
        target: '自身',
        effect:
          '戦闘開始時の先制判定の前に使用する。指定特技の判定に成功すると、追加行動を得る。',
      },
      {
        name: 'アクロバット',
        group: 'Little',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect: '回避判定に組み合わせて使用する。達成値にプラス2の修正がつく。',
      },
      {
        name: 'うろちょろ',
        group: 'Little',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect: '命中判定に組み合わせて使用する。対象の気力を1点減少させる。',
      },
      {
        name: '死角',
        group: 'Little',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect: '命中判定に組み合わせて使用する。達成値にプラス2の修正がつく。',
      },
    ],
  },
  {
    name: 'Adult',
    id: 'adult',
    list: [
      {
        name: '手練',
        group: 'Adult',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          '「アクション」の特技から１つ選択する。その特技は隣接する部位にダメージを受けても使用不能とならない。',
      },
      {
        name: '百戦錬磨',
        group: 'Adult',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: '命中判定の達成値にプラス1の修正がつく。',
      },
      {
        name: '人生経験',
        group: 'Adult',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'ギャップを2列塗りつぶすことができる。塗りつぶされたギャップは代用判定の際数えない。',
      },
      {
        name: '遭遇歴',
        group: 'Adult',
        type: '支援',
        recoil: '3',
        specialty: '《雑学》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『暴露』の変調を与える。',
      },
      {
        name: 'へそくり',
        group: 'Adult',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'キャラメイク時の初期Jにプラス3Jする。また、セッション開始時に3J獲得できる。',
      },
      {
        name: '旧友',
        group: 'Adult',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'あなたを訪ねて古い友人がやってくる。あなたはキャンプフェイズに任意の[タイミング：支援]のキャンプ人材表1つの効果を使用できる。人材のレベルは1とする。指定特技の判定は行うこと。',
      },
    ],
  },
  {
    name: 'New Age',
    id: 'newage',
    list: [
      {
        name: '火炎弾',
        group: 'New Age',
        type: '攻撃',
        recoil: '2',
        specialty: '《投げる》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『炎上』の変調を与える。',
      },
      {
        name: '発電',
        group: 'New Age',
        type: '割込み',
        recoil: '2',
        specialty: '《機械》',
        target: 'アイテム',
        effect: '指定特技の判定に成功すると、アイテム１つを「充電」できる。',
      },
      {
        name: '念動力',
        group: 'New Age',
        type: '割込み',
        recoil: '2',
        specialty: '《逸らす》',
        target: '単体',
        effect:
          'ダメージ適用の直前に使用する。指定特技の判定に成功するとダメージを1点軽減できる。',
      },
      {
        name: '治癒',
        group: 'New Age',
        type: '支援',
        recoil: '6',
        specialty: '《手当》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、対象の部位ダメージを1つ回復できる。ただし、この判定の達成値には[対象の部位ダメージ数]だけのマイナス修正がつく。',
      },
      {
        name: '突然変異',
        group: 'New Age',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'ムシ、ケモノ、ミュータントのグループアビリティからランダムに１つアビリティを習得できる。ただし、その反動が1増加する。常駐タイプのアビリティを習得した場合、【気力】の「基準値」が2点減少する。',
      },
      {
        name: '瞬間移動',
        group: 'New Age',
        type: '補助',
        recoil: '5',
        specialty: '-',
        target: '-',
        effect:
          '回避判定に組み合わせて使用する。回避に成功したとき、あなた以外のキャラクター1人も回避できたことになる。このアビリティを使用する場合、あなたが攻撃の対象でない場合にも回避判定を行える。',
      },
    ],
  },
  {
    name: 'Wounded',
    id: 'wounded',
    list: [
      {
        name: '銀の腕',
        group: 'Wounded',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'あなたはダメージを受ける時、先にそのダメージの命中部位を決める。＜キズ＞の部位に攻撃が命中した場合、そのダメージを無効化する。',
      },
      {
        name: '克服',
        group: 'Wounded',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'ギャップを2列塗りつぶすことができる。塗りつぶされたギャップは代用判定の際数えない。',
      },
      {
        name: '肉を斬らせて',
        group: 'Wounded',
        type: '割込み',
        recoil: '4',
        specialty: '《耐える》',
        target: '自身',
        effect:
          '自身が部位ダメージを受けた時に使用できる。指定特技の判定に成功すると自身は追加行動を得る。',
      },
      {
        name: '悪運',
        group: 'Wounded',
        type: '割込み',
        recoil: '3',
        specialty: 'なし',
        target: '単体',
        effect:
          '対象の判定の直後に使用。サイコロ1つの出目をマイナス1する。シナリオ3回。',
      },
      {
        name: 'リハビリ',
        group: 'Wounded',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          '＜キズ＞に隣接する8つのアクションの《特技》から１つ選び追加で習得する。このアクションは使用可能になる。',
      },
      {
        name: '刺し違え',
        group: 'Wounded',
        type: '割込み',
        recoil: '5',
        specialty: '《撃つ》',
        target: '単体',
        effect:
          'あなたが部位ダメージを受けた時に割り込んで使用する。指定特技の判定に成功すると、対象に、受けた部位ダメージと同じ部位ダメージを与える。',
      },
    ],
  },
  {
    name: 'Fighter',
    id: 'fighter',
    list: [
      {
        name: '渾身撃',
        group: 'Fighter',
        type: '攻撃',
        recoil: '3',
        specialty: '自由',
        target: '単体',
        effect:
          '指定特技の判定に成功すると対象に[装備している武器1つの攻撃力+3]点のダメージを与える。',
      },
      {
        name: '追撃',
        group: 'Fighter',
        type: '補助',
        recoil: '1',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。命中した攻撃のダメージを1増加させる。',
      },
      {
        name: '切り返し',
        group: 'Fighter',
        type: '割込み',
        recoil: '1',
        specialty: 'なし',
        target: '自身',
        effect: '命中判定の直後に使用する。その判定を振り直す。',
      },
      {
        name: '急所狙い',
        group: 'Fighter',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。その攻撃によるダメージは軽減されない。',
      },
      {
        name: 'なぎ払い',
        group: 'Fighter',
        type: '攻撃',
        recoil: '3',
        specialty: '《振る》',
        target: '3体',
        effect:
          '指定特技の判定に成功すると、3体までの対象に装備中の武器1つの[攻撃力]点のダメージを与える。',
      },
      {
        name: '一刀流',
        group: 'Fighter',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '-',
        effect: '装備している武器が1つだけの場合、武器の攻撃力が1点増加する。',
      },
    ],
  },
  {
    name: 'Scout',
    id: 'scout',
    list: [
      {
        name: '偵察',
        group: 'Scout',
        type: '割込み',
        recoil: '5',
        specialty: '《見つける》',
        target: '全体',
        effect:
          'ランダムエンカウントの表を振る直前に使用する。指定特技の判定に成功すると、表を振った後に、その遭遇を無視できるようになる。',
      },
      {
        name: 'マルチワーク',
        group: 'Scout',
        type: '割込み',
        recoil: '2',
        specialty: '《休まない》',
        target: '自身',
        effect:
          '探索フェイズの行動前に使用する。判定に成功すると、行動を2回行うことができる。同じ行動を選んでもよい。',
      },
      {
        name: 'とんずら',
        group: 'Scout',
        type: '支援',
        recoil: '3',
        specialty: '《逃げる》',
        target: '全体',
        effect:
          '指定特技の判定に成功すると、味方を好きなだけ選んで（自身含む）戦闘から撤退させることができる。ただし、この判定の達成値にはマイナス[自身以外に撤退させる人数]の修正がつく。',
      },
      {
        name: '踏破',
        group: 'Scout',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: '突破判定及び探索表による判定の達成値にプラス1の修正がつく。',
      },
      {
        name: '先手必勝',
        group: 'Scout',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '-',
        effect:
          '先制判定の達成値にプラス1の修正がつく。先攻で攻撃した場合のみ、あなたの与えるダメージにプラス1の修正がつく。',
      },
      {
        name: '小器用',
        group: 'Scout',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: 'あなたは補助タイプの特技を2つまで組み合わせられるようになる。',
      },
    ],
  },
  {
    name: 'Hunter',
    id: 'hunter',
    list: [
      {
        name: '毒矢',
        group: 'Hunter',
        type: '攻撃',
        recoil: '3',
        specialty: '《撃つ》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、1点のダメージを与える。その結果対象の【体力】が減少した場合、対象に『毒』の変調を与える。',
      },
      {
        name: '狙い撃ち',
        group: 'Hunter',
        type: '補助',
        recoil: '1',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。攻撃が命中した時、命中する部位が必ず任意となる。',
      },
      {
        name: '罠設置',
        group: 'Hunter',
        type: '攻撃',
        recoil: '2',
        specialty: '《罠》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『捕縛』の変調を与える。',
      },
      {
        name: '打込み',
        group: 'Hunter',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。攻撃が命中した時、対象に『重傷』の変調を与える。',
      },
      {
        name: '火炎瓶',
        group: 'Hunter',
        type: '攻撃',
        recoil: '3',
        specialty: '《投げる》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、対象に『炎上』の変調と1点のダメージを与える。',
      },
      {
        name: '影牢',
        group: 'Hunter',
        type: '支援',
        recoil: '3',
        specialty: '《追い込む》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、[対象が受けている変調]点のダメージを与える。',
      },
    ],
  },
  {
    name: 'Professor',
    id: 'professor',
    list: [
      {
        name: '観察眼',
        group: 'Professor',
        type: '支援',
        recoil: '3',
        specialty: '《考える》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『暴露』の変調を与える。',
      },
      {
        name: '弱点看破',
        group: 'Professor',
        type: '支援',
        recoil: '3',
        specialty: '《見つける》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、そのラウンドの間、味方の与えるダメージは軽減されない。',
      },
      {
        name: '戦術',
        group: 'Professor',
        type: '補助',
        recoil: '3',
        specialty: '-',
        target: '全体',
        effect:
          '先制判定に組み合わせて使用する。先制判定の達成値にプラス1の修正がつく。先制判定に成功した場合、味方全員が先攻で行動できる。',
      },
      {
        name: '爆発物',
        group: 'Professor',
        type: '攻撃',
        recoil: '4',
        specialty: '《科学》',
        target: '全体',
        effect:
          '指定特技の判定に成功すると敵全体に2点のダメージを与える。判定に失敗した場合、味方全員に2点のダメージを与える。この攻撃によるダメージは軽減できない。',
      },
      {
        name: '応用と実践',
        group: 'Professor',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'あなたの特技リストは技術と環境の分野が繋がっているものとして扱うことができる。',
      },
      {
        name: 'ピタゴラ',
        group: 'Professor',
        type: '支援',
        recoil: '2',
        specialty: '《地理》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、ラウンドの終了時に対象に2点のダメージを与える。この攻撃によるダメージは軽減できない。周囲の環境を利用した攻撃を行う。',
      },
    ],
  },
  {
    name: 'Worker',
    id: 'worker',
    list: [
      {
        name: '改造',
        group: 'Worker',
        type: '支援',
        recoil: '3',
        specialty: '《作る》',
        target: 'アイテム',
        effect:
          '武器1つを対象にする。指定特技の判定に成功すると、セッション中その武器の攻撃力にプラス1の修正を与える。',
      },
      {
        name: '愛刀',
        group: 'Worker',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          '装備している武器1つを愛刀として指定する。愛刀を使った命中判定の達成値にプラス1の修正がつく。さらに愛刀の[攻撃力]が1点増加する。',
      },
      {
        name: '限界突破',
        group: 'Worker',
        type: '補助',
        recoil: '-',
        specialty: '-',
        target: '-',
        effect:
          '武器を使用した攻撃の命中判定に組み合わせて使用する。攻撃に使用する武器の[攻撃力]を2倍にする。攻撃が終わった後、その武器は破壊される。',
      },
      {
        name: '目利き',
        group: 'Worker',
        type: '割込み',
        recoil: '1',
        specialty: '《鑑定》',
        target: '-',
        effect:
          '指定特技の判定に成功すると、ランダムにアイテムを入手する時の表の出目にプラス1かマイナス1の修正をつけることができる。',
      },
      {
        name: '修理',
        group: 'Worker',
        type: '割込み',
        recoil: '2',
        specialty: '《耐える》',
        target: 'アイテム',
        effect:
          '武器が破壊される時に割り込んで使用する。指定特技の判定に成功した場合、1D6を振る。5か6の出目が出た場合、その武器を修理しすぐにもう一度装備する。',
      },
      {
        name: '試作品',
        group: 'Worker',
        type: '攻撃',
        recoil: '3',
        specialty: '《作る》',
        target: '単体',
        effect:
          '食料・消耗品以外のアイテムを1つ消費する。指定特技の判定に成功すると、対象に1D6点のダメージを与える。',
      },
    ],
  },
  {
    name: 'Hope',
    id: 'hope',
    list: [
      {
        name: 'みなぎる力',
        group: 'Hope',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: 'あなたの【気力】の「基準値」にプラス3する。',
      },
      {
        name: '希望の光',
        group: 'Hope',
        type: '割込み',
        recoil: '3',
        specialty: 'なし',
        target: '単体',
        effect:
          '対象の判定の直後に使用。サイコロ1つの出目をプラス1する。シナリオ3回。',
      },
      {
        name: '幸運の星',
        group: 'Hope',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: 'あなたの行う行為判定では出目が6,5の時にもスペシャルとなる。',
      },
      {
        name: '揺らぐ運命',
        group: 'Hope',
        type: '割込み',
        recoil: '5',
        specialty: 'なし',
        target: '単体',
        effect: '対象の行為判定の直後に使用。その判定を振り直す。',
      },
      {
        name: '努力',
        group: 'Hope',
        type: '割込み',
        recoil: '3',
        specialty: '《休まない》',
        target: '単体',
        effect:
          '対象が何らかの表を振った直後に使用。その出目をプラス1かマイナス1する。',
      },
      {
        name: '因果応報',
        group: 'Hope',
        type: '補助',
        recoil: '6',
        specialty: '-',
        target: '-',
        effect:
          '回避判定に組み合わせて使用する。回避が成功した場合、あなたが受ける予定の攻撃の対象を攻撃者に移し替える。',
      },
    ],
  },
  {
    name: 'Mama',
    id: 'mama',
    list: [
      {
        name: '声援',
        group: 'Mama',
        type: '割込み',
        recoil: '3',
        specialty: '《伝える》',
        target: '単体',
        effect:
          '自分以外の判定の直前に使用する。指定特技の判定に成功すると対象の達成値にプラス2の修正がつく。',
      },
      {
        name: 'ごちそう',
        group: 'Mama',
        type: '支援',
        recoil: '2',
        specialty: '《料理》',
        target: '全体',
        effect:
          '人数分の食料を消費する。指定特技の判定に成功すると全員の【気力】が1D6点増加し、【体力】が1点増加する。戦闘中は使用できない。',
      },
      {
        name: '激励',
        group: 'Mama',
        type: '支援',
        recoil: '2',
        specialty: '《叫ぶ》',
        target: '単体',
        effect: '指定特技の判定に成功すると対象の【気力】が3点増加する。',
      },
      {
        name: 'ちちんぷいぷい',
        group: 'Mama',
        type: '割込み',
        recoil: '5',
        specialty: '《手当》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象の【体力】が3点増加する。',
      },
      {
        name: '節約',
        group: 'Mama',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: 'アイテム',
        effect:
          '自身が消耗品を使用した時に、1D6を振る。5か6が出た場合、そのアイテムは失われない。',
      },
      {
        name: 'なだめる',
        group: 'Mama',
        type: '割込み',
        recoil: '2',
        specialty: '《止める》',
        target: '単体',
        effect:
          '対象が本気状態を宣言した時に使用する。指定特技の判定に成功すると、そのラウンドの間、＜ヌシ＞は本気状態になれない。',
      },
    ],
  },
]

export const items = []