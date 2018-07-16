import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {rooms} from './actions/index.js';

class Room extends Component{
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
            this.props.addRoom(this.state.text);
        } else {
            this.props.updateRoom(this.state.updateRoomId, this.state.text);
        }
        this.resetForm();
    }

    selectForEdit = (id) => {
        let room = this.props.rooms[id];
        this.setState({text: room.text, updateRoomId: id});
    }

    render(){
        return(
            <div>
                <h3>Add new room</h3>
                <form onSubmit={this.submitRoom}>
                    <input
                        value={this.state.text}
                        placeholder="Enter note here..."
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
                    <input type="submit" value="Add Room" />
                    <button onClick={this.resetForm}>Reset</button>
                </form>
                <table>
                <tbody>
                    {this.props.rooms.map((room, id) => (
                        <tr key={`room_${id}`}>
                        <td>{room.text}</td>
                        <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                        <td><button onClick={() => this.props.deleteRoom(id)}>delete</button></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addRoom: (text) => {
        dispatch(rooms.addRoom(text));
    },
        updateRoom: (id, text) => {
        dispatch(rooms.updateRoom(id, text));
    },
        deleteRoom: (id) => {
        dispatch(rooms.deleteRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
