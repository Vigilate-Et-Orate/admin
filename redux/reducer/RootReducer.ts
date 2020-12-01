import { combineReducers } from 'redux'

// Reducers
import screenSizeReducer from './ScreenSizeReducer'
import userReducer from './UserReducer'
import prayerReducer from './PrayerReducer'
import prayerAddReducer from './PrayerAddReducer'

const rootReducer = combineReducers({
  screenSize: screenSizeReducer,
  user: userReducer,
  prayerAdd: prayerAddReducer,
  prayer: prayerReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer