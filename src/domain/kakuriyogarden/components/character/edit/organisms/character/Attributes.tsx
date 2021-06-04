import { Dispatch, FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import {
  OpenIframeModal,
  OpenInputModal,
} from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/character/edit/atoms/RubyText'

interface Attributes {
  title: string
  detail: string
}
const component: FC<{
  items: Attributes[]
  setAttributes: Dispatch<Attributes[]>
  openInputModal: OpenInputModal
  openIframeModal: OpenIframeModal
}> = ({ items, setAttributes, openInputModal, openIframeModal }) => {
  return (
    <div className="kg-section">
      <div className="kg-section-title" style={{ width: '200px' }}>
        <span style={{}}>
          <ruby>
            属性<rt>アトリビュート</rt>
          </ruby>
        </span>
        <div className="flex-centering">
          <img
            src="/images/kakuriyogarden/icons/icooon/license.svg"
            style={{
              backgroundColor: '#000',
              paddingLeft: '5px',
              paddingRight: '5px',
              marginBottom: '10px',
            }}
          />
          <a
            href="https://scrapbox.io/magicalGirlTRPG/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E3%81%AE%E4%BD%9C%E3%82%8A%E6%96%B9_%E3%81%9D%E3%81%AE3"
            target="_blank"
          >
            <i
              className="far fa-question-circle"
              style={{ cursor: 'pointer' }}
            ></i>
          </a>
        </div>
      </div>

      <div className="kg-attributes">
        {items.map((item, i) => (
          <div className="kg-attribute kg-editable" key={i}>
            <div
              className="kg-editable"
              onClick={() =>
                openInputModal('属性', item.title, (text) =>
                  setAttributes(
                    items.map((x, j) =>
                      j === i ? { ...item, title: text } : x,
                    ),
                  ),
                )
              }
            >
              <Ruby text={item.title} />
            </div>
            <div
              onClick={() =>
                openInputModal(
                  '属性詳細',
                  item.detail,
                  (text) =>
                    setAttributes(
                      items.map((x, j) =>
                        j === i ? { ...item, detail: text } : x,
                      ),
                    ),
                  'textarea',
                )
              }
            >
              <Ruby text={item.detail} />
            </div>
          </div>
        ))}

        {/* <button style={{ padding: '5px', marginTop: '15px' }}>属性追加</button> */}
      </div>
    </div>
  )
}
export default component
