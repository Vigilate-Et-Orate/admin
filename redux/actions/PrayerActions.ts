import {
  TPrayer,
  TPrayerNotificationContent,
  TPrayerAddActionsTypes,
  TPrayerActionsTypes
} from '../../types/Prayer'
import CONST from '../constants'

export function addPrayer(displayName: string, content: string): TPrayerAddActionsTypes {
  const prayer: TPrayer = {
    _id: '',
    displayName: displayName,
    content: content,
    name: '',
    description: '',
    notificationContent: ''
  }
  return {
    type: CONST.PRAYER.ADD_PRAYER,
    prayer
  }
}

export function addPrayerInfos(prayer: TPrayer): TPrayerAddActionsTypes {
  return {
    type: CONST.PRAYER.ADD_INFOS,
    prayer
  }
}

export function addPrayerNotification(notification: TPrayerNotificationContent): TPrayerAddActionsTypes {
  return {
    type: CONST.PRAYER.ADD_NOTIF,
    notificationContent: notification
  }
}

export function addPrayers(prayer: TPrayer): TPrayerActionsTypes {
  return {
    type: CONST.PRAYER.PRAYERS_ADD,
    prayer
  }
}

export function updatePrayers(prayers: TPrayer[]): TPrayerActionsTypes {
  return {
    type: CONST.PRAYER.PRAYERS_UPDATE,
    prayers
  }
}

export function removePrayers(prayer: TPrayer): TPrayerActionsTypes {
  return {
    type: CONST.PRAYER.PRAYER_DELETE,
    prayer
  }
}