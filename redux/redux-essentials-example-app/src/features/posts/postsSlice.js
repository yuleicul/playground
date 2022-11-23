import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const postsSlice = createSlice({
  name: 'posts',
  initialState: [
    {
      id: '1',
      title: 'First Post!',
      content: 'Hello!',
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {},
    },
    {
      id: '2',
      title: 'Second Post',
      content: 'More text!',
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      reactions: {},
    },
  ],
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            // If an action needs to contain a unique ID or some other random value,
            // always generate that first and put it in the action object.
            // Reducers should never calculate random values, because that makes the results unpredictable.
            id: nanoid(),
            data: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {},
          },
        }
      },
    },
    postUpdated: (state, action) => {
      const postId = action.payload.id
      const target = state.find((item) => item.id === postId)
      if (target) {
        target.title = action.payload.title
        target.content = action.payload.content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const target = state.find((item) => item.id === postId)
      const targetReaction = target?.reactions?.[reaction]

      if (targetReaction) target.reactions[reaction]++
      else target.reactions[reaction] = 1
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
