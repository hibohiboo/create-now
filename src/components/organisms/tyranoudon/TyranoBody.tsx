import { FC } from 'react'

const TryranoBody: FC = () => {
  return (
    <>
      <div
        id="tyrano_base"
        className="tyrano_base"
        style={{ overflow: 'hidden', position: 'absolute' }}
        unselectable="on"
      ></div>
      <div
        id="vchat_base"
        className="vchat_base"
        style={{ overflow: 'hidden' }}
        unselectable="on"
      ></div>
      <div className="remodal-bg"></div>
      <div
        className="remodal"
        data-remodal-id="modal"
        data-remodal-options="closeOnEscape:false, closeOnOutsideClick:false"
      >
        <h1 className="remodal_title"></h1>
        <p className="remodal_txt"></p>
        <br />
        <button data-remodal-action="cancel" className="remodal-cancel">
          Cancel
        </button>
        <button data-remodal-action="confirm" className="remodal-confirm">
          OK
        </button>
      </div>
      <input data-tyrano="config" type="hidden" data-key="vchat" value="true" />
      <input
        type="hidden"
        data-tyrano="config"
        data-key="vchatMenuVisible"
        value="true"
      />{' '}
    </>
  )
}
export default TryranoBody
