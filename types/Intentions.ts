import constants from '@constants'

export type TIntention = {
  title: string
  intention: string
}

export interface IIntentionsState {
  intentions: TIntention[]
  count: number
}

// Intentions

export interface IIntentionsAdd {
  type: typeof constants.INTENTIONS.INT_ADD
  intention: TIntention
}

export interface IIntentionsUpdate {
  type: typeof constants.INTENTIONS.INT_UPDATE
  intentions: TIntention[]
}

export interface IIntentionsDelete {
  type: typeof constants.INTENTIONS.INT_DELETE
  intention: TIntention
}

export type TIntentionsActionsTypes =
  | IIntentionsAdd
  | IIntentionsDelete
  | IIntentionsUpdate
