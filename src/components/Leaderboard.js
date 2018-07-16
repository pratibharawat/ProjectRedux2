import React, {Component} from 'react';
import {connect} from 'react-redux';
import LeaderBoardUI from './LeaderBoardUI';

class Leaderboard extends Component {
    render() {
        return (
            <div class="container">
                {this.props.users.map((userId) =>
                    <LeaderBoardUI key={userId} id={userId}/>
                )}
            </div>
        );
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.keys(users)
            .sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) 
            - (Object.keys(users[a].answers).length + users[a].questions.length)))
    };
}

export default connect(mapStateToProps)(Leaderboard);