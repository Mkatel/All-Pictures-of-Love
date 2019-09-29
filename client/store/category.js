import axios from 'axios'

const initialState = {
  categories: []
}

const GOTCATEGORIES = 'GOTCATEGORIES'
const gotCategories = categories => ({
  type: GOTCATEGORIES,
  categories
})

export const getCategories = () => async dispatch => {
  try {
    //const res = await axios.get('/api/categories'); // for postgres
    const res = await axios.get('/apimysql/categories') // for mysql
    dispatch(gotCategories(res.data))
  } catch (err) {
    console.log('getting categories data error', err.message)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOTCATEGORIES:
      return {...state, categories: action.categories}
    default:
      return state
  }
}
