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
  List
} from '@material-ui/core'
import { connect, useDispatch } from 'react-redux'

import URL from '../config/url.config.json'
import { RootState } from '../redux/reducer/RootReducer'
import { TPrayer } from '../types/Prayer'
import Layout from '../components/Layout'
import { CreatePrayer, AddPrayerInformations, AddPrayerNotif } from '../components/AddPrayer'
import { updatePrayers } from '../redux/actions/PrayerActions'
import { Delete, Edit } from '@material-ui/icons'

const PrayersPage = ({ prayers }: { prayers: TPrayer[] | undefined }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const steps = ['Create Prayer', 'Add Informations', 'Add Notification Content']
  const [activeStep, setActiveStep] = useState(0)
  const [add, setAdd] = useState(false)

  useEffect(() => {
    fetch(URL.API + '/prayers').then(res => res.json()).then(data => {
      dispatch(updatePrayers(data.prayers))
    })
  }, [])

  const handleNextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  const handleReset = () => setActiveStep(0)

  return (
    <Layout title="Prayers">
      <div>
        <div className={classes.toolbar}>
          <Typography variant="h5">
            Prayers
          </Typography>
          <Button onClick={() => setAdd(true)}>
            Add a prayer
          </Button>
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
                <ListItem key={prayer.name}>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <ListItemText>{prayer.displayName} | {prayer.description}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
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
      </div>
    </Layout>
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
  }
}))

const mapToProps = (state: RootState) => ({
  prayers: state.prayer?.prayers
})

export default connect(mapToProps)(PrayersPage)
