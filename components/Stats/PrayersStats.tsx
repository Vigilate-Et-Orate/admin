import React, { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import URL from '../../config/url.config.json'
import { RootState } from '../../redux/reducer/RootReducer'

const PrayersStats = ({ token }: { token: string }) => {
  const [number, setNumber] = useState(0)
  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    fetch(URL.API + '/prayers', {
      headers: {
        'Authorization': token,
        Accept: 'application/json'
      }
    }).then(res => {
      return res.json()
    }).then((data: any) => {
      setNumber(data.prayers.length)
    }).catch(e => {
      console.error(e.message)
    })
  }, [])

  return (
    <div className={classes.cardPad}>
      <Typography variant="h4" >Prayers</Typography>
      <div className={classes.spacing} />
      <Divider />
      <List>
        <ListItem>
          <ListItemText>Total :</ListItemText>
          <ListItemText>{number}</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <div className={classes.actions}>
        <Button variant="contained" onClick={() => router.push('/Prayers')}>
          View Prayers
        </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  spacing: {
    marginTop: '3vh'
  },
  cardPad: {
    padding: '2vw'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '3vh'
  }
})

const mapToProps = (state: RootState) => ({
  token: state.user.token
})

export default connect(mapToProps)(PrayersStats)