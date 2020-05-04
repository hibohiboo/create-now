export const specialties = [
  '追跡',
  '探索',
  '鑑定',
  '手当',
  '雑学',
  '機械',
  '作る',
  '化学',
  '料理',
  '伝える',
  '歌う',
  '聴く',
  '感覚器',
  '見つける',
  '反応',
  '閃く',
  '脳',
  '考える',
  '予感',
  '叫ぶ',
  '口',
  '噛む',
  '操作',
  '殴る',
  '斬る',
  '利き腕',
  '撃つ',
  '掴む',
  '投げる',
  '逆腕',
  '刺す',
  '振る',
  '締める',
  '塞ぐ',
  '呼吸器',
  '止める',
  '動かない',
  '受ける',
  '心臓',
  '逸らす',
  'かわす',
  '落ちる',
  '消化器',
  '耐える',
  '泳ぐ',
  '走る',
  '蹴る',
  '利き脚',
  '跳ぶ',
  '仕掛ける',
  'しゃがむ',
  '逆脚',
  '滑る',
  '踏む',
  '歩く',
  '地理',
  '休まない',
  '待つ',
  '捕らえる',
  '隠れる',
  '休む',
  'バランス',
  '現れる',
  '追い込む',
  '逃げる',
  '罠',
]
export const bodyParts = [
  '脳',
  '利き腕',
  '利き脚',
  '消化器',
  '感覚器',
  '口',
  '呼吸器',
  '逆脚',
  '逆腕',
  '心臓',
]

export const specialtiesTableColumns = [
  '',
  '技術',
  'A',
  '頭部',
  'B',
  '腕部',
  'C',
  '胴部',
  'D',
  '脚部',
  'E',
  '環境',
]

export const defaultFacilities = [
  {
    name: '屋根',
    type: '常駐',
    specialty: '-',
    level: 1,
    effect: '全員の【気力基準値】をプラス1する。雨漏りしている。',
  },
  {
    name: '壁',
    type: '常駐',
    specialty: '-',
    level: 1,
    effect: '全員の【気力基準値】をプラス1する。隙間風が吹く。',
  },
  {
    name: '寝床',
    type: '常駐',
    specialty: '-',
    level: 1,
    effect: '全員の【気力基準値】にプラス2する。',
  },
  {
    name: '水場',
    type: '常駐',
    specialty: '-',
    level: 1,
    effect: '全員の【気力基準値】をプラス3する。水を汲める川が近くにある。',
  },
  {
    name: '倉庫',
    type: '常駐',
    specialty: '-',
    level: 1,
    effect:
      '[10]個までのアイテムを保存しておける。出し入れはキャンプでのみ可能。',
  },
  {
    name: '食料庫',
    type: '常駐',
    specialty: '-',
    level: 1,
    effect: '全員の【体力基準値】をプラス２する。',
  },
]
export const facilitiesColumns = [
  { title: '名前', field: 'name' },
  { title: 'タイプ', field: 'type' },
  { title: '特技', field: 'specialty' },
  {
    title: 'レベル',
    field: 'level',
    type: 'numeric' as 'numeric',
  },
  { title: '効果', field: 'effect' },
]

export const equipmentList = [
  {
    name: '水路',
    cp: '10',
    type: '常駐',
    specialty: '-',
    maxLv: '1',
    precondition: '水場',
    effect: '全員の【気力基準値】をプラス2する。川からキャンプまで水を引く。',
  },
  {
    name: '井戸',
    cp: '15',
    type: '常駐',
    specialty: '-',
    maxLv: '1',
    precondition: '',
    effect:
      '全員の【気力基準値】をプラス3する。水を汲める井戸がキャンプにある。',
  },
  {
    name: '物見やぐら',
    cp: '6',
    type: '常駐',
    specialty: '-',
    maxLv: '1',
    precondition: '',
    effect: '全員の【気力基準値】をプラス1する。',
  },

  {
    name: 'ドラムカン',
    cp: '1',
    type: '-',
    specialty: '-',
    maxLv: '1',
    precondition: '',
    effect: '水などを貯めることができる。',
  },
  {
    name: 'お風呂',
    cp: '3',
    type: '支援',
    specialty: 'なし',
    maxLv: '3',
    precondition: '水場、ドラムカン',
    effect: 'あなたの【気力基準値】が[レベル]点増加する。',
  },
  {
    name: '温泉',
    cp: '15',
    type: '支援',
    specialty: 'なし',
    maxLv: '3',
    precondition: '',
    effect: 'あなたの【気力基準値】と【体力基準値】が[レベル]点増加する。',
  },
  {
    name: '畑',
    cp: '2',
    type: '支援',
    specialty: '《作る》',
    maxLv: '5',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたは[レベル]Jを得る。最大レベルに達している場合、食堂の効果にプラス1する。',
  },
  {
    name: '食堂',
    cp: '5',
    type: '支援',
    specialty: '《料理》',
    maxLv: '1',
    precondition: '料理人',
    effect: 'あなたの【体力基準値】をプラス1する。',
  },
  {
    name: '牧場',
    cp: '3',
    type: '支援',
    specialty: '《捕らえる》',
    maxLv: '3',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたはジャーキーか「毛皮」を[レベル]個まで得ることができる。最大レベルに達している場合、食堂の効果にプラス1する。',
  },
  {
    name: '薬草園',
    cp: '2',
    type: '支援',
    specialty: '《鑑定》',
    maxLv: '3',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたは「コカの葉」を[レベル]個得る。',
  },
  {
    name: '病院',
    cp: '5',
    type: '支援',
    specialty: '《手当》',
    maxLv: '1',
    precondition: '医者',
    effect: '指定特技の判定に成功すると、あなたは「鎮痛剤」を1つ得る。',
  },
  {
    name: '図書館',
    cp: '5',
    type: '支援',
    specialty: '《見つける》',
    maxLv: '1',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたはセッション中1度だけ、ダイスの出目をプラス1できる。これは、あの時の本でみたことある！',
  },
  {
    name: '工房',
    cp: '6',
    type: '支援',
    specialty: '《作る》',
    maxLv: '3',
    precondition: '',
    effect:
      '任意個のアイテムを消費する。指定特技の判定に成功すると、あなたは武器か防具を1つ作ることができる。消費するアイテムの合計額は作りたい武具の価格から[レベル]J引いた価格となる。ここで消費できるアイテムは「毛皮」「殻」「羽」「武器」「防具」である。',
  },
  {
    name: '広場',
    cp: '2',
    type: '常駐',
    specialty: '-',
    maxLv: '3',
    precondition: '',
    effect: '[レベル]人が、追加で1回散策表を振れる。',
  },
  {
    name: '太陽電池',
    cp: '4',
    type: '支援',
    specialty: 'なし',
    maxLv: '5',
    precondition: '',
    effect:
      'あなたが所持しているか装備しているアイテムを[レベル]個まで「充電」できる。',
  },
  {
    name: 'ラジオ局',
    cp: '15',
    type: '支援',
    specialty: '《伝える》',
    maxLv: '1',
    precondition: '物見やぐら、太陽電池、技術屋',
    effect:
      '指定特技の判定に成功すると、キャンプは結果フェイズに、任意の人材1人を獲得する。同じ種類の人材を獲得した場合レベルが上がる。この判定にはマイナス[獲得したい人材の必要CP]の修正がつく。',
  },
  {
    name: '鐘',
    cp: '5',
    type: '支援',
    specialty: 'なし',
    maxLv: '1',
    precondition: '物見やぐら、鍛冶屋',
    effect: '使用すると、1サイクルごとに、全員の【気力】が1点増加する。',
  },
  {
    name: '屋根',
    cp: '3',
    type: '常駐',
    specialty: '-',
    maxLv: '2',
    precondition: '',
    effect:
      '全員の【気力基準値】をプラス[レベル]する。1レベルでは雨漏りしている。',
  },
  {
    name: '壁',
    cp: '3',
    type: '常駐',
    specialty: '-',
    maxLv: '2',
    precondition: '',
    effect:
      '全員の【気力基準値】をプラス[レベル]する。1レベルでは隙間風が吹く。',
  },
  {
    name: '寝床',
    cp: '8',
    type: '常駐',
    specialty: '-',
    maxLv: '3',
    precondition: '',
    effect: '全員の【気力基準値】をプラス[レベル×2]する。',
  },
  {
    name: '水場',
    cp: '10',
    type: '常駐',
    specialty: '-',
    maxLv: '1',
    precondition: '',
    effect: '全員の【気力基準値】をプラス3する。水を汲める川が近くにある。',
  },
  {
    name: '倉庫',
    cp: '2',
    type: '常駐',
    specialty: '-',
    maxLv: '10',
    precondition: '',
    effect:
      '[レベル×10]個までのアイテムを保存しておける。出し入れはキャンプでのみ可能。',
  },
  {
    name: '食料庫',
    cp: '20',
    type: '常駐',
    specialty: '-',
    maxLv: '1',
    precondition: '',
    effect: '全員の【体力基準値】をプラス２する。',
  },
]

export const campPersonalityList = [
  {
    name: '商人',
    cp: '4',
    type: '支援',
    specialty: '《伝える》',
    maxLv: '3',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたはアイテムを[レベル+3]個まで買うことができる。',
  },
  {
    name: '先生',
    cp: '5',
    type: '支援',
    specialty: '《考える》',
    maxLv: '1',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたはそのセッションの間、ランダムに特技を1つ習得する。1D6を振り分野を決め、2D6を振って習得する特技を決める。',
  },
  {
    name: '歌姫',
    cp: '3',
    type: '支援',
    specialty: '《歌う》',
    maxLv: '1',
    precondition: '',
    effect: '指定特技の判定に成功すると、あなたの【気力】が2D6点上昇する。',
  },
  {
    name: '料理人',
    cp: '3',
    type: '支援',
    specialty: '《料理》',
    maxLv: '3',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたの所持する1Jを「嗜好品」１つと交換する。1回の判定で[レベル]個まで交換可能。',
  },
  {
    name: '大工',
    cp: '5',
    type: '常駐',
    specialty: '-',
    maxLv: '3',
    precondition: '',
    effect: '施設を作るのに必要なCPを[レベル]点減少する。（最低1)',
  },
  {
    name: 'リーダー',
    cp: '5',
    type: '支援',
    specialty: '《休まない》',
    maxLv: '3',
    precondition: '',
    effect: '指定特技の判定に成功すると、キャンプは[レベル]点のCPを得る。',
  },
  {
    name: '医者',
    cp: '5',
    type: '支援',
    specialty: '《手当》',
    maxLv: '3',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたは「なんこう」を[レベル]個得る。',
  },
  {
    name: '司書',
    cp: '3',
    type: '常駐',
    specialty: '-',
    maxLv: '3',
    precondition: '',
    effect: '「図書館」の効果の使用回数をプラス[レベル]回する。',
  },
  {
    name: '鍛冶屋',
    cp: '3',
    type: '常駐',
    specialty: '-',
    maxLv: '3',
    precondition: '',
    effect:
      '「工房」のレベルにプラス[レベル]する。また、「工房」の判定に失敗した時に一度だけ振り直せる。',
  },
  {
    name: '働き者',
    cp: '3',
    type: '常駐',
    specialty: '-',
    maxLv: '1',
    precondition: '',
    effect: '任意の人材1人のレベルをプラス1して扱う。',
  },
  {
    name: '猟師',
    cp: '3',
    type: '支援',
    specialty: '《捕らえる》',
    maxLv: '3',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたは「毛皮」か「ジャーキー」を[レベル]J分得る。また、常に牧場の必要CPをマイナス1する。',
  },
  {
    name: '技術屋',
    cp: '8',
    type: '常駐',
    specialty: '-',
    maxLv: '5',
    precondition: '',
    effect: '施設を使う時に必要な判定の達成値にプラス[レベル]の修正をつける。',
  },
  {
    name: '戦士',
    cp: '6',
    type: '支援',
    specialty: '《振る》',
    maxLv: '3',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたはセッション中[レベル]回、ダメージ適用のタイミングで与えるダメージを[レベル]点増加させることができる。',
  },
  {
    name: '旅人',
    cp: '5',
    type: '支援',
    specialty: '《雑学》',
    maxLv: '1',
    precondition: '',
    effect:
      '指定特技の判定に成功すると、あなたはセッション中1回、1体に『暴露』の変調を与えることができる。',
  },
]

export const abilitiesColumns = [
  { title: '名前', field: 'name' },
  { title: 'グループ', field: 'group' },
  { title: 'タイプ', field: 'type' },
  { title: '特技', field: 'specialty' },
  { title: '対象', field: 'target' },
  { title: '反動', field: 'recoil' },
  { title: '効果', field: 'effect' },
]

export const abilitiesColumnsEn = [
  { title: 'name', field: 'name' },
  { title: 'group', field: 'group' },
  { title: 'type', field: 'type' },
  { title: 'specialty', field: 'specialty' },
  { title: 'target', field: 'target' },
  { title: 'recoil', field: 'recoil' },
  { title: 'effect', field: 'effect' },
]

export const classList = [
  { name: 'ビッグ', id: 'big' },
  { name: 'チビ', id: 'little' },
  { name: 'オトナ', id: 'adult' },
  { name: 'ニューエイジ', id: 'newage' },
  { name: 'キズモノ', id: 'wounded' },
  { name: 'センシ', id: 'fighter' },
  { name: 'スカウト', id: 'scount' },
  { name: 'ハンター', id: 'hunter' },
  { name: 'ハカセ', id: 'professor' },
  { name: 'ショクニン', id: 'worker' },
  { name: 'ホープ', id: 'hope' },
  { name: 'ママ', id: 'mama' },
]

export const abilityList = [
  {
    name: '汎用グループ',
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
    name: 'ビッグ',
    id: 'big',
    list: [
      {
        name: 'におうだち',
        group: 'ビッグ',
        type: '割込み',
        recoil: '5',
        specialty: '《塞ぐ》',
        target: '自身',
        effect:
          '指定特技の判定に成功すると、今行われている攻撃の対象を自分1人に変更する。',
      },
      {
        name: '鉄拳',
        group: 'ビッグ',
        type: '攻撃',
        recoil: '0',
        specialty: '《殴る》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、1点のダメージを与える。このとき命中判定の達成値にプラス3の修正がつく。',
      },
      {
        name: '怪力',
        group: 'ビッグ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: '白兵攻撃や肉体を使った攻撃により与えるダメージが1点上昇する。',
      },
      {
        name: '頑強',
        group: 'ビッグ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: 'あなたの【体力】の「基準値」を2点増加する。',
      },
      {
        name: '馬鹿力',
        group: 'ビッグ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'あなたは「装備部位：両手」のアイテムを「装備部位：片手」として扱うことができる。',
      },
      {
        name: '押し倒し',
        group: 'ビッグ',
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
    name: 'チビ',
    id: 'little',
    list: [
      {
        name: '痩身',
        group: 'チビ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: '回避判定の達成値にプラス1の修正がつく。',
      },
      {
        name: '両手利き',
        group: 'チビ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          '《利き腕》と《逆腕》の特技を追加で習得する。さらに、代用判定の時、腕部分野の上下のリストが繋がっているように扱う。',
      },
      {
        name: '奇襲',
        group: 'チビ',
        type: '割込み',
        recoil: '5',
        specialty: '《隠れる》',
        target: '自身',
        effect:
          '戦闘開始時の先制判定の前に使用する。指定特技の判定に成功すると、追加行動を得る。',
      },
      {
        name: 'アクロバット',
        group: 'チビ',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect: '回避判定に組み合わせて使用する。達成値にプラス2の修正がつく。',
      },
      {
        name: 'うろちょろ',
        group: 'チビ',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect: '命中判定に組み合わせて使用する。対象の気力を1点減少させる。',
      },
      {
        name: '死角',
        group: 'チビ',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect: '命中判定に組み合わせて使用する。達成値にプラス2の修正がつく。',
      },
    ],
  },
  {
    name: 'オトナ',
    id: 'adult',
    list: [
      {
        name: '手練',
        group: 'オトナ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          '「アクション」の特技から１つ選択する。その特技は隣接する部位にダメージを受けても使用不能とならない。',
      },
      {
        name: '百戦錬磨',
        group: 'オトナ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: '命中判定の達成値にプラス1の修正がつく。',
      },
      {
        name: '人生経験',
        group: 'オトナ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'ギャップを2列塗りつぶすことができる。塗りつぶされたギャップは代用判定の際数えない。',
      },
      {
        name: '遭遇歴',
        group: 'オトナ',
        type: '支援',
        recoil: '3',
        specialty: '《雑学》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『暴露』の変調を与える。',
      },
      {
        name: 'へそくり',
        group: 'オトナ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'キャラメイク時の初期Jにプラス3Jする。また、セッション開始時に3J獲得できる。',
      },
      {
        name: '旧友',
        group: 'オトナ',
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
    name: 'ニューエイジ',
    id: 'newage',
    list: [
      {
        name: '火炎弾',
        group: 'ニューエイジ',
        type: '攻撃',
        recoil: '2',
        specialty: '《投げる》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『炎上』の変調を与える。',
      },
      {
        name: '発電',
        group: 'ニューエイジ',
        type: '割込み',
        recoil: '2',
        specialty: '《機械》',
        target: 'アイテム',
        effect: '指定特技の判定に成功すると、アイテム１つを「充電」できる。',
      },
      {
        name: '念動力',
        group: 'ニューエイジ',
        type: '割込み',
        recoil: '2',
        specialty: '《逸らす》',
        target: '単体',
        effect:
          'ダメージ適用の直前に使用する。指定特技の判定に成功するとダメージを1点軽減できる。',
      },
      {
        name: '治癒',
        group: 'ニューエイジ',
        type: '支援',
        recoil: '6',
        specialty: '《手当》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、対象の部位ダメージを1つ回復できる。ただし、この判定の達成値には[対象の部位ダメージ数]だけのマイナス修正がつく。',
      },
      {
        name: '突然変異',
        group: 'ニューエイジ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'ムシ、ケモノ、ミュータントのグループアビリティからランダムに１つアビリティを習得できる。ただし、その反動が1増加する。常駐タイプのアビリティを習得した場合、【気力】の「基準値」が2点減少する。',
      },
      {
        name: '瞬間移動',
        group: 'ニューエイジ',
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
    name: 'キズモノ',
    id: 'wounded',
    list: [
      {
        name: '銀の腕',
        group: 'キズモノ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'あなたはダメージを受ける時、先にそのダメージの命中部位を決める。＜キズ＞の部位に攻撃が命中した場合、そのダメージを無効化する。',
      },
      {
        name: '克服',
        group: 'キズモノ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'ギャップを2列塗りつぶすことができる。塗りつぶされたギャップは代用判定の際数えない。',
      },
      {
        name: '肉を斬らせて',
        group: 'キズモノ',
        type: '割込み',
        recoil: '4',
        specialty: '《耐える》',
        target: '自身',
        effect:
          '自身が部位ダメージを受けた時に使用できる。指定特技の判定に成功すると自身は追加行動を得る。',
      },
      {
        name: '悪運',
        group: 'キズモノ',
        type: '割込み',
        recoil: '3',
        specialty: 'なし',
        target: '単体',
        effect:
          '対象の判定の直後に使用。サイコロ1つの出目をマイナス1する。シナリオ3回。',
      },
      {
        name: 'リハビリ',
        group: 'キズモノ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          '＜キズ＞に隣接する8つのアクションの《特技》から１つ選び追加で習得する。このアクションは使用可能になる。',
      },
      {
        name: '刺し違え',
        group: 'キズモノ',
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
    name: 'センシ',
    id: 'fighter',
    list: [
      {
        name: '渾身撃',
        group: 'センシ',
        type: '攻撃',
        recoil: '3',
        specialty: '自由',
        target: '単体',
        effect:
          '指定特技の判定に成功すると対象に[装備している武器1つの攻撃力+3]点のダメージを与える。',
      },
      {
        name: '追撃',
        group: 'センシ',
        type: '補助',
        recoil: '1',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。命中した攻撃のダメージを1増加させる。',
      },
      {
        name: '切り返し',
        group: 'センシ',
        type: '割込み',
        recoil: '1',
        specialty: 'なし',
        target: '自身',
        effect: '命中判定の直後に使用する。その判定を振り直す。',
      },
      {
        name: '急所狙い',
        group: 'センシ',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。その攻撃によるダメージは軽減されない。',
      },
      {
        name: 'なぎ払い',
        group: 'センシ',
        type: '攻撃',
        recoil: '3',
        specialty: '《振る》',
        target: '3体',
        effect:
          '指定特技の判定に成功すると、3体までの対象に装備中の武器1つの[攻撃力]点のダメージを与える。',
      },
      {
        name: '一刀流',
        group: 'センシ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '-',
        effect: '装備している武器が1つだけの場合、武器の攻撃力が1点増加する。',
      },
    ],
  },
  {
    name: 'スカウト',
    id: 'scount',
    list: [
      {
        name: ' 	偵察	',
        group: ' 	スカウト	',
        type: ' 	割込み	',
        recoil: ' 	5	',
        specialty: ' 	《見つける》	',
        target: ' 	全体	',
        effect:
          ' 	ランダムエンカウントの表を振る直前に使用する。指定特技の判定に成功すると、表を振った後に、その遭遇を無視できるようになる。	',
      },
      {
        name: ' 	マルチワーク	',
        group: ' 	スカウト	',
        type: ' 	割込み	',
        recoil: ' 	2	',
        specialty: ' 	《休まない》	',
        target: ' 	自身	',
        effect:
          ' 	探索フェイズの行動前に使用する。判定に成功すると、行動を2回行うことができる。同じ行動を選んでもよい。	',
      },
      {
        name: ' 	とんずら	',
        group: ' 	スカウト	',
        type: ' 	支援	',
        recoil: ' 	3	',
        specialty: ' 	《逃げる》	',
        target: ' 	全体	',
        effect:
          ' 	指定特技の判定に成功すると、味方を好きなだけ選んで（自身含む）戦闘から撤退させることができる。ただし、この判定の達成値にはマイナス[自身以外に撤退させる人数]の修正がつく。	',
      },
      {
        name: ' 	踏破	',
        group: ' 	スカウト	',
        type: ' 	常駐	',
        recoil: ' 	-	',
        specialty: ' 	-	',
        target: ' 	自身	',
        effect: ' 	突破判定及び探索表による判定の達成値にプラス1の修正がつく。	',
      },
      {
        name: ' 	先手必勝	',
        group: ' 	スカウト	',
        type: ' 	常駐	',
        recoil: ' 	-	',
        specialty: ' 	-	',
        target: ' 	-	',
        effect:
          ' 	先制判定の達成値にプラス1の修正がつく。先攻で攻撃した場合のみ、あなたの与えるダメージにプラス1の修正がつく。	',
      },
      {
        name: ' 	小器用	',
        group: ' 	スカウト	',
        type: ' 	常駐	',
        recoil: ' 	-	',
        specialty: ' 	-	',
        target: ' 	自身	',
        effect:
          ' 	あなたは補助タイプの特技を2つまで組み合わせられるようになる。	',
      },
    ],
  },
  {
    name: 'ハンター',
    id: 'hunter',
    list: [
      {
        name: '毒矢',
        group: 'ハンター',
        type: '攻撃',
        recoil: '3',
        specialty: '《撃つ》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、1点のダメージを与える。その結果対象の【体力】が減少した場合、対象に『毒』の変調を与える。',
      },
      {
        name: '狙い撃ち',
        group: 'ハンター',
        type: '補助',
        recoil: '1',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。攻撃が命中した時、命中する部位が必ず任意となる。',
      },
      {
        name: '罠設置',
        group: 'ハンター',
        type: '攻撃',
        recoil: '2',
        specialty: '《罠》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『捕縛』の変調を与える。',
      },
      {
        name: '打込み',
        group: 'ハンター',
        type: '補助',
        recoil: '2',
        specialty: '-',
        target: '-',
        effect:
          '命中判定に組み合わせて使用する。攻撃が命中した時、対象に『重傷』の変調を与える。',
      },
      {
        name: '火炎瓶',
        group: 'ハンター',
        type: '攻撃',
        recoil: '3',
        specialty: '《投げる》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、対象に『炎上』の変調と1点のダメージを与える。',
      },
      {
        name: '影牢',
        group: 'ハンター',
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
    name: 'ハカセ',
    id: 'professor',
    list: [
      {
        name: '観察眼',
        group: 'ハカセ',
        type: '支援',
        recoil: '3',
        specialty: '《考える》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象に『暴露』の変調を与える。',
      },
      {
        name: '弱点看破',
        group: 'ハカセ',
        type: '支援',
        recoil: '3',
        specialty: '《見つける》',
        target: '単体',
        effect:
          '指定特技の判定に成功すると、そのラウンドの間、味方の与えるダメージは軽減されない。',
      },
      {
        name: '戦術',
        group: 'ハカセ',
        type: '補助',
        recoil: '3',
        specialty: '-',
        target: '全体',
        effect:
          '先制判定に組み合わせて使用する。先制判定の達成値にプラス1の修正がつく。先制判定に成功した場合、味方全員が先攻で行動できる。',
      },
      {
        name: '爆発物',
        group: 'ハカセ',
        type: '攻撃',
        recoil: '4',
        specialty: '《科学》',
        target: '全体',
        effect:
          '指定特技の判定に成功すると敵全体に2点のダメージを与える。判定に失敗した場合、味方全員に2点のダメージを与える。この攻撃によるダメージは軽減できない。',
      },
      {
        name: '応用と実践',
        group: 'ハカセ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect:
          'あなたの特技リストは技術と環境の分野が繋がっているものとして扱うことができる。',
      },
      {
        name: 'ピタゴラ',
        group: 'ハカセ',
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
    name: 'ショクニン',
    id: 'worker',
    list: [
      {
        name: ' 	改造	',
        group: ' 	ショクニン	',
        type: ' 	支援	',
        recoil: ' 	3	',
        specialty: ' 	《作る》	',
        target: ' 	アイテム	',
        effect:
          ' 	武器1つを対象にする。指定特技の判定に成功すると、セッション中その武器の攻撃力にプラス1の修正を与える。	',
      },
      {
        name: ' 	愛刀	',
        group: ' 	ショクニン	',
        type: ' 	常駐	',
        recoil: ' 	-	',
        specialty: ' 	-	',
        target: ' 	自身	',
        effect:
          ' 	装備している武器1つを愛刀として指定する。愛刀を使った命中判定の達成値にプラス1の修正がつく。さらに愛刀の[攻撃力]が1点増加する。	',
      },
      {
        name: ' 	限界突破	',
        group: ' 	ショクニン	',
        type: ' 	補助	',
        recoil: ' 	-	',
        specialty: ' 	-	',
        target: ' 	-	',
        effect:
          ' 	武器を使用した攻撃の命中判定に組み合わせて使用する。攻撃に使用する武器の[攻撃力]を2倍にする。攻撃が終わった後、その武器は破壊される。	',
      },
      {
        name: ' 	目利き	',
        group: ' 	ショクニン	',
        type: ' 	割込み	',
        recoil: ' 	1	',
        specialty: ' 	《鑑定》	',
        target: ' 	-	',
        effect:
          ' 	指定特技の判定に成功すると、ランダムにアイテムを入手する時の表の出目にプラス1かマイナス1の修正をつけることができる。	',
      },
      {
        name: ' 	修理	',
        group: ' 	ショクニン	',
        type: ' 	割込み	',
        recoil: ' 	2	',
        specialty: ' 	《耐える》	',
        target: ' 	アイテム	',
        effect:
          ' 	武器が破壊される時に割り込んで使用する。指定特技の判定に成功した場合、1D6を振る。5か6の出目が出た場合、その武器を修理しすぐにもう一度装備する。	',
      },
      {
        name: ' 	試作品	',
        group: ' 	ショクニン	',
        type: ' 	攻撃	',
        recoil: ' 	3	',
        specialty: ' 	《作る》	',
        target: ' 	単体	',
        effect:
          ' 	食料・消耗品以外のアイテムを1つ消費する。指定特技の判定に成功すると、対象に1D6点のダメージを与える。	',
      },
    ],
  },
  {
    name: 'ホープ',
    id: 'hope',
    list: [
      {
        name: 'みなぎる力',
        group: 'ホープ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: 'あなたの【気力】の「基準値」にプラス3する。',
      },
      {
        name: '希望の光',
        group: 'ホープ',
        type: '割込み',
        recoil: '3',
        specialty: 'なし',
        target: '単体',
        effect:
          '対象の判定の直後に使用。サイコロ1つの出目をプラス1する。シナリオ3回。',
      },
      {
        name: '幸運の星',
        group: 'ホープ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: '自身',
        effect: 'あなたの行う行為判定では出目が6,5の時にもスペシャルとなる。',
      },
      {
        name: '揺らぐ運命',
        group: 'ホープ',
        type: '割込み',
        recoil: '5',
        specialty: 'なし',
        target: '単体',
        effect: '対象の行為判定の直後に使用。その判定を振り直す。',
      },
      {
        name: '努力',
        group: 'ホープ',
        type: '割込み',
        recoil: '3',
        specialty: '《休まない》',
        target: '単体',
        effect:
          '対象が何らかの表を振った直後に使用。その出目をプラス1かマイナス1する。',
      },
      {
        name: '因果応報',
        group: 'ホープ',
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
    name: 'ママ',
    id: 'mama',
    list: [
      {
        name: '声援',
        group: 'ママ',
        type: '割込み',
        recoil: '3',
        specialty: '《伝える》',
        target: '単体',
        effect:
          '自分以外の判定の直前に使用する。指定特技の判定に成功すると対象の達成値にプラス2の修正がつく。',
      },
      {
        name: 'ごちそう',
        group: 'ママ',
        type: '支援',
        recoil: '2',
        specialty: '《料理》',
        target: '全体',
        effect:
          '人数分の食料を消費する。指定特技の判定に成功すると全員の【気力】が1D6点増加し、【体力】が1点増加する。戦闘中は使用できない。',
      },
      {
        name: '激励',
        group: 'ママ',
        type: '支援',
        recoil: '2',
        specialty: '《叫ぶ》',
        target: '単体',
        effect: '指定特技の判定に成功すると対象の【気力】が3点増加する。',
      },
      {
        name: 'ちちんぷいぷい',
        group: 'ママ',
        type: '割込み',
        recoil: '5',
        specialty: '《手当》',
        target: '単体',
        effect: '指定特技の判定に成功すると、対象の【体力】が3点増加する。',
      },
      {
        name: '節約',
        group: 'ママ',
        type: '常駐',
        recoil: '-',
        specialty: '-',
        target: 'アイテム',
        effect:
          '自身が消耗品を使用した時に、1D6を振る。5か6が出た場合、そのアイテムは失われない。',
      },
      {
        name: 'なだめる',
        group: 'ママ',
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

export const itemList = [
  {
    name: 'ジャーキー',
    j: 1,
    weight: 1,
    type: '支援',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '食料',
    effect: '1日分の食料。【気力】が1点増加する。通貨単位J。',
  },
  {
    name: '缶詰',
    j: 10,
    weight: 1,
    type: '支援',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '食料',
    effect:
      '缶詰1つ。文明の味。【気力】が「基準値」点増加する。通貨単位10J=1C。',
  },
  {
    name: 'ベルトポーチ',
    j: 3,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '袋',
    effect:
      '総重量4まで袋の中にアイテムを入れることができる。袋の中のアイテムの重量は所持限界から無視する。',
  },
  {
    name: 'リュックサック',
    j: 5,
    weight: 2,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '袋',
    effect:
      '総重量10まで袋の中にアイテムを入れることができる。袋の中のアイテムの重量は所持限界から無視する。',
  },
  {
    name: '大きなリュック',
    j: 10,
    weight: 3,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '袋',
    effect:
      '総重量20まで袋の中にアイテムを入れることができる。袋の中のアイテムの重量は所持限界から無視する。',
  },
  {
    name: '肩掛けカバン',
    j: 6,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '袋',
    effect:
      '総重量4まで袋の中にアイテムを入れることができる。袋の中のアイテムの重量は所持限界から無視する。戦闘中でも袋の中のアイテムを使用できる。',
  },
  {
    name: '手提げかばん',
    j: 6,
    weight: 2,
    type: '装備',
    area: '片手',
    specialty: '-',
    target: '-',
    trait: '袋',
    effect:
      '総重量5まで袋の中にアイテムを入れることができる。袋の中のアイテムの重量は所持限界から無視する。戦闘中でも袋の中のアイテムを使用できる。',
  },
  {
    name: 'トランクケース',
    j: 7,
    weight: 3,
    type: '装備',
    area: '両手',
    specialty: '《殴る》',
    target: '単体',
    trait: '袋、武器、白兵',
    effect:
      '攻撃力3。総重量5まで袋の中にアイテムを入れることができる。袋の中のアイテムの重量は所持限界から無視する。',
  },
  {
    name: 'ほうちょう',
    j: 3,
    weight: 1,
    type: '装備',
    area: '片手',
    specialty: '《斬る》《刺す》',
    target: '単体',
    trait: '武器、白兵',
    effect:
      '攻撃力1。この武器は割込みのタイミングで装備できる。この武器は破壊して死亡判定をキャンセルできない。',
  },
  {
    name: 'ナタ',
    j: 6,
    weight: 2,
    type: '装備',
    area: '片手',
    specialty: '《斬る》',
    target: '単体',
    trait: '武器、白兵',
    effect: '攻撃力3。',
  },
  {
    name: '剥ぎ取りナイフ',
    j: 9,
    weight: 1,
    type: '装備',
    area: '片手',
    specialty: '《斬る》《刺す》',
    target: '単体',
    trait: '武器、白兵',
    effect: '攻撃力2。ドロップ表の結果にプラス1の修正がつく。',
  },
  {
    name: 'カタナ',
    j: 15,
    weight: 2,
    type: '装備',
    area: '片手',
    specialty: '《斬る》',
    target: '単体',
    trait: '武器、白兵',
    effect:
      '攻撃力4。命中判定でスペシャルを振った場合、攻撃力にプラス1D6する。',
  },
  {
    name: '槍',
    j: 4,
    weight: 4,
    type: '装備',
    area: '両手',
    specialty: '《刺す》',
    target: '単体',
    trait: '武器、白兵、収納不可',
    effect: '攻撃力3。',
  },
  {
    name: '棍棒',
    j: 1,
    weight: 2,
    type: '装備',
    area: '片手',
    specialty: '《殴る》',
    target: '単体',
    trait: '武器、白兵',
    effect: '攻撃力1。',
  },
  {
    name: 'バール',
    j: 4,
    weight: 2,
    type: '装備',
    area: '片手',
    specialty: '《殴る》',
    target: '単体',
    trait: '武器、白兵',
    effect: '攻撃力2。',
  },
  {
    name: 'ハンマー',
    j: 6,
    weight: 5,
    type: '装備',
    area: '両手',
    specialty: '《殴る》',
    target: '単体',
    trait: '武器、白兵',
    effect: '攻撃力4。硬くて長くて重たいの。',
  },
  {
    name: '百科事典',
    j: 9,
    weight: 3,
    type: '装備',
    area: '片手',
    specialty: '《殴る》',
    target: '単体',
    trait: '武器、白兵',
    effect:
      '攻撃力2。所持していると《雑学》の判定の達成値にプラス1の修正がつく。',
  },
  {
    name: 'スリング',
    j: 3,
    weight: 1,
    type: '装備',
    area: '両手',
    specialty: '《投げる》',
    target: '単体',
    trait: '武器、射撃',
    effect:
      '攻撃力2。投石器。弾にする石は何処でも手に入るため明記不要。石以外も投げることができる。装備している間、回避判定にプラス1の修正がつく。',
  },
  {
    name: 'ボウガン',
    j: 8,
    weight: 3,
    type: '装備',
    area: '両手',
    specialty: '《撃つ》',
    target: '単体',
    trait: '武器、射撃',
    effect:
      '攻撃力3。矢が必要。装備している間、回避判定にプラス2の修正がつく。',
  },
  {
    name: 'スタンガン',
    j: 8,
    weight: 1,
    type: '装備',
    area: '片手',
    specialty: '《殴る》',
    target: '単体',
    trait: '武器、白兵、充電、使用回数：1',
    effect:
      '攻撃力2。この武器によるダメージは軽減されない。さらに、『麻痺』の変調を与える。',
  },
  {
    name: 'なべぶた',
    j: 1,
    weight: 2,
    type: '装備',
    area: '片手',
    specialty: '《殴る》',
    target: '単体',
    trait: '武器、白兵、防具',
    effect: '攻撃力0。回避判定の達成値にプラス1の修正がつく。',
  },
  {
    name: 'なべ',
    j: 10,
    weight: 2,
    type: '装備',
    area: '頭部',
    specialty: '-',
    target: '自身',
    trait: '防具',
    effect:
      '頭部分野の《身体部位》への部位ダメージをキャンセルすることができる。そうした場合、このアイテムを破壊する。',
  },
  {
    name: 'レザー',
    j: 10,
    weight: 2,
    type: '装備',
    area: '胴部',
    specialty: '-',
    target: '自身',
    trait: '防具',
    effect:
      '胴部分野の《身体部位》への部位ダメージをキャンセルすることができる。そうした場合、このアイテムを破壊する。',
  },
  {
    name: 'ポケットジャケット',
    j: 12,
    weight: 2,
    type: '装備',
    area: '胴部',
    specialty: '-',
    target: '自身',
    trait: '',
    effect: 'ポケットのたくさんついたジャケット。所持限界プラス1',
  },
  {
    name: '籠手',
    j: 10,
    weight: 2,
    type: '装備',
    area: '腕部',
    specialty: '-',
    target: '自身',
    trait: '防具',
    effect:
      '腕部分野の《身体部位》への部位ダメージをキャンセルすることができる。そうした場合、このアイテムを破壊する。',
  },
  {
    name: '安全ブーツ',
    j: 10,
    weight: 3,
    type: '装備',
    area: '脚部',
    specialty: '-',
    target: '自身',
    trait: '防具',
    effect:
      '脚部分野の《身体部位》への部位ダメージをキャンセルすることができる。そうした場合、このアイテムを破壊する。',
  },
  {
    name: '嗜好品',
    j: 3,
    weight: 0,
    type: '割込み',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '消耗品',
    effect: 'おやつやタバコなど。【気力】を2点増加させる。',
  },
  {
    name: 'ライト',
    j: 3,
    weight: 1,
    type: '装備',
    area: '片手',
    specialty: '-',
    target: '自身',
    trait: '充電',
    effect:
      '《探索》の達成値にプラス1の修正がつく。明るく照らす。暗闇のペナルティを打ち消す。',
  },
  {
    name: 'バッテリー',
    j: 2,
    weight: 0,
    type: '割込み',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '消耗品',
    effect: 'あなたが装備しているか所持しているアイテム1つを「充電」できる。',
  },
  {
    name: 'トランシーバー',
    j: 8,
    weight: 1,
    type: '支援',
    area: '-',
    specialty: '《機械》',
    target: '自身',
    trait: '充電',
    effect: 'キャンプの仲間と通信し、【気力】を2点増加させる。',
  },
  {
    name: '携帯ラジオ',
    j: 8,
    weight: 1,
    type: '支援',
    area: '-',
    specialty: '《操作》',
    target: '全体',
    trait: '充電',
    effect: '探索フェイズに使用可能。全員の【気力】を1D3点増加させる。',
  },
  {
    name: '矢',
    j: 1,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '消耗品、使用回数：10',
    effect:
      'ボウガンの矢。これを所持していないとボウガンの効果をうけることができない。ボウガンで命中判定を行うごとに1消費する。',
  },
  {
    name: '矢筒',
    j: 1,
    weight: 0,
    type: '装備',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '袋',
    effect:
      '名前に『矢』のつくアイテムを2束（使用回数20回分）まで入れることができる。袋の中のアイテムの重量は所持限界から無視する。戦闘中でも袋の中のアイテムを使用できる。',
  },
  {
    name: '胡椒玉',
    j: 5,
    weight: 0,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '消耗品',
    effect:
      'スリングで投げることができる。攻撃の対象に『麻痺』の変調を与える。',
  },
  {
    name: 'コカの葉',
    j: 2,
    weight: 0,
    type: '割込み',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '消耗品',
    effect: '【体力】を2点増加させる。',
  },
  {
    name: 'なんこう',
    j: 3,
    weight: 0,
    type: '割込み',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '消耗品',
    effect: '変調を１つ回復する。',
  },
  {
    name: '鎮痛剤',
    j: 6,
    weight: 0,
    type: '割込み',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '消耗品',
    effect: '【体力】を3点増加させる。変調を1つ回復する。',
  },
  {
    name: '手書きのメモ',
    j: 5,
    weight: 0,
    type: '支援',
    area: '-',
    specialty: '-',
    target: '単体',
    trait: '消耗品',
    effect: '対象に『暴露』の変調を与える。',
  },
  {
    name: 'ばんそうこう',
    j: 1,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '消耗品',
    effect: '【応急手当て】の効果プラス1。',
  },
  {
    name: 'ペット',
    j: 10,
    weight: 0,
    type: '支援',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '食料',
    effect: '【気力】を1D3点増加させる。',
  },
  {
    name: 'ロープ',
    j: 1,
    weight: 2,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '',
    effect: '丈夫なロープ。使い方次第で休憩しやすくなったり障害の突破に。',
  },
  {
    name: 'たいまつ',
    j: 1,
    weight: 1,
    type: '装備',
    area: '片手',
    specialty: '-',
    target: '-',
    trait: '消耗品',
    effect:
      '火をつけるには火付け道具が必要、戦闘中の点火は支援行動。効果は1サイクル。暗闇のペナルティを打ち消したり蜘蛛の巣を燃やしたり。',
  },
  {
    name: '火付け道具',
    j: 2,
    weight: 0,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '',
    effect:
      'マッチやライター、火打ち石とほくちのセットなどのこと。焚き火があれば休憩しやすくなる。',
  },
  {
    name: '毛布',
    j: 1,
    weight: 2,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '',
    effect: '軽くて丈夫な毛布。寒い日の休憩には必須。',
  },
  {
    name: '寝袋',
    j: 5,
    weight: 3,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '',
    effect: '休憩をした時に増加する【気力】プラス1。',
  },
  {
    name: 'ポリタンク',
    j: 5,
    weight: 3,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '',
    effect:
      'キャンプや水場で水を補充できる。水が補充されている場合、いつでもリミットの増加を試みることができる。一度使うと水はなくなる。空なら重量3、水を満タンにすると重量は8となる。',
  },
  {
    name: '釣竿',
    j: 7,
    weight: 2,
    type: '支援',
    area: '-',
    specialty: '《待つ》',
    target: '-',
    trait: '',
    effect:
      '川や池を見つけた時に使用出来る。指定特技の判定に成功すると1Jを得る。',
  },
  {
    name: 'なぞの葉',
    j: 0,
    weight: 0,
    type: '割込み',
    area: '-',
    specialty: '-',
    target: '自身',
    trait: '購入不可、消耗品',
    effect:
      '使用するときに1D6を振る。出目が偶数の場合、【体力】が2点増加する。奇数の場合、2点のダメージを受ける。',
  },
  {
    name: '生肉',
    j: 1,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '購入不可、食料',
    effect: 'お肉にくにく。',
  },
  {
    name: '硬い殻',
    j: 1,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '購入不可',
    effect: '武器・防具の材料に使える硬い殻',
  },
  {
    name: '硬い羽',
    j: 1,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '購入不可',
    effect: '透き通った硬い羽。武器防具以外に窓ガラスの修理にも。',
  },
  {
    name: '毒針',
    j: 2,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '購入不可',
    effect: '毒は薬にも。針は武器や工具に使用される。',
  },
  {
    name: '毛皮',
    j: 1,
    weight: 1,
    type: '道具',
    area: '-',
    specialty: '-',
    target: '-',
    trait: '購入不可',
    effect: 'もふもふ',
  },
]
