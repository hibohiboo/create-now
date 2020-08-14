import { FC } from 'react'

const TryranoBody: FC<{ name: string; configs: any[] }> = ({
  name,
  configs,
}) => {
  const first =
    'http://192.168.50.10:3000/api/v1/tyranoudon?sheet=1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58' ||
    `${name}.ks`
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
      <input type="hidden" id="first_scenario_file" value={first}></input>
      {configs.map(([key, val]) => (
        <input
          data-tyrano="config"
          type="hidden"
          data-key={key}
          value={val}
          key={key}
        />
      ))}
    </>
  )
}
export default TryranoBody
