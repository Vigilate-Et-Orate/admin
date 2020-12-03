import { combineReducers } from 'redux'

// Reducers
import screenSizeReducer from './ScreenSizeReducer'
import userReducer from './UserReducer'
import prayerReducer from './PrayerReducer'
import prayerAddReducer from './PrayerAddReducer'
import intentionsReducer from './IntentionsReducer'
import usersReducer from './UsersReducer'

const rootReducer = combineReducers({
  screenSize: screenSizeReducer,
  user: userReducer,
  users: usersReducer,
  prayerAdd: prayerAddReducer,
  prayers: prayerReducer,
  intentions: intentionsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer