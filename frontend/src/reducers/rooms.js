const initialState = [];


export default function rooms(state = initialState, action) {
    let roomList = state.slice();

    switch (action.type) {

        case 'ADD_ROOM':
            return [...state, action.room];

        case 'UPDATE_ROOM':
            let roomToUpdate = roomList[action.index]
            roomToUpdate.text = action.room.text;
            roomList.splice(action.index, 1, roomToUpdate);
            return roomList;

        case 'DELETE_ROOM':
            roomList.splice(action.index, 1);
            return roomList;

        case 'FETCH_ROOMS':
            return [...state, ...action.room];

        default:
            return state;
    }
}