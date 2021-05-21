import classes from '*.module.css'
import { FC } from 'react'

const SubPage: FC<{ id: string }> = ({ children, id }) => {
  return <div className={`kg-subpage kg-${id}`}>{children}</div>
}
export default SubPage
