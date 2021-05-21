// display: 'flex',
// flexWrap: 'wrap',
import { FC } from 'react'

const Header: FC<{}> = ({ children }) => {
  return <div className="kg-header">{children}</div>
}
export default Header
