export const textToRubyTag = (text:string)=> text
/** https://qiita.com/8amjp/items/d7c46d9dee0da4d530ef */
/* 半角または全角の縦棒以降の文字をベーステキスト、括弧内の文字をルビテキスト。 */
.replace(/[\|｜](.+?)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>')
.replace(/[\|｜](.+?)（(.+?)）/g, '<ruby>$1<rt>$2</rt></ruby>')
.replace(/[\|｜](.+?)\((.+?)\)/g, '<ruby>$1<rt>$2</rt></ruby>')
/* 漢字の連続の後に括弧が存在した場合、一連の漢字をベーステキスト、括弧内の文字をルビテキスト。 */
.replace(/([一-龠]+)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>')
/* ただし丸括弧内の文字はひらがなかカタカナのみを指定。 */
.replace(
  /([一-龠]+)（([ぁ-んァ-ヶ]+?)）/g,
  '<ruby>$1<rt>$2</rt></ruby>',
)
.replace(
  /([一-龠]+)\(([ぁ-んァ-ヶ]+?)\)/g,
  '<ruby>$1<rt>$2</rt></ruby>',
)
/* 括弧を括弧のまま表示したい場合は、括弧の直前に縦棒を入力。 */
.replace(/[\|｜]《(.+?)》/g, '《$1》')
.replace(/[\|｜]（(.+?)）/g, '（$1）')
.replace(/[\|｜]\((.+?)\)/g, '($1)')

export const textToRemoveRubyTag = (text:string)=> text
.replace(/[\|｜](.+?)《(.+?)》/g, '$1')
.replace(/[\|｜](.+?)（(.+?)）/g, '$1')
.replace(/[\|｜](.+?)\((.+?)\)/g, '$1')
.replace(/([一-龠]+)《(.+?)》/g, '$1')
.replace(
  /([一-龠]+)（([ぁ-んァ-ヶ]+?)）/g,
  '$1',
)
.replace(
  /([一-龠]+)\(([ぁ-んァ-ヶ]+?)\)/g,
  '$1',
)
.replace(/[\|｜]《(.+?)》/g, '《$1》')
.replace(/[\|｜]（(.+?)）/g, '（$1）')
.replace(/[\|｜]\((.+?)\)/g, '($1)')
