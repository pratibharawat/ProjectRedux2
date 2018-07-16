import React, {Component} from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane, ListGroup, ListGroupItem} from 'reactstrap';
import {connect} from 'react-redux';
import Poll from './Poll';
import classnames from 'classnames';

class Dashboard extends Component {
    state = {
        activeTab: '1'
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div class="container">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {this.toggle('1');}}
                        >
                        To Answer
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {this.toggle('2');}}
                        >
                        Answered
                        </NavLink>
                    </NavItem>

                </Nav>
                <div class="container">
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                    <ListGroup>
                        {this.props.unAnsweredQuestionIDs.map((questionId) => (
                        <ListGroupItem key={questionId}><Poll id={questionId}/></ListGroupItem>
                        ))}
                    </ListGroup>
                    </TabPane>
                    <TabPane tabId="2">
                    <ListGroup>
                        {this.props.answeredQuestionIDs.map((questionId) => (
                        <ListGroupItem  key={questionId}><Poll id={questionId}/></ListGroupItem>
                        ))}
                    </ListGroup>
                    </TabPane>
                </TabContent>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}) {

    const unAnsweredQuestions = Object.values(questions).filter((q) =>
        !q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser))

    const answeredQuestions = Object.values(questions).filter((q) =>
        q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser)
    )

    return {
        unAnsweredQuestionIDs: Object.values(unAnsweredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),
        answeredQuestionIDs: Object.values(answeredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id)
    }
}

export default connect(mapStateToProps)(Dashboard)