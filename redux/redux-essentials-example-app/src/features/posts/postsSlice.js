import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { client } from '../../api/client'

// Generate actions
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.posts.push(action.payload)
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
      const target = state.posts.find((item) => item.id === postId)
      if (target) {
        target.title = action.payload.title
        target.content = action.payload.content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const target = state.posts.find((item) => item.id === postId)
      const targetReaction = target?.reactions?.[reaction]

      if (targetReaction) target.reactions[reaction]++
      else target.reactions[reaction] = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)

export default postsSlice.reducer
