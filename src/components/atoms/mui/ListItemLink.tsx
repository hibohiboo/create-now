import ListItem from '@material-ui/core/ListItem'
import Link from '~/components/atoms/mui/Link'

const ListItemLink = (props) => {
  // button={true}にすると、 hrefに{pathname:'', query: {}}の形で入力したときに、Failed prop type: Invalid prop `href` of type `object` supplied to `ForwardRef(ButtonBase)`, expected `string`.のエラー
  return <ListItem button={true} component={Link} {...props} />
}

export default ListItemLink
