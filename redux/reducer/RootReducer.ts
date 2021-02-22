import { combineReducers } from 'redux'

// Reducers
import screenSizeReducer from './ScreenSizeReducer'
import userReducer from './UserReducer'
import prayerReducer from './PrayerReducer'
import prayerAddReducer from './PrayerAddReducer'
import intentionsReducer from './IntentionsReducer'
import usersReducer from './UsersReducer'
import snacksReducer from './SnacksReducer'

const rootReducer = combineReducers({
  screenSize: screenSizeReducer,
  user: userReducer,
  users: usersReducer,
  prayerAdd: prayerAddReducer,
  prayers: prayerReducer,
  intentions: intentionsReducer,
  snacks: snacksReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
