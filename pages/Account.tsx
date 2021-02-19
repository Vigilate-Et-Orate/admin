import React, { useState } from 'react'
import {
  Avatar,
  createStyles,
  Divider,
  Grid,
  Theme,
  Typography,
  makeStyles,
  IconButton,
  TextField,
  Button
} from '@material-ui/core'
import { Edit as EditIcon, Person, SupervisorAccount } from '@material-ui/icons'
import { connect } from 'react-redux'
import { deepOrange } from '@material-ui/core/colors'

import { TUser } from 'types/User'
import Layout from 'components/Layout'
import { RootState } from 'redux/reducer/RootReducer'
import URLS from 'config/url.config.json'

const Account = ({ user, token }: { user: TUser | undefined, token: string }) => {
  const classes = useStyles()

  const [editing, setEditing] = useState(false)
  const [newPwd, setNewPwd] = useState('')

  const updatePwd = async () => {
    const res = await fetch(URLS.API + '/me', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        password: newPwd
      })
    })
  }

  return (
    <Layout title="Account">
      <div className={classes.root}>
        <Typography variant="h4">Profile Page</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={10}>
          <Grid item xs={3}>
            <Avatar className={classes.avatar}>
              {((user?.firstname[0] || '') + user?.lastname[0]) || ''}
            </Avatar>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h3">{user?.firstname + ' ' + user?.lastname}</Typography>
            <Typography variant="h6">{user?.email}</Typography>
            {user &&
              <div style={{ display: 'flex' }}>
                {user.admin ? <SupervisorAccount /> : <Person />}
                <Typography>{user.admin ? 'Admin' : 'Not Admin'}</Typography>
              </div>
            }
            {editing &&
              <div className={classes.edit}>
                <TextField
                  label="Update Pwd"
                  value={newPwd}
                  onChange={e => setNewPwd(e.target.value)}
                />
                <Button
                  variant="outlined"
                  title="Update"
                  onClick={updatePwd}
                >Update</Button>
              </div>
            }
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {
    backgroundColor: deepOrange[900],
    color: theme.palette.getContrastText(deepOrange[900]),
    height: '20vh',
    width: '20vh',
    fontSize: '3rem'
  },
  edit: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1vh'
  },
  divider: {
    marginTop: '2vh',
    marginBottom: '3vh'
  },
  root: {
    height: '88vh',
    paddingTop: '2vh'
  }
}))

const mapToProps = (state: RootState) => ({
  user: state.user.user,
  token: state.user.token
})

export default connect(mapToProps)(Account)