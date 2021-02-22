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

const UserStats = ({ count }: { count: number }) => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.cardPad}>
      <Typography variant="h4">Users</Typography>
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
        <Button variant="contained" onClick={() => router.push('/Users')}>
          Manage Users
        </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  spacing: {
    marginTop: '3vh',
  },
  cardPad: {
    padding: '2vw',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '3vh',
  },
})

const mapToProps = (state: RootState) => ({
  count: state.users.count,
})

export default connect(mapToProps)(UserStats)
