import axios from 'axios'

const initialState = {
  pictures: [],
  isSaved: false
}

// get
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

// post
const ADDNEWPICTURE = 'ADDNEWPICTURE'
const addedNewPicture = picture => {
  return {
    type: 'ADDNEWPICTURE',
    picture
  }
}

export const addNewPicture = picture => async dispatch => {
  try {
    const res = await axios.post('/api/pictures', picture)
    dispatch(addedNewPicture(res.data))
  } catch (err) {
    console.log('adding pictures data error', err.message)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GETPICTURES:
      return {...state, pictures: action.pictures}
    case ADDNEWPICTURE:
      return {...state, isSaved: true}
    default:
      return state
  }
}
