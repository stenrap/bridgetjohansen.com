import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './loadingSlice'
import scheduleReducer from './scheduleSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    schedule: scheduleReducer,
    user: userReducer
  }
})
