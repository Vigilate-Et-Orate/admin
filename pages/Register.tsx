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
  IconButton,
} from '@material-ui/core'
import CloseButton from '@material-ui/icons/Close'
import { connect, useDispatch } from 'react-redux'

import URLS from 'config/url.config.json'
import { TRegisterResponse } from 'types/User'
import { RootState } from 'redux/reducer/RootReducer'
import { userLogin } from 'redux/actions/UserActions'
import Layout from 'components/Layout'

const Register = ({ loggedIn }: { loggedIn: boolean }): JSX.Element => {
  const styles = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const [open, displaySnack] = useState(false)

  const register = async () => {
    setLoading(true)
    const res: AxiosResponse<TRegisterResponse> = await axios.post(
      URLS.API + '/register',
      {
        lastname,
        firstname,
        email,
        password,
        admin: true,
      }
    )
    if (res.status !== 200) {
      setError(res.data.error || 'An Error Occured')
      displaySnack(true)
      return
    }
    setLastname('')
    setFirstname('')
    setEmail('')
    setPassword('')
    setLoading(false)
    setConfirmation(res.data.message)
    displaySnack(true)
    dispatch(userLogin(res.data.token, res.data.user))
    setTimeout(() => router.push('/'), 3000)
  }

  const snackClose = () => displaySnack(false)

  useEffect(() => {
    if (loggedIn) router.push('/')
  })

  return (
    <Layout title="Register">
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
              Register for an admin account
            </Typography>
            <div className={styles.inputs}>
              <TextField
                className={styles.input}
                id="firstname"
                label="FirstName"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <TextField
                className={styles.input}
                id="lastname"
                label="LastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
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
            <Button onClick={register}>
              {loading ? 'Loading' : 'Register'}
            </Button>
            <Button onClick={() => router.push('SignIn')}>Sign In</Button>
          </CardActions>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
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
    zIndex: 20,
  },
  center: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 40,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    width: '80%',
    marginTop: '5%',
    marginBottom: '2%',
  },
  input: {
    width: '100%',
  },
  root: {
    width: '25%',
    backgroundColor: '#e5e5e5a4',
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

export default connect(mapToProps)(Register)
