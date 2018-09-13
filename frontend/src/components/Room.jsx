import React, {Component} from 'react';
import Websocket from '../Websocket';

export default class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result);
    }

    onOpen() {
        console.log("Open ws");
    }

    onClose() {
        console.log("Close ws");
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendMessage(this.state.value);
    }

    sendMessage(message){
        let x = JSON.stringify({
            'message': message,
            'room': this.props.match.params.id,
        })
        console.log(x);
        this.refWebsocket.sendMessage(x);
    }

    render() {
        let websocketUrl = 'ws://' + window.location.host + '/ws/chat/' +  this.props.match.params.id + '/';
        return (
            <div>
                Hello <br/>
                <div id="chat-log" cols="100" rows="20"></div>
                <br/>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <Websocket url={websocketUrl} onMessage={this.handleData} onOpen={this.onOpen} onClose={this.onClose}
                           ref={Websocket => {
                               this.refWebsocket = Websocket;
                           }}/>
            </div>
        )
    }
}
