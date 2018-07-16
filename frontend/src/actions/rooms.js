export const addRoom = text => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({text,});
        return fetch("/api/rooms/", {headers, method: "POST", body})
            .then(res => res.json())
            .then(note => {
                return dispatch({
                    type: 'ADD_ROOM',
                    note
                })
            })
    }
}

export const updateRoom = (index, text) => {
    return (dispatch, getState) => {

        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({text,});
        let roomId = getState().rooms[index].id;

        return fetch(`/api/rooms/${roomId}/`, {headers, method: "PUT", body})
            .then(res => res.json())
            .then(room => {
                return dispatch({
                    type: 'UPDATE_NOTE',
                    room,
                    index
                })
            })
    }
}

export const deleteRoom = index => {
    return (dispatch, getState) => {

        let headers = {"Content-Type": "application/json"};
        let roomId = getState().rooms[index].id;

        return fetch(`/api/rooms/${roomId}/`, {headers, method: "DELETE"})
            .then(res => {
                if (res.ok) {
                    return dispatch({
                        type: 'DELETE_ROOM',
                        index
                    })
                }
            })
    }
}

export const fetchRooms = () => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        return fetch("/api/rooms/", {headers,})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return dispatch({type: 'FETCH_ROOMS', notes: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}