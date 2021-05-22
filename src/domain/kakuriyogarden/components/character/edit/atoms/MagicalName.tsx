import { FC } from 'react'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character'

const Footer: FC<{
  symbolName: string
  magicalName: string
  setSymbolName: any
  setMagicalName: any
  openInputModal: OpenInputModal
}> = ({
  symbolName,
  magicalName,
  setSymbolName,
  setMagicalName,
  openInputModal,
}) => {
  return (
    <div className="kg-magical-name">
      <div
        className="kg-editable"
        onClick={() => openInputModal('シンボル', symbolName, setSymbolName)}
      >
        {symbolName}
      </div>
      <div className="kg-magicalgirl">の魔法少女</div>
      <div
        className="kg-editable"
        onClick={() => openInputModal('魔法名', magicalName, setMagicalName)}
      >
        {magicalName}
      </div>
    </div>
  )
}
export default Footer
