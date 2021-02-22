import CONST from '@constants'

export interface IPrayerAddState {
  prayer: TPrayer
  notificationContent: TPrayerNotificationContent
}

export interface IPrayerState {
  prayers: TPrayer[]
  count: number
}

export type TPrayer = {
  _id: string
  displayName: string
  name: string
  content: string
  description: string
  notificationContent: string
}

// Prayer

export interface IPrayersAdd {
  type: typeof CONST.PRAYER.PRAYERS_UPDATE
  prayer: TPrayer
}

export interface IPrayersUpdate {
  type: typeof CONST.PRAYER.PRAYERS_UPDATE
  prayers: TPrayer[]
}

export interface IPrayersDelete {
  type: typeof CONST.PRAYER.PRAYER_DELETE
  prayer: TPrayer
}

export interface IPrayerUpdate {
  type: typeof CONST.PRAYER.PRAYER_UPDATE
  prayer: TPrayer
}

export type TPrayerActionsTypes =
  | IPrayersUpdate
  | IPrayersAdd
  | IPrayerUpdate
  | IPrayersDelete

// Prayer Add
export type TPrayerNotificationContent = {
  title: string
  body: string
  sound: boolean
}

export interface IPrayerAddPrayer {
  type: typeof CONST.PRAYER.ADD_PRAYER
  prayer: TPrayer
}

export interface IPrayerAddInfos {
  type: typeof CONST.PRAYER.ADD_INFOS
  prayer: TPrayer
}

export interface IPrayerAddNotification {
  type: typeof CONST.PRAYER.ADD_NOTIF
  notificationContent: TPrayerNotificationContent
}

export type TPrayerAddActionsTypes =
  | IPrayerAddInfos
  | IPrayerAddPrayer
  | IPrayerAddNotification
