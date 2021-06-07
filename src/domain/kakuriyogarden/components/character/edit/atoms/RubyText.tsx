import { FC } from 'react'
import { textToRubyTag } from '~/domain/kakuriyogarden/classes/ruby'

const Ruby: FC<{ text: string }> = ({ text }) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: textToRubyTag(text),
      }}
    />
  )
}
export default Ruby
