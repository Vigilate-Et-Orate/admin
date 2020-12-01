import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
import {
  Grid,
  makeStyles,
  Paper
} from '@material-ui/core'

import Layout from '../components/Layout'
import { TUser } from '../types/User'
import { RootState } from '../redux/reducer/RootReducer'
import { updateUserToken, updateUser } from '../redux/actions/UserActions'
import UserStats from '../components/Stats/UserStats'
import PrayersStats from '../components/Stats/PrayersStats'
import IntentionsStats from '../components/Stats/IntentionsStats'

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
    const user = localStorage.getItem('__user')
    console.log('USER LOADED=', user)
    if (!loggedIn && !token) {
        router.push('/SignIn')
        return
    } else if (token) {
      dispatch(updateUserToken(token))
    }
    if (user) dispatch(updateUser(JSON.parse(user)))
  }, [])

  return (
    <Layout title="Dashboard">
      <div className={classes.root}>
        {loggedIn &&
          <div>
            <h1 className={classes.title}>Hi {user?.firstname}</h1>
            <div className={classes.center}>
              <Grid container spacing={10}>
                <Grid item xs={4}>
                  <Paper elevation={10} className={classes.paper}>
                    <PrayersStats />
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={10} className={classes.paper}>
                    <IntentionsStats />
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={10} className={classes.paper}>
                    <UserStats />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        }
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
  }
})

const mapToProps = (state: RootState) => ({
  width: state.screenSize.width,
  user: state.user.user,
  loggedIn: state.user.loggedIn
})

export default connect(mapToProps)(Home)