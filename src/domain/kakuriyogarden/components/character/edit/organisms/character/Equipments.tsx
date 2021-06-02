import { Dispatch, FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/character/edit/atoms/RubyText'
interface Equipment {
  title: string
  detail: string
}
const component: FC<{
  items: Equipment[]
  setEquipments: Dispatch<Equipment[]>
  openInputModal: OpenInputModal
}> = ({ items, setEquipments, openInputModal }) => {
  return (
    <div className="kg-section">
      <div className="kg-section-title" style={{ width: '80px' }}>
        <span style={{}}>
          <ruby>魔装</ruby>
        </span>
        <img src="/images/kakuriyogarden/icons/game-icons/ample-dress.svg" />
      </div>
      <div className="kg-attributes">
        {items.map((item, i) => (
          <div className="kg-attribute kg-editable" key={i}>
            <div
              className=" kg-editable"
              onClick={() =>
                openInputModal(
                  '魔装',
                  item.title,
                  (text) =>
                    setEquipments(
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
                  '魔装詳細',
                  item.detail,
                  (text) =>
                    setEquipments(
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

        <button
          style={{ padding: '5px', marginTop: '15px' }}
          onClick={() =>
            setEquipments([...items, { title: '魔装', detail: '新規魔装' }])
          }
        >
          魔装追加
        </button>
        <button
          style={{ padding: '5px', marginTop: '15px', marginLeft: '50px' }}
          onClick={() => {
            if (!confirm('先頭の魔装を一つ削除します。よろしいですか？')) {
              return
            }
            const [, ...rest] = items
            setEquipments(rest)
          }}
        >
          魔装削除
        </button>
      </div>
    </div>
  )
}
export default component
