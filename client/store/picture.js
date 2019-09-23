import axios from 'axios'

const initialState = {
  pictures: []
}

const GETPICTURES = 'GETPICTURES'
const gotPictures = pictures => {
  return {
    type: 'GETPICTURES',
    pictures
  }
}

export const getPictures = () => async dispatch => {
  try {
    const res = await axios.get('/api/pictures')
    dispatch(gotPictures(res.data))
  } catch (err) {
    console.log('getting pictures data error', err.message)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GETPICTURES:
      return {...state, pictures: action.pictures}
    default:
      return state
  }
}
