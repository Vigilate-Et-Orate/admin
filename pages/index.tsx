import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { connect, useDispatch } from 'react-redux'
import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import {
  HorizontalGridLines,
  RadialChart,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineSeries,
} from 'react-vis'

import URL from 'config/url.config.json'
import Layout from 'components/Layout'
import { TUser } from 'types/User'
import { RootState } from 'redux/reducer/RootReducer'
import { updateUserToken, updateUser } from 'redux/actions/UserActions'
import { updateUsers } from 'redux/actions/UsersActions'
import { updatePrayers } from 'redux/actions/PrayerActions'
import UserStats from 'components/Stats/UserStats'
import PrayersStats from 'components/Stats/PrayersStats'

function Home({
  user,
  loggedIn,
  overview,
  list,
  width,
}: {
  loggedIn: boolean
  user: TUser | undefined
  width: number
  overview: { percentage: number; angle: number; color: string }[]
  list: { y: number; x: number }[]
}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const classes = useStyles()

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch({
        type: 'RESIZE',
        value: window.innerWidth,
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
          Authorization: token,
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .catch(console.error)
      dispatch(updateUser(user))
    }
    // Prayers
    const prayers = await fetch(URL.API + '/prayers')
      .then((res) => res.json())
      .catch(console.error)
    dispatch(updatePrayers(prayers.prayers))
    // Users
    if (!token) return
    const users = await fetch(URL.API + '/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .catch(console.error)
    dispatch(updateUsers(users.users))
  }

  return (
    <Layout title="Dashboard">
      <div className={classes.root}>
        {loggedIn && (
          <div>
            <h1 className={classes.title}>Hi {user?.firstname}</h1>
            <div className={classes.center}>
              <Grid container spacing={7} alignItems="center" justify="center">
                <Grid item xs={6}>
                  <Paper elevation={10} className={classes.paper}>
                    <PrayersStats />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={10} className={classes.paper}>
                    <UserStats />
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Paper elevation={10} className={classes.paper}>
                    <XYPlot xType="time" width={800} height={230}>
                      <HorizontalGridLines />
                      <VerticalGridLines />
                      <XAxis title="Time" />
                      <YAxis title="Status" />
                      <LineSeries data={list} />
                    </XYPlot>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper
                    elevation={10}
                    className={classes.paper}
                    style={{ position: 'relative' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        top: '35%',
                        left: '22%',
                      }}
                    >
                      <h1 style={{ fontSize: 16 }}>Server Uptime</h1>
                      <h2 style={{ fontSize: 28, margin: 0 }}>
                        {overview[0].percentage}
                        <span style={{ fontSize: 18 }}>%</span>
                      </h2>
                    </div>
                    <RadialChart
                      data={overview}
                      colorType="literal"
                      innerRadius={75}
                      radius={100}
                      width={width ? width * 0.2 : 250}
                      height={width ? width * 0.2 : 300}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        )}
        {!loggedIn && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h4">
              API Vigilate et Orate Administration Dashboard
            </Typography>
            <Divider />
            <Typography variant="h6">Please Sign In to continue</Typography>
          </div>
        )}
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  root: {
    height: '86vh',
  },
  title: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingLeft: '5%',
    marginBottom: '5vh',
  },
  paper: {
    padding: '5%',
    textAlign: 'center',
    color: '#1e2533',
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'center',
  },
  divider: {
    marginTop: '3vh',
    marginBottom: '6vh',
  },
})

export const getServerSideProps: GetServerSideProps = async (
  _context: GetServerSidePropsContext
) => {
  const overview = await fetch(
    'http://localhost:6363/stats/overview'
  ).then((res) => res.json())
  let list = await fetch('http://localhost:6363/stats/list').then((res) =>
    res.json()
  )

  if (!overview || !list) return { notFound: true }

  list = list.map((l: { x: string; y: number }) => ({
    y: l.y,
    x: new Date(l.x).getTime(),
  }))
  return {
    props: {
      overview,
      list,
    },
  }
}

const mapToProps = (state: RootState) => ({
  width: state.screenSize.width,
  user: state.user.user,
  loggedIn: state.user.loggedIn,
})

export default connect(mapToProps)(Home)
