import React, {Component} from 'react'
import {Media, ListGroupItem} from 'reactstrap'
import {connect} from 'react-redux'
import './App.css'

class LeaderBoardUI extends Component {
    render() {
        return (
            <div className="container">
            <div className="card">
                <Media object src={this.props.user.avatarURL} className="circular-image"/>
                <div className="image">
                    <Media heading>{this.props.user.name}</Media>
                    <ListGroupItem for="asked">Asked:{this.props.user.questions.length}</ListGroupItem>
                    <ListGroupItem for="answered">Answered:{Object.keys(this.props.user.answers).length}</ListGroupItem>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps({users}, {id}) {
    return {
        user: users[id]
    };
}

export default connect(mapStateToProps)(LeaderBoardUI);