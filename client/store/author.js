import axiso from 'axios'

const initialState = {
  authors: []
}

const GETAUTHORS = 'GETAUTHORS'
const gotAuthors = authors => ({
  type: GETAUTHORS,
  authors
})

export const getAuthors = () => {
  return async dispatch => {
    try {
      const res = await axiso.get('/api/authors')
      dispatch(gotAuthors(res.data))
    } catch (err) {
      console.log('getting author error', err.message)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GETAUTHORS:
      return {...state, authors: action.authors}
    default:
      return state
  }
}
