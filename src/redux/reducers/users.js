import { handleActions } from 'redux-actions'

const transform = (state, items = [], uniqueId) => {
  const { ids, entities, ...rest } = state

  items.forEach(item => {
    const id = item[uniqueId]
    const index = ids.indexOf(id)

    if (~index) {
      ids.splice(index, 1)
    }

    ids.push(id)
    entities[id] = item
  })

  return { ids: [ ...ids ], entities: { ...entities }, ...rest }
}

export default handleActions({

  FETCH_USER: (state, action) => {
    const { entities, ...rest } = state
    entities[action.payload.user_id] = action.payload
    return { entities: { ...entities }, ...rest }
  },

  FETCH_USERS: (state, action) => transform(state, action.payload.items, 'user_id')

}, {
  ids: [],
  entities: {},
  mata: {
    // uniqueId: 'user_id'
  }
})
