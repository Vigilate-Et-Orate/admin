import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'
import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Snackbar,
  IconButton
} from '@material-ui/core'
import CloseButton from '@material-ui/icons/Close'
import { connect, useDispatch } from 'react-redux'

import URLS from '../config/url.config.json'
import { TSignInResponse } from '../types/User'
import { userLogin } from '../redux/actions/UserActions'
import { RootState } from '../redux/reducer/RootReducer'
import Layout from '../components/Layout'

const SignIn = ({
  loggedIn
}: {
  loggedIn: boolean
}):JSX.Element => {
  const styles = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [open, displaySnack] = useState(false)

  useEffect(() => {
    if (loggedIn) router.push('/')
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signin()
  }

  const signin = async () => {
    setLoading(true)
    try {
      const res: AxiosResponse<TSignInResponse> = await axios.post(URLS.API + '/login', {
        email,
        password
      })
      dispatch(userLogin(res.data.token, res.data.user))
      setEmail('')
      setPassword('')
      setLoading(false)
      setConfirmation(`Welcome ${res.data.user.firstname} !`)
      displaySnack(true)
      router.push('/')
    } catch (e) {
      console.error(e.message)
      setError('An Error Occured')
      displaySnack(true)
      return
    }
  }

  const snackClose = () => displaySnack(false)

  return (
    <Layout title="Sign In">
      <div className={styles.background}>
        <img
          width="100%"
          height="100%"
          src={`https://source.unsplash.com/random/1200x1080`}
        />
      </div>
      <div className={styles.center}>
        <Card className={styles.root} raised>
          <CardContent>
            <Typography className={styles.title}>
              Admin - Sign In
            </Typography>
            <form className={styles.inputs} onSubmit={handleSubmit}>
              <TextField className={styles.input} id="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <TextField className={styles.input} id="password" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </form>
          </CardContent>
          <CardActions className={styles.actions}>
            <Button type="submit" onClick={signin}>{loading ? 'Loading' : 'Sign In'}</Button>
            <Button onClick={() => router.push('Register')}>Register</Button>
          </CardActions>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={open}
          autoHideDuration={4000}
          message={error ? error : confirmation ? confirmation : ''}
          onClose={snackClose}
          action={
            <React.Fragment>
              <IconButton size="small" onClick={snackClose}>
                <CloseButton fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
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
    zIndex: 20
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
    zIndex: 40
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: '5%',
    marginBottom: '2%'
  },
  input: {
    width: '100%'
  },
  root: {
    width: '25%',
    backgroundColor: '#e6e6e6a4',
    padding: '2%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: '4px 12px'
  }
})

const mapToProps = (state: RootState) => ({
  loggedIn: state.user.loggedIn
})

export default connect(mapToProps)(SignIn)