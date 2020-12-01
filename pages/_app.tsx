import React from 'react'
import { AppProps } from 'next/app'
import '../css/index.css'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}