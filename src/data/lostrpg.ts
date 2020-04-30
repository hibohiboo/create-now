export const facilities = [
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
