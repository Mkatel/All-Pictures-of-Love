import axios from 'axios'

const initialState = {pictures: [], isSaved: false}

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
    //const res = await axios.get('/api/pictures') // for postgres
    const res = await axios.get('/apimysql/pictures') // for mysql
    dispatch(gotPictures(res.data))
  } catch (err) {
    console.log('getting pictures data error', err.message)
  }
}

export const getPicturesByFilter = filter => async dispatch => {
  try {
    if (!filter) filter = ' where 1 = 1 '
    //const res = await axios.put(`/api/pictures/filterBy`, filter); // postgres
    const res = await axios.get(`/apimysql/pictures/filterBy/${filter}`) // mysql
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
    //const res = await axios.post('/api/pictures', picture); // for postgres
    const res = await axios.post('/apimysql/pictures', picture)
    dispatch(addedNewPicture(res.data))
  } catch (err) {
    console.log('adding pictures data error', err.message)
  }
}

export const removePicture = id => async dispatch => {
  try {
    console.log('pic', id)
    if (!id) throw new Error('Wrong id.')
    const res1 = await axios.delete(`/apimysql/pictures/${id}`)
    const res = await axios.get('/apimysql/pictures')
    dispatch(gotPictures(res.data))
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
