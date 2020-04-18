import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'loading',
  initialState: {
    value: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.value = action.payload
    }
  }
})

// Actions
export const { setLoading } = slice.actions

// Selectors
export const isLoading = state => state.loading.value

// Reducer
export default slice.reducer
