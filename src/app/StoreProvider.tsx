"use client";

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useRef(makeStore()).current

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}