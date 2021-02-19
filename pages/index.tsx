import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'

import URL from 'config/url.config.json'
import Layout from 'components/Layout'
import { TUser } from 'types/User'
import { RootState } from 'redux/reducer/RootReducer'
import { updateUserToken, updateUser } from 'redux/actions/UserActions'
import { updateUsers } from 'redux/actions/UsersActions'
import { updatePrayers } from 'redux/actions/PrayerActions'
import UserStats from 'components/Stats/UserStats'
import PrayersStats from 'components/Stats/PrayersStats'

function Home({ user, loggedIn }: {
  loggedIn: boolean,
  user: TUser | undefined,
  width: number
}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const classes = useStyles()

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch({
        type: 'RESIZE',
        value: window.innerWidth
      })
    })
    const token = localStorage.getItem('__token')
    if (!loggedIn && !token) {
      router.push('/SignIn')
      return
    } else if (token) {
      dispatch(updateUserToken(token))
    }
    loadData(token || '')
  }, [])

  const loadData = async (token: string) => {
    // User
    const user = localStorage.getItem('__user')
    if (user) dispatch(updateUser(JSON.parse(user)))
    else if (token) {
      const user = await fetch(URL.API + '/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          Accept: 'application/json'
        }
      })
        .then(res => res.json())
        .catch(console.error)
      dispatch(updateUser(user))
    }
    // Prayers
    const prayers = await fetch(URL.API + '/prayers')
      .then(res => res.json())
      .catch(console.error)
    dispatch(updatePrayers(prayers.prayers))
    // Users
    if (!token) return
    const users = await fetch(URL.API + '/users', {
      headers: {
        'Content-Type': 'application/json',
          'Authorization': token,
          Accept: 'application/json'
      }
    }).then(res => res.json()).catch(console.error)
    dispatch(updateUsers(users.users))
  }

  return (
    <Layout title="Dashboard">
      <div className={classes.root}>
        {loggedIn &&
          <div>
            <h1 className={classes.title}>Hi {user?.firstname}</h1>
            <div className={classes.center}>
              <Grid container spacing={10}>
                <Grid item xs={6}>
                  <Paper elevation={10} className={classes.paper}>
                    <PrayersStats />
                  </Paper>
                </Grid>
                {/* <Grid item xs={4}>
                  <Paper elevation={10} className={classes.paper}>
                    <IntentionsStats />
                  </Paper>
                </Grid> */}
                <Grid item xs={6}>
                  <Paper elevation={10} className={classes.paper}>
                    <UserStats />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        }
        {!loggedIn && <div style={{ textAlign: 'center' }}>
          <Typography variant="h4">API Vigilate et Orate Administration Dashboard</Typography>
          <Divider />
          <Typography variant="h6">Please Sign In to continue</Typography>
        </div>}
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  root: {
    height: '86vh'
  },
  title: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingLeft: '5%',
    marginBottom: '5vh'
  },
  paper: {
      padding: '5%',
      textAlign: 'center',
      color: '#1e2533'
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'center'
  },
  divider: {
    marginTop: '3vh',
    marginBottom: '6vh'
  }
})

const mapToProps = (state: RootState) => ({
  width: state.screenSize.width,
  user: state.user.user,
  loggedIn: state.user.loggedIn
})

export default connect(mapToProps)(Home)