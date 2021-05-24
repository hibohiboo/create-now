import { FC } from 'react'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

const MagicalName: FC<{
  symbolName: string
  symbolNameKana: string
  magicalName: string
  setSymbolName: any
  setSymbolNameKana: any
  setMagicalName: any
  openInputModal: OpenInputModal
}> = ({
  symbolName,
  symbolNameKana,
  magicalName,
  setSymbolName,
  setSymbolNameKana,
  setMagicalName,
  openInputModal,
}) => {
  return (
    <div className="flex-centering">
      <div>
        <div
          className="kg-magical-name-kana kg-editable"
          onClick={() =>
            openInputModal('読み仮名', symbolNameKana, setSymbolNameKana)
          }
        >
          {symbolNameKana}
        </div>
        <div className="kg-magical-name">
          <div
            className="kg-editable"
            onClick={() =>
              openInputModal('シンボル', symbolName, setSymbolName)
            }
          >
            {symbolName}
          </div>
          <div className="kg-magicalgirl">の魔法少女</div>
          <div
            className="kg-editable"
            onClick={() =>
              openInputModal('魔法名', magicalName, setMagicalName)
            }
          >
            {magicalName}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MagicalName
