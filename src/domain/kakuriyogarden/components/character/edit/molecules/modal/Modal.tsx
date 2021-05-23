import { FC } from 'react'

const Modal: FC<{ show: boolean; closeHandler: () => void }> = ({
  show,
  children,
  closeHandler,
}) => {
  const wrapperClass = `kg-overlay ${show ? 'active' : ''}`
  return (
    <div className={wrapperClass} onClick={closeHandler}>
      <div className="kg-modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
export default Modal
