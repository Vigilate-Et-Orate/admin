import React, { useEffect } from 'react'
import {
  Divider,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { connect, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import firebase from 'config/firebase'
import Layout from '../components/Layout'
import { TIntention } from 'types/Intentions'
import { RootState } from 'redux/reducer/RootReducer'
import { updateIntentions } from 'redux/actions/IntentionsActions'

const Intentions = ({ intentions, loggedIn }: { intentions: TIntention[], loggedIn: boolean }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const router = useRouter()
  const dbIntentions = firebase.firestore().collection('intentions')

  const loadIntentions = async () => {
    const snapshot = await dbIntentions.get()
    const ints: TIntention[] = []
    snapshot.forEach(doc => {
      const data = doc.data()
      ints.push({
        title: data.title,
        intention: data.intention
      })
    })
    dispatch(updateIntentions(ints))
  }

  useEffect(() => {
    if (!loggedIn) router.push('/SignIn')
    if (!intentions || intentions.length === 0)
      loadIntentions()
  })

  return (
    <Layout title="Intentions">
      <Typography variant="h4" >Intentions</Typography>
      <Divider className={classes.divider} />
      <div className={classes.intentions}>
        <List>
          {intentions && intentions.map((int, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              <ListItemText>
                {int.title} | {int.intention}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  intentions: {
    paddingRight: '20vh',
    paddingLeft: '20vh',
    height: '80vh'
  },
  divider: {
    marginTop: '4vh',
    marginBottom: '2vh'
  }
})

const mapToProps = (state: RootState) => ({
  intentions: state.intentions.intentions,
  loggedIn: state.user.loggedIn
})

export default connect(mapToProps)(Intentions)