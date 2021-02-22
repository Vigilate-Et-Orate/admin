import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
} from '@material-ui/core'
import { connect, useDispatch } from 'react-redux'

import URLS from 'config/url.config.json'
import { userLogin } from 'redux/actions/UserActions'
import { RootState } from 'redux/reducer/RootReducer'
import Layout from 'components/Layout'
import { enqueueSnack } from 'actions/SnacksActions'

const SignIn = ({ loggedIn }: { loggedIn: boolean }): JSX.Element => {
  const styles = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loggedIn) router.push('/')
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signin()
  }

  const signin = async () => {
    setLoading(true)
    const res = await fetch(URLS.API + '/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (res) => {
      const data = await res.json()
      if (res.status !== 200) {
        setLoading(false)
        dispatch(
          enqueueSnack({
            message: data.error,
            options: {
              variant: 'error',
            },
          })
        )
        return data
      }
      return data
    })
    if (res.error) return
    dispatch(userLogin(res.token, res.user))
    setEmail('')
    setPassword('')
    setLoading(false)
    dispatch(
      enqueueSnack({
        message: `Welcome ${res.user.firstname}`,
        options: {
          variant: 'success',
        },
      })
    )
    router.push('/')
  }

  return (
    <Layout title="Sign In">
      <div className={styles.background}>
        <img width="100%" height="100%" src={`/login.png`} />
      </div>
      <div className={styles.center}>
        <Card className={styles.root} raised>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Typography className={styles.title}>Admin - Sign In</Typography>
              <div className={styles.input}>
                <TextField
                  className={styles.input}
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  className={styles.input}
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardActions className={styles.actions}>
              <Button type="submit">{loading ? 'Loading' : 'Sign In'}</Button>
              <Button disabled onClick={() => router.push('/Register')}>
                Register
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20,
  },
  center: {
    height: '95vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 40,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: '5%',
    marginBottom: '2%',
  },
  input: {
    width: '100%',
  },
  root: {
    width: '25%',
    backgroundColor: '#e6e6e6a4',
    padding: '2%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: '4px 12px',
  },
})

const mapToProps = (state: RootState) => ({
  loggedIn: state.user.loggedIn,
})

export default connect(mapToProps)(SignIn)
