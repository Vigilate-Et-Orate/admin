import React, { useState } from 'react'
import {
  Button,
  createStyles,
  Divider,
  FormControlLabel,
  makeStyles,
  Checkbox,
  TextField,
  Theme,
  Typography,
  Snackbar,
  IconButton
} from '@material-ui/core'
import { useDispatch, connect } from 'react-redux'
import { Close, VolumeOffOutlined, VolumeUpOutlined } from '@material-ui/icons'

import { TPrayer, TPrayerNotificationContent } from '../types/Prayer'
import { addPrayer, addPrayerInfos, addPrayerNotification, addPrayers } from '../redux/actions/PrayerActions'
import { RootState } from '../redux/reducer/RootReducer'
import URL from '../config/url.config.json'

type Props = {
  handleBackStep: () => void,
  handleNextStep: () => void,
  activeStep: number,
  prayer: TPrayer
}

const mapToPrayer = (state: RootState) => ({
  prayer: state.prayerAdd.prayer
})

const CreateAPrayer = ({
  handleBackStep,
  handleNextStep,
  prayer,
  activeStep
}: Props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  
  const [displayName, setDisplayName] = useState(prayer.displayName)
  const [content, setContent] = useState(prayer.content)

  const handleNext = () => {
    dispatch(addPrayer(displayName, content))
    handleNextStep()
  }

  return (
    <div>
      <div className={classes.column}>
        <Typography variant="h5">Create Prayer</Typography>
        <Divider className={classes.divider} />
        <TextField
          value={displayName}
          label="Display Name"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          label="Prayer"
          multiline
          rows={6}
        />
      </div>
      <div className={classes.actionsContainer}>
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBackStep}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            className={classes.buttonTwo}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
export const CreatePrayer = connect(mapToPrayer)(CreateAPrayer)

export const AddAPrayerInformations = ({
  prayer,
  handleBackStep,
  handleNextStep,
  activeStep
}: Props) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [name, setName] = useState(prayer.displayName.toLocaleLowerCase().split(' ').join('-'))
  const [description, setDescription] = useState(prayer.description)

  const handleNext = () => {
    const p: TPrayer = {
      displayName: prayer.displayName,
      content: prayer.content,
      name,
      description,
      notificationContent: prayer.notificationContent
    }
    dispatch(addPrayerInfos(p))
    handleNextStep()
  }

  return (
    <div>
      <div className={classes.column}>
        <Typography variant="h5">Add Prayer Informations</Typography>
        <Divider className={classes.divider} />
        <TextField
          value={name}
          label="Name (Unique)"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Short Description"
        />
      </div>
      <div className={classes.actionsContainer}>
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBackStep}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            className={classes.buttonTwo}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
export const AddPrayerInformations = connect(mapToPrayer)(AddAPrayerInformations)

export const AddAPrayerNotif = ({
  notif,
  prayer,
  token,
  handleBackStep,
  handleNextStep
}: {
  notif: TPrayerNotificationContent,
  prayer: TPrayer,
  token: string,
  handleBackStep: () => void,
  handleNextStep: () => void
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [title, setTitle] = useState(notif.title)
  const [body, setBody] = useState(notif.body)
  const [sound, setSound] = useState(notif.sound)
  const [open, displaySnack] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const snackClose = () => displaySnack(false)

  const saveApi = async (notif: TPrayerNotificationContent) => {
    if (!token) {
      setError('Not Signed In Or Invalid Token')
      displaySnack(true)
      return
    }
    const res = await fetch(URL.API + '/prayers', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        prayerContent: prayer,
        notifContent: notif
      })
    }).then(res => res.json())
    .catch(e => {
      setError(e.message)
      displaySnack(true)
    })    
    dispatch(addPrayers({ ...res }))
  }

  const handleNext = () => {
    const notif: TPrayerNotificationContent = {
      title,
      body,
      sound
    }
    dispatch(addPrayerNotification(notif))
    saveApi(notif)
    handleNextStep()
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={4000}
        message={error ? error : message}
        onClose={snackClose}
        action={
          <React.Fragment>
            <IconButton size="small" onClick={snackClose}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <div className={classes.column}>
          <Typography variant="h5">Add Prayer Notification Content</Typography>
          <Divider className={classes.divider} />
          <TextField
            value={title}
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            value={body}
            onChange={(e) => setBody(e.target.value)}
            label="Body"
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<VolumeOffOutlined />}
                checkedIcon={<VolumeUpOutlined />}
                checked={sound}
                onChange={(e) => setSound(e.target.checked)}
              />
            }
            label="Sound"
          />
        </div>
        <div className={classes.actionsContainer}>
          <div>
            <Button
              onClick={handleBackStep}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              className={classes.buttonTwo}
            >
              Finish
            </Button>
          </div>
        </div>
    </div>
  )
}

const mapToNotif = (state: RootState) => ({
  prayer: state.prayerAdd.prayer,
  notif: state.prayerAdd.notificationContent,
  token: state.user.token
})
export const AddPrayerNotif = connect(mapToNotif)(AddAPrayerNotif)

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttonTwo: {
    backgroundColor: '#1e2533',
    color: '#e6e6e6',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '40vw'
  },
  divider: {
    marginTop: '10px',
    marginBottom: '20px'
  }
}))