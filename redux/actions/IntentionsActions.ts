import constants from '@constants'
import {
  TIntention,
  TIntentionsActionsTypes
} from 'types/Intentions'

export function addIntentions(title: string, content: string): TIntentionsActionsTypes {
  const intention: TIntention = {
    title,
    intention: content
  }
  return {
    type: constants.INTENTIONS.INT_ADD,
    intention
  }
}

export function deleteIntentions(intention: TIntention): TIntentionsActionsTypes {
  return {
    type: constants.INTENTIONS.INT_DELETE,
    intention
  }
}

export function updateIntentions(intentions: TIntention[]): TIntentionsActionsTypes {
  return {
    type: constants.INTENTIONS.INT_UPDATE,
    intentions
  }
}