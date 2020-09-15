import React from 'react'
import Link from '../../atoms/mui/Link'

const CreatedWithLogin: React.FC<{ authUser: any }> = ({ authUser }) => {
  return (
    <>
      <h4>ログインが必要なもの</h4>
      {!authUser ? (
        <>
          <div>ログインをすると表示されます。</div>
          <div>
            <Link href={'/auth/login-ja.html'}>ログイン</Link>
          </div>
          {/* <div>
            <Link href={'/auth/login'}>Login</Link>
          </div> */}
        </>
      ) : (
        <>
          <Link href={'/mypage'}>マイページ</Link>
        </>
      )}
    </>
  )
}
export default CreatedWithLogin
