import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from 'redux/store'
import { SnackbarProvider } from 'notistack-next'
import Snacker from 'components/Snacker'

import '../css/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <Snacker />
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  )
}
