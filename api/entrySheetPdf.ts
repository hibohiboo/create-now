import { NextApiRequest, NextApiResponse } from 'next'
import { EntrySheet } from '../src/store/modules/entrySheetModule'
import { createPdfBinary } from './utils/pdf'

const rank = (r: 1 | 2 | 3 | 4) => {
  switch (r) {
    case 1:
      return '■必須 □必須ではないが重視 □あると嬉しい □不要'
    case 2:
      return '□必須 ■必須ではないが重視 □あると嬉しい □不要'
    case 3:
      return '□必須 □必須ではないが重視 ■あると嬉しい □不要'
    case 4:
      return '□必須 □必須ではないが重視 □あると嬉しい ■不要'
  }
}

const createDocDefinition = (sheet: EntrySheet) => {
  const titleSetting = {
    fillColor: '#000',
    color: '#fff',
    fontSize: 18,
    lineHeight: 1.1,
    bold: true,
  }
  const hdWidth = 140
  return {
    content: [
      {
        text: 'GMエントリーシートVer2.00    TRPGサークル  とらいあど    ',
        margin: [0, 0, 0, 5],
        fontSize: 12,
        alignment: 'right',
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ①システム名',
              },
              sheet.system,
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ②シナリオ名',
              },
              sheet.title,
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth * 2, '*'],
          body: [
            [
              {
                style: 'tables',
                table: {
                  heights: 20,
                  widths: [hdWidth, '*'],
                  body: [
                    [
                      {
                        ...titleSetting,
                        text: ' ③GM名',
                      },
                      sheet.gmName,
                    ],
                    [
                      {
                        ...titleSetting,
                        text: ' ④延長',
                      },
                      `${sheet.isExtend === 1 ? '■あり □なし' : '□あり ■なし'}`,
                    ],
                    [
                      {
                        ...titleSetting,
                        text: ' ⑤PL人数',
                      },
                      {
                        stack: [
                          { text: '最少  ～最適～ 最大', fontSize: 10 },
                          {
                            text: `${sheet.pcNumberMin}人～    ${sheet.pcNumberBest}人~     ${sheet.pcNumberMax}人`,
                            fontSize: 10,
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
              {
                table: {
                  heights: 20,
                  widths: [hdWidth, '*'],
                  body: [
                    [
                      {
                        ...titleSetting,
                        text: ' ⑥テーマ',
                        rowSpan: 3,
                      },
                      sheet.theme1,
                    ],
                    ['', sheet.theme2],
                    ['', sheet.theme3],
                  ],
                },
              },
            ],
          ],
        },
        layout: 'noBorders',
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ⑦シリアス度※',
              },
              { text: rank(sheet.serious as 1 | 2 | 3 | 4), fontSize: 14 },
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ⑧演技の重要度※',
                fontSize: 16,
              },
              { text: rank(sheet.role as 1 | 2 | 3 | 4), fontSize: 14 },
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ⑨必要なもの※',
              },
              {
                stack: [
                  {
                    text: `${sheet.diceFace}面ダイス${
                      sheet.diceNumber
                    }個 | ルールブック ${
                      sheet.requiredRule === 1 ? '必須' : '不要'
                    }`,
                    fontSize: 14,
                  },
                  {
                    text: `他(${sheet.requiredOther})`,
                    fontSize: 14,
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ⑩キャラ作成※',
              },
              {
                text: `${sheet.charMake === 1 ? '■' : '□'}サンプルキャラあり ${
                  sheet.charMake === 1 ? '□' : '■'
                }持込・作成可 (備考${sheet.charOther})`,
                fontSize: 14,
              },
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ⑪初心者対応※',
              },
              {
                text: `TRPG初心者${sheet.trpgBeginer}人まで | システム初心者${sheet.systemBeginer}人まで`,
                fontSize: 14,
              },
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ⑫準備※',
              },
              {
                stack: [
                  {
                    text: `ルールブック${sheet.ruleBook}冊 | サマリー等${sheet.summary}冊`,
                    fontSize: 14,
                  },
                  {
                    text: `他(${sheet.equipOther})`,
                    fontSize: 14,
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          heights: ['auto', 400],
          widths: ['*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ⑬自由記入欄',
                alignment: 'center',
              },
            ],
            [
              {
                stack: [
                  {
                    text: sheet.free,
                    fontSize: 14,
                  },
                ],
              },
            ],
          ],
        },
      },
    ],
    styles: {
      tables: {
        margin: [0, 0, 0, 2],
      },
    },
    defaultStyle: {
      font: 'IPAGothic',
      fontSize: 16,
      alignment: 'left',
      // a string or { width: number, height: number }
      pageSize: 'A4',
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'landscape',
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [5, 5, 5, 5],
    },
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const docDefinition = createDocDefinition(req.body)
  createPdfBinary(docDefinition, (binary) => {
    res.setHeader('Content-Type', 'application/json')

    res.status(200).send(binary)
  })
}
