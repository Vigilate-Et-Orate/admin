import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack-next'
import { removeSnack } from 'redux/actions/SnacksActions'
import { TKey } from 'types/Snacks'

import { RootState } from 'redux/reducer/RootReducer'

let displayed: TKey[] = []

const Snacker = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(
    (store: RootState) => store.snacks.notifications
  )
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (id: TKey) => {
    displayed = [...displayed, id]
  }
  const removeDisplayed = (id: TKey) => {
    displayed = [...displayed.filter((d) => d !== id)]
  }

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key)
          return
        }
        if (displayed.includes(key)) return
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, key) => {
            if (options.onClose) options.onClose(event, reason, key)
          },
          onExited: (_event, key) => {
            dispatch(removeSnack(key))
            removeDisplayed(key)
          },
        })
        storeDisplayed(key)
      }
    )
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])

  return null
}

export default Snacker
