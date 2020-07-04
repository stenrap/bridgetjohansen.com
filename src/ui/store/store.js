import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './eventsSlice'
import loadingReducer from './loadingSlice'
import scheduleReducer from './scheduleSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    events: eventsReducer,
    loading: loadingReducer,
    schedule: scheduleReducer,
    user: userReducer
  }
})
