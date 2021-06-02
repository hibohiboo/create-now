import { FC } from 'react'
import {
  OpenImageEditModal,
  OpenInputModal,
} from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/character/edit/atoms/RubyText'

const Profile: FC<{
  imageUrl: string
  profile: string
  setProfile: any
  handleOnDrop: any
  openInputModal: OpenInputModal
  openImageEditModal: OpenImageEditModal
}> = ({
  imageUrl,
  profile,
  setProfile,
  handleOnDrop,
  openInputModal,
  openImageEditModal,
}) => {
  return (
    <div className="kg-profile">
      <div
        className="kg-editable"
        onClick={() => {
          openImageEditModal('キャラクターアイコン', imageUrl, handleOnDrop)
        }}
      >
        <img src={imageUrl} />
      </div>
      <div
        className="kg-editable"
        onClick={() => openInputModal('設定', profile, setProfile, true)}
      >
        <Ruby text={profile} />
      </div>
    </div>
  )
}
export default Profile
