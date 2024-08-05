
'use client'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Map from '@mui/icons-material/Map';
import AccountBox from '@mui/icons-material/AccountBox';
import { CssBaseline, Link } from '@mui/material';
import Error from '../error/Error';
const menus = [{
    path: '/app',
    title: 'Geo Location',
    icon: <Map/>
}, {
  path: '/app/profiling',
  title: 'Profiling',
  icon: <AccountBox/>
}, {
  path: '/app/profiler',
  title: 'Profiler V2',
  icon: <AccountBox/>
}
]
export default function Sidebar() {
    return (
    <div>
      <Divider />
      <List>
        {menus.map(({
            icon, path, title
        }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton LinkComponent={Link} href={path}>
              <ListItemIcon>
                { icon }
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Error/>
      <Divider />
      </div>
    )
}