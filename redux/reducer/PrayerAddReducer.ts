import CONST from '../constants'
import {
  IPrayerAddPrayer,
  IPrayerAddState,
  TPrayerAddActionsTypes,
  IPrayerAddInfos,
  IPrayerAddNotification
} from '../../types/Prayer'

const initialState: IPrayerAddState = {
  prayer: {
    name: '',
    displayName: '',
    description: '',
    content: '',
    notificationContent: ''
  },
  notificationContent: {
    title: '',
    body: '',
    sound: true
  }
}

const prayerAddReducer = (state = initialState, action: TPrayerAddActionsTypes) => {
  let act
  switch (action.type) {
    case CONST.PRAYER.ADD_PRAYER:
      act = action as IPrayerAddPrayer
      return { ...state, prayer: act.prayer }
    case CONST.PRAYER.ADD_INFOS:
      act = action as IPrayerAddInfos
      return { ...state, prayer: act.prayer }
    case CONST.PRAYER.ADD_NOTIF:
      act = action as IPrayerAddNotification
      return { ...state, notificationContent: act.notificationContent }
    default: return state
  }
}

export default prayerAddReducer