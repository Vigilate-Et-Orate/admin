import React, { useState } from 'react'
import clsx from 'clsx'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Drawer,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  createStyles,
  Theme,
  CssBaseline
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  MenuBook,
  Comment,
  AccountBox,
  Dashboard
} from '@material-ui/icons'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'

import { userLogout } from 'redux/actions/UserActions'
import { TUser } from 'types/User'
import { RootState } from 'redux/reducer/RootReducer'

const drawerWidth = 240

const Nav = ({
  loggedIn,
  user,
  children
}: {
  loggedIn: boolean,
  user: TUser | undefined,
  children: JSX.Element | JSX.Element[]
}) => {
  const router = useRouter()
  const classes = useStyle()
  const dispatch = useDispatch()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawerOpen, displayDrawer] = useState(false)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const logout = () => { dispatch(userLogout()); router.push('/SignIn') }
  const handleDrawerOpen = () => displayDrawer(true)
  const handleDrawerClose = () => displayDrawer(false)
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen
      })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton,
              drawerOpen && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Vigilate Et Orate
          </Typography>
          {loggedIn && (
            <div>
              <div className={classes.container}>
                <Typography className={classes.user}>Hi {user?.firstname} !</Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => router.push('/Account')}>Account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!loggedIn &&
          <div>
            <Button color="inherit" onClick={() => router.push('/Register')}>Sign up</Button>
            <Button variant="outlined" color="inherit" onClick={() => router.push('/SignIn')}>Sign In</Button>
          </div>}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        className={classes.drawer}
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => router.push('/')}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          {['Prayers', 'Intentions', 'Users'].map((text, index) => (
            <ListItem button key={text} onClick={() => router.push('/' + text)} disabled={!loggedIn}>
              <ListItemIcon>{index === 0 ? <MenuBook /> : index === 2 ? <Comment /> : <AccountBox />}</ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen
      })}>
        <div className={classes.drawerHeader} />
        {children}
      </div>
    </div>
  )
}

const useStyle = makeStyles((theme: Theme) => createStyles({
  root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      backgroundColor: '#1e2533'
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      backgroundColor: '#e6e6e6'
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    title: {
      flexGrow: 1,
    },
    user: {
      paddingRight: '10px'
    },
    container: {
      display: 'flex',
      alignItems: 'center'
    }
}))

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(Nav)