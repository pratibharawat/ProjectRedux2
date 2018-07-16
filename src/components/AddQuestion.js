import {handleAddQuestion} from "../actions/questions"
import React, {Component} from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toDashboard: false
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {optionOne, optionTwo} = this.state
        this.props.dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toDashboard: true
        }))
    }

    handleChange = (e) => {
        const {value, id} = e.target
        this.setState(() => ({[id]: value}))
    }

    render() {
        const {optionOne, optionTwo, toDashboard} = this.state

        if (toDashboard === true) {
            return <Redirect to='/'/>
        }
        return (
            <div class="container">
                <h1>Would You Rather?</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input
                            type="text"
                            id="optionOne"
                            placeholder="Enter Option One Text Here"
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            id="optionTwo"
                            placeholder="Enter Option Two Text Here"
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <Button className="button"
                        disabled={optionOne === '' && optionTwo === ''}>Add Question</Button>
                </Form>
            </div>
        )
    }
}

export default connect()(NewQuestion)