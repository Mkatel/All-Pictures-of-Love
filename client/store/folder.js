import axiso from 'axios'

const initialState = {
  folders: []
}

const GETFOLDERS = 'GETFOLDERS'
const gotFolders = folders => ({
  type: GETFOLDERS,
  folders
})

export const getFolders = () => {
  return async dispatch => {
    try {
      //const res = await axiso.get('/api/folders'); // for postgres
      const res = await axiso.get('/apimysql/albums') // for mysql
      dispatch(gotFolders(res.data))
    } catch (err) {
      console.log('getting author error', err.message)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GETFOLDERS:
      return {...state, folders: action.folders}
    default:
      return state
  }
}
