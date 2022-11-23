import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // why not `state = action.payload`
      // Immer lets us update state in two ways:
      //    either mutating the existing state value,
      //    or returning a new result.
      return action.payload
    })
  },
})

export default usersSlice.reducer
