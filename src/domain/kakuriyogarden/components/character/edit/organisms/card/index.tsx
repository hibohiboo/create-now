import { FC } from 'react'
import {
  OpenImageEditModal,
  OpenInputModal,
} from '~/domain/kakuriyogarden/store/character/modal'
export type Card = {
  type: string
  kind: string
  name: string
  timing: string
  count: string
  target: string
  range: string
  tags: string[]
  effect: string
  gardeneffect: string
  description: string
  id: string
  image: null | { sourceUrl: string; url: string; source: string }
  maxLevel: null | number
  level: null | number
  successRate: string
  exp: number
  nameKana: string
}
const labelData = {
  timing: 'タイミング',
  count: 'カウント',
  range: '射程',
  target: '対象',
  maxLevel: '最大Lv',
  level: 'Lv',
  exp: 'コスト',
  successRate: '成功率',
}

const Card: FC<{ cardData: Card }> = ({ cardData }) => {
  return (
    <div style={{ padding: '0px', width: '252px' }}>
      <div className="skill-card">
        <div className="wrapper">
          <div className="base">
            <div className="skillLabel">{`${cardData.type}/${cardData.kind}`}</div>
            <div className="image">
              <img src={cardData.image.url} crossOrigin="use-credentials"></img>
            </div>
            <div className="cardNameKana">{cardData.nameKana}</div>
            <div className="cardName">{cardData.name}</div>
            <div className="attrTimingLabel attrLabel border-tlr">
              {labelData.timing}
            </div>
            <div className="attrTimingValue border-tr">{cardData.timing}</div>
            <div className="attrCountLabel attrLabel border-blr">
              {labelData.count}
            </div>
            <div className="attrCountValue border-br">{cardData.count}</div>
            <div className="attrRangeLabel attrLabel border">
              {labelData.range}
            </div>
            <div className="attrRangeValue border-trb">{cardData.range}</div>
            <div className="attrTargetLabel attrLabel border-blr">
              {labelData.target}
            </div>
            <div className="attrTargetValue border-br">{cardData.target}</div>
            <div className="attrSuccessRateLabel attrLabel border-blr">
              {labelData.successRate}
            </div>
            <div className="attrSuccessRate border-br">
              {cardData.successRate}
            </div>
            <div className="attrExpLabel attrLabel border-lr">
              {labelData.exp}
            </div>
            <div className="attrExpValue border-r">{cardData.exp}</div>
            <div className="tags">
              {cardData.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="mainContent border">
              <div className="effect">{cardData.effect}</div>
              <div className="gardeneffect">
                庭園効果: {cardData.gardeneffect}
              </div>
              <div className="description">{cardData.description}</div>
            </div>
            <div className="bottomContent">
              <div className="illustedBy">
                <a
                  href={cardData.image.sourceUrl}
                >{`illust: ${cardData.image.source}`}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card