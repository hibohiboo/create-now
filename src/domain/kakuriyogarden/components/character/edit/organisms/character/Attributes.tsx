import { Dispatch, FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/character/edit/atoms/RubyText'

interface Attributes {
  title: string
  detail: string
}
const component: FC<{
  items: Attributes[]
  setAttributes: Dispatch<Attributes[]>
  openInputModal: OpenInputModal
}> = ({ items, setAttributes, openInputModal }) => {
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
            }}
          />
        </div>
      </div>

      <div className="kg-attributes">
        {items.map((item, i) => (
          <div className="kg-attribute kg-editable" key={i}>
            <div
              className="kg-editable"
              onClick={() =>
                openInputModal(
                  '属性',
                  item.title,
                  (text) =>
                    setAttributes(
                      items.map((x, j) =>
                        j === i ? { ...item, title: text } : x,
                      ),
                    ),
                  false,
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
                  true,
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
