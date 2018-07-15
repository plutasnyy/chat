import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Room extends Component{
    render(){
        return(
            <div>
                <table>
                  <tbody>
                    {this.props.rooms.map(note => (
                      <tr>
                        <td>{note.text}</td>
                        <td><button>edit</button></td>
                        <td><button>delete</button></td>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
