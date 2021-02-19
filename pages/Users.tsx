import React, { useEffect, useState } from 'react'
import {
  Button,
  createStyles,
  Divider,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Theme,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  ListItemIcon,
  List,
  Snackbar,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { Delete, Edit, SupervisorAccountRounded, Fingerprint, Close } from '@material-ui/icons'
import { useRouter } from 'next/router'

import { RootState } from 'redux/reducer/RootReducer'
import { TUser } from 'types/User'
import Layout from 'components/Layout'
import URLS from 'config/url.config.json'

const Users = ({ users, loggedIn, token }: { users: TUser[] | undefined, loggedIn: boolean, token: string }) => {
  const router = useRouter()
  const classes = useStyles()

  const [o, so] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [open, displaySnack] = useState(false)
  const [msg, setMsg] = useState('')

  const snackClose = () => displaySnack(false)
  const forceReload = () => so(!o)
  const deleteAll = () => {
    // selected.forEach(e => deletePrayer(e))
    setSelected([])
  }
  const getChecked = (id: string) => {
    if (selected.find(e => e === id)) return true
    return false
  }
  const addChecked = (id: string) => {
    const index = selected.findIndex(e => e === id)
    if (index !== -1) selected.splice(index, 1)
    else selected.push(id)
    setSelected(selected)
    forceReload()
  }
  const resetPassword = async (id: string) => {
    const res = await fetch(URLS.API + '/users/' + id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        password: process.env.SECRET_DEFAULT_PWD || 'secretPassword'
      }),
    })
    if (!res) return
    setMsg('Reseted pwd successfully')
    displaySnack(true)
  }

  useEffect(() => {
    if (!loggedIn) router.push('/SignIn')
  })

  return (
    <Layout title="Users">
      <div>
        <div className={classes.toolbar}>
          <Typography variant="h5">
            Users
          </Typography>
          <div className={classes.actionsTool}>
            {selected && selected.length > 0 && (
              <div className={classes.actionsTool}>
                <Button onClick={deleteAll}>
                  delete { selected.length > 1 ? 'All' : '' }
                </Button>
                <Button onClick={() => setSelected([])}>
                  Reset Selection
                </Button>
              </div>
            )
            }
            <Button onClick={() => console.log('add a user')}>
              Add a User
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.list}>
        <List>
          {users && users.map((user: TUser) => (
            <React.Fragment>
              <ListItem key={user._id}>
                <ListItemIcon>
                  <Checkbox
                    checked={getChecked(user._id)}
                    onChange={() => addChecked(user._id)}
                  />
                </ListItemIcon>
                <ListItemText>
                  {user.firstname + ' ' + user.lastname + ' | ' + user.email}
                </ListItemText>
                <ListItemSecondaryAction>
                  {user.admin &&
                    <SupervisorAccountRounded />
                  }
                  <IconButton onClick={() => resetPassword(user._id)}>
                    <Fingerprint />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={4000}
        message={msg}
        onClose={snackClose}
        action={
          <React.Fragment>
            <IconButton size="small" onClick={snackClose}>
              <Close />
            </IconButton>
          </React.Fragment>
        }
      />
    </Layout>
  )
}


const useStyles = makeStyles((_theme: Theme) => createStyles({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px'
  },
  list: {
    paddingTop: '5vh',
    paddingRight: '20vw',
    paddingLeft: '20vw',
    height: '80vh'
  },
  actionsTool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
}))

const mapToProps = (state: RootState) => ({
  users: state.users.users,
  loggedIn: state.user.loggedIn,
  token: state.user.token
})

export default connect(mapToProps)(Users)