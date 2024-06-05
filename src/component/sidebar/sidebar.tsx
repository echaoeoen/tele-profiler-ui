
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

const menus = [{
    path: '/',
    title: 'Geo Location',
    icon: <Map/>
}, {
    path: '/profiling',
    title: 'Profiling',
    icon: <AccountBox/>
}
]
export default function Sidebar() {
    return (
    <div>
      <img src="/logo.png" alt="logo" style={{width: 200}}/>
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
      <Divider />
      </div>
    )
}