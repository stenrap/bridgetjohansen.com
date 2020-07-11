import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './eventsSlice'
import scheduleReducer from './scheduleSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    events: eventsReducer,
    schedule: scheduleReducer,
    user: userReducer
  }
})
