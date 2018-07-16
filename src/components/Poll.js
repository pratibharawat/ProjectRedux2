import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Poll extends Component {
    render() {
        const {question} = this.props
        const {id, optionOne, optionTwo} = question
        return (
            <Link to={`/questions/${id}`}>
            <div className="container">
                Would You Rather?
                <ul><span>A : </span>{optionOne.text}</ul>
                <ul><span>B : </span>{optionTwo.text}</ul>
            </div>
            </Link>
        )
    }
}

function mapStateToProps({questions}, {id}) {
    return {
        question: questions[id]
    }
}

export default connect(mapStateToProps)(Poll)