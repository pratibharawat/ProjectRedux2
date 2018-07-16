import React, {Component} from 'react'
import {Label, Media, Card, CardBody} from 'reactstrap'
import {connect} from 'react-redux'
import './App.css'

class LeaderBoardUI extends Component {
    render() {
        return (
            <div class="container">
            <Card>
                <CardBody>
                <Media object src={this.props.user.avatarURL} className="circular-image"/>
                <Media middle body>
                    <Media heading>
                        {this.props.user.name}
                    </Media>
                    <div className="float-left">
                        <Label for="asked">Asked:</Label><span id="asked">{this.props.user.questions.length}</span>
                    </div>
                    <div className="float-right">
                        <Label for="answered">Answered:</Label><span id="answered">{Object.keys(this.props.user.answers).length}</span>
                    </div>
                </Media>
                </CardBody>
            </Card>
            </div>
        );
    }
}

function mapStateToProps({users}, {id}) {
    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(LeaderBoardUI)