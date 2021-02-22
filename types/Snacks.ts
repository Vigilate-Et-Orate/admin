import { OptionsObject } from 'notistack-next'

export type TKey = string | number | undefined

export type TSnacksState = {
  notifications: ISnackNotification[]
}

export interface ISnackNotification {
  message: string
  options: OptionsObject
  key?: TKey
}

export interface ISnacksEnqueue {
  type: string
  notification: ISnackNotification
  key?: TKey
}

export interface ISnacksClose {
  type: string
  dismissAll: boolean
  key: TKey
}

export interface ISnacksRemove {
  type: string
  key: TKey
}

export type TSnacksActions = ISnacksClose | ISnacksEnqueue | ISnacksRemove
