import React, {Component} from 'react'
import {connect} from 'react-redux'
import './App.css'
import {Button, Form, FormGroup, Label} from 'reactstrap'
import {setAuthedUser} from "../actions/authedUser"
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        user: '',
        isLoggedIn: false
    }
    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.user !== "") {
            this.props.dispatch(setAuthedUser(this.state.user));
            this.setState({isLoggedIn: true});
        }
    }
    handleChange = (event) => {
        const user = event.target.value
        this.setState(() => ({user}))
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to='/'/>;
        }

        return (
            <div className="container">
            <Form onSubmit={this.handleSubmit} className="form">
                <h2 className="header">Would You Rather?</h2>
                <FormGroup>
                    <Label htmlFor="username" className="login">Please sign in:</Label>
                    <select id="username" className="form-control"
                            value={this.state.user}
                            onChange={this.handleChange}>
                        <option value='' disabled>Select</option>
                        {this.props.users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        )}
                    </select>
                </FormGroup>
                <Button type="submit" id="_submit" name="_submit"
                        className="button">Login</Button>
            </Form>
            </div>
        );
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        users: Object.values(users).map((u) => {
            return ({
                id: u.id,
                name: u.name
            })
        }),
        user: authedUser
    }
}

export default connect(mapStateToProps)(Login)