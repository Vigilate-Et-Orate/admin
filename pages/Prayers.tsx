import React, { useState, useEffect } from 'react'
import {
  Button,
  createStyles,
  Divider,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Theme,
  Step,
  StepLabel,
  StepContent,
  Stepper,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  ListItemIcon,
  List,
  Modal,
  Fade,
  Backdrop,
  TextField,
} from '@material-ui/core'
import { connect, useDispatch } from 'react-redux'
import { Delete, Edit } from '@material-ui/icons'
import { useRouter } from 'next/router'

import URL from 'config/url.config.json'
import { RootState } from 'redux/reducer/RootReducer'
import { TPrayer } from 'types/Prayer'
import Layout from 'components/Layout'
import { CreatePrayer, AddPrayerInformations, AddPrayerNotif } from 'components/AddPrayer'
import { updatePrayer, updatePrayers, removePrayers } from 'redux/actions/PrayerActions'

const PrayersPage = ({ prayers, token, loggedIn }: { prayers: TPrayer[] | undefined, token: string, loggedIn: boolean }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()

  const steps = ['Create Prayer', 'Add Informations', 'Add Notification Content']
  const [activeStep, setActiveStep] = useState(0)
  const [add, setAdd] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [o, so] = useState(false)
  const [open, openModal] = useState(false)
  const [editP, setEditP] = useState<TPrayer>()

  useEffect(() => {
    if (!loggedIn) router.push('/SignIn')
    if (!prayers || prayers.length <= 0)
      fetch(URL.API + '/prayers').then(res => res.json()).then(data => {
        dispatch(updatePrayers(data.prayers))
      })
  }, [])

  const handleNextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  const handleReset = () => setActiveStep(0)
  const forceReload = () => so(!o)
  const handleClose = () => openModal(false)
  const getChecked = (id: string) => {
    if (selected.find(e => e === id)) return true
    return false
  }
  const addChecked = (id: string) => {
    const index = selected.findIndex(e => e === id)
    if (index !== -1) selected.splice(index, 1)
    else selected.push(id)
    setSelected(selected)
    forceReload()
  }
  const deletePrayer = async (id: string) => {
    if (!id) return
    const res = await fetch(URL.API + `/prayers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).catch(e => console.error(e.message))
    if (!res) return
    const data = await res.json()
    dispatch(removePrayers(data))
  }
  const deleteAll = () => {
    selected.forEach(e => deletePrayer(e))
    setSelected([])
  }

  return (
    <Layout title="Prayers">
      <div>
        <div className={classes.toolbar}>
          <Typography variant="h5">
            Prayers
          </Typography>
          <div className={classes.actionsTool}>
            {selected && selected.length > 0 && (
              <div className={classes.actionsTool}>
                <Button onClick={deleteAll}>
                  delete { selected.length > 1 ? 'All' : '' }
                </Button>
                <Button onClick={() => setSelected([])}>
                  Reset Selection
                </Button>
              </div>
            )
            }
            <Button onClick={() => setAdd(true)}>
              Add a prayer
            </Button>
          </div>
        </div>
        <Divider />
        {add && 
          <div className={classes.add}>
            <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <div>
                      {index === 0 ? <CreatePrayer handleBackStep={handleBackStep} handleNextStep={handleNextStep} activeStep={activeStep} />
                      : index === 1 ? <AddPrayerInformations handleBackStep={handleBackStep} handleNextStep={handleNextStep} activeStep={activeStep} />
                      : <AddPrayerNotif handleBackStep={handleBackStep} handleNextStep={handleNextStep} />}
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <div className={classes.resetContainer}>
                <Typography>Done ! The prayer has been successfully added</Typography>
                <Button onClick={handleReset} className={classes.buttonTwo}>
                  Add a New Prayer
                </Button>
                <Button onClick={() => setAdd(false)} className={classes.button}>
                  Close
                </Button>
              </div>
            )}
          </div>
        }
        <div className={classes.list}>
          <List>
            {prayers && prayers.map((prayer: TPrayer) => (
              <React.Fragment>
                <ListItem key={prayer._id}>
                  <ListItemIcon>
                    <Checkbox
                      checked={getChecked(prayer._id)}
                      onChange={() => addChecked(prayer._id)}
                    />
                  </ListItemIcon>
                  <ListItemText>{prayer.displayName} | {prayer.description}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => { setEditP(prayer); openModal(true) }}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deletePrayer(prayer._id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          {prayers && prayers.length <= 0 &&
            <div style={{ textAlign: 'center', marginTop: '10vh', height: '80vh' }}>
              <Typography variant="h6">No Prayers</Typography>
            </div>
          }
        </div>
        <Modal
          aria-labelledby="transition-model-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <EditPrayer prayer={editP} closeModal={handleClose} token={token} />
          </Fade>
        </Modal>
      </div>
    </Layout>
  )
}

const EditPrayer = ({ prayer, closeModal, token }: { prayer: TPrayer | undefined, closeModal: () => void, token: string }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [displayName, setDispName] = useState(prayer?.displayName || '')
  const [name, setName] = useState(prayer?.name || '')
  const [description, setDescription] = useState(prayer?.description || '')
  const [content, setContent] = useState(prayer?.content || '')

  const handleSubmit = async () => {
    const p: TPrayer = {
      _id: prayer?._id || '',
      displayName,
      name,
      description,
      content,
      notificationContent: prayer?.notificationContent || ''
    }
    const res = await fetch(URL.API + '/prayers/' + prayer?._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        prayerContent: p
      })
    }).then(res => res.json())
    res.notificationContent = prayer?.notificationContent || res.notificationContent || ''
    dispatch(updatePrayer(res))
    closeModal()
  }

  return (
    <div className={classes.paper}>
      <Typography variant="h4">Edit {prayer?.displayName}</Typography>
      <Divider className={classes.divider} />
      <form onSubmit={handleSubmit} className={classes.inputs}>
        <TextField
          label="Display Name"
          value={displayName}
          onChange={e => setDispName(e.target.value)}
          className={classes.modalInput}
        />
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className={classes.modalInput}
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={classes.modalInput}
        />
        <TextField
          label="Content"
          value={content}
          multiline
          rows={6}
          onChange={e => setContent(e.target.value)}
          className={classes.modalInput}
        />
        <div className={classes.modalAction}>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px'
  },
  list: {
    paddingTop: '5vh',
    paddingRight: '20vw',
    paddingLeft: '20vw',
    height: '80vh'
  },
  add: {
    height: '50vh',
    width: '100%',
  },
  root: {
    width: '80%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsTool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
  resetContainer: {
    padding: theme.spacing(3)
  },
  stepper: {
    backgroundColor: '#e6e6e6'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '60vw',
    backgroundColor: theme.palette.background.paper,
    outlineColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    boxShadow: theme.shadows[10],
    padding: theme.spacing(4, 4, 5),
    borderRadius: 20
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%'
  },
  modalAction: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  modalInput: {
    marginBottom: '1vh'
  },
  divider: {
    marginTop: '1vh',
    marginBottom: '2vh'
  }
}))

const mapToProps = (state: RootState) => ({
  prayers: state.prayers?.prayers,
  token: state.user.token,
  loggedIn: state.user.loggedIn
})

export default connect(mapToProps)(PrayersPage)
