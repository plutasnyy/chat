const initialState = [
  {text: "Write code!"}
];


export default function rooms(state=initialState, action) {
  let roomList = state.slice();

  switch (action.type) {

    case 'ADD_ROOM':
      return [...state, {text: action.text}];

    case 'UPDATE_ROOM':
      let roomToUpdate = roomList[action.id]
      roomToUpdate.text = action.text;
      roomList.splice(action.id, 1, roomToUpdate);
      return roomList;

    case 'DELETE_ROOM':
      roomList.splice(action.id, 1);
      return roomList;

    default:
      return state;
  }
}