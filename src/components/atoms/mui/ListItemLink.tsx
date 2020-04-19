import ListItem from '@material-ui/core/ListItem'
import Link from '~/components/atoms/mui/Link'

const ListItemLink = (props) => {
  return <ListItem button component={Link} {...props} />
}

export default ListItemLink
