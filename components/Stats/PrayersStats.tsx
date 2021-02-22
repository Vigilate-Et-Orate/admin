import React from 'react'
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import { RootState } from 'redux/reducer/RootReducer'

const PrayersStats = ({ count }: { count: number }) => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.cardPad}>
      <Typography variant="h4">Prayers</Typography>
      <div className={classes.spacing} />
      <Divider />
      <List>
        <ListItem>
          <ListItemText>Total :</ListItemText>
          <ListItemText>{count}</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <div className={classes.actions}>
        <Button variant="contained" onClick={() => router.push('/Prayers')}>
          Manage Prayers
        </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  spacing: {
    marginTop: '1vh',
  },
  cardPad: {
    padding: '1.5vw',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '2vh',
  },
})

const mapToProps = (state: RootState) => ({
  count: state.prayers.count,
})

export default connect(mapToProps)(PrayersStats)
