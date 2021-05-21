import { FC } from 'react'

const Footer: FC<{ symbolName: string; magicalName: string }> = ({
  symbolName,
  magicalName,
}) => {
  return (
    <div className="kg-magical-name">
      <div className="kg-editable">{symbolName}</div>
      <div className="kg-magicalgirl">の魔法少女</div>
      <div className="kg-editable">{magicalName}</div>
    </div>
  )
}
export default Footer
