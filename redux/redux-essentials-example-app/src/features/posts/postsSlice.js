import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text!' },
  ],
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
