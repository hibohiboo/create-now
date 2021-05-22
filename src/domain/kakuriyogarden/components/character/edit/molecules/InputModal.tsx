import { FC, useEffect, useState } from 'react'
import Modal from './Modal'
import type { InputModal } from '~/domain/kakuriyogarden/store/character'

const modal: FC<InputModal> = (ctx) => {
  const [value, setValue] = useState('')

  // 表示するプロパティが切り替わったタイミングでinputboxをリセット
  useEffect(() => {
    setValue(ctx.value)
  }, [ctx.title])

  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div>
        <div>{ctx.title}</div>
        <div>
          <input
            onChange={ctx.changeHandler}
            onInput={(e) => setValue(e.currentTarget.value)}
            value={value}
          />
        </div>
        <div>
          <button onClick={ctx.closeHandler}>確定</button>
        </div>
      </div>
    </Modal>
  )
}
export default modal
