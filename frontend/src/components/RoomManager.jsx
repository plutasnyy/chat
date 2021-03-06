import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {rooms, auth} from '../actions/index.js';

import {Router, Route} from "react-router-dom";

class RoomManager extends Component {
    state = {
        text: "",
        updateRoomId: null,
    }

    resetForm = () => {
        this.setState({text: "", updateRoomId: null});
    }

    submitRoom = (e) => {
        e.preventDefault();
        if (this.state.updateRoomId === null) {
            this.props.addRoom(this.state.text).then(this.resetForm)
        } else {
            this.props.updateRoom(this.state.updateRoomId, this.state.text).then(this.resetForm);
        }
        this.resetForm();
        window.location.reload();
    }

    selectForEdit = (id) => {
        let room = this.props.rooms[id];
        this.setState({text: room.text, updateRoomId: id});
    }

    componentDidMount() {
        this.props.fetchRooms();
    }

    render() {
        return (
            <div>
                <h2>Welcome to chat</h2>
                <hr/>
                <div style={{textAlign: "right"}}>
                    {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
                </div>
                <Link to={'/login'}>Loguj</Link>
                <h3>Add new room</h3>
                <form onSubmit={this.submitRoom}>
                    <input
                        value={this.state.text}
                        placeholder="Enter note here..."
                        onChange={(e) => this.setState({text: e.target.value})}
                        required/>
                    <input type="submit" value="Add Room"/>
                    <button onClick={this.resetForm}>Reset</button>
                </form>
                <table>
                    <tbody>
                    {this.props.rooms.map((room, id) => (
                        <tr key={"room_"+id}>
                            <td><Link to={'/room/'+room.text}>{room.text}</Link></td>
                            <td>
                                <button onClick={() => this.selectForEdit(id)}>edit</button>
                            </td>
                            <td>
                                <button onClick={() => this.props.deleteRoom(id)}>delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);
const mapStateToProps = state => {
    return {
        rooms: state.rooms,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addRoom: (text) => {
            return dispatch(rooms.addRoom(text));
        },
        updateRoom: (id, text) => {
            return dispatch(rooms.updateRoom(id, text));
        },
        deleteRoom: (id) => {
            dispatch(rooms.deleteRoom(id));
        },
        fetchRooms: () => {
            dispatch(rooms.fetchRooms());
        },
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomManager);
