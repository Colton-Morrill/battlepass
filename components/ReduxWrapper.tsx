import React from 'react'
import { store } from '@/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

const ReduxWrapper = ({children} : any) => {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
  )
}

export default ReduxWrapper