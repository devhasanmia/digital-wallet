import { configureStore } from '@reduxjs/toolkit'
import { RootApi } from './services/RootApi'

export const store = configureStore({
  reducer: {
    auth: RootApi.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch