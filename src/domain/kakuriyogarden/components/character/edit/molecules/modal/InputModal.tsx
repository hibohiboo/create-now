import { FC, useEffect, useState } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import Modal from './Modal'
import type { InputModal } from '~/domain/kakuriyogarden/store/character/modal'

const modal: FC<InputModal> = (ctx) => {
  const [value, setValue] = useState('')

  // 表示するプロパティが切り替わったタイミングでinputboxをリセット
  useEffect(() => {
    setValue(ctx.value)
  }, [ctx.title])
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      ctx.closeHandler()
    }
  }

  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-input-modal">
        <div>{ctx.title}</div>
        <div>
          {ctx.isTextArea ? (
            <TextareaAutosize
              rowsMin={3}
              value={value}
              onChange={(e) => ctx.changeHandler(e.target.value)}
              onInput={(e) => setValue(e.currentTarget.value)}
            />
          ) : (
            <input
              onChange={(event) => ctx.changeHandler(event.target.value)}
              onInput={(e) => setValue(e.currentTarget.value)}
              onKeyDown={onKeyDown}
              value={value}
            />
          )}
        </div>
        <div className="kg-button-wrapper">
          <button onClick={ctx.closeHandler}>確定</button>
        </div>
      </div>
    </Modal>
  )
}
export default modal
