export const addRoom = text => {
  return {
    type: 'ADD_ROOM',
    text
  }
}

export const updateRoom = (id, text) => {
  return {
    type: 'UPDATE_ROOM',
    id,
    text
  }
}

export const deleteRoom = id => {
  return {
    type: 'DELETE_ROOM',
    id
  }
}