import React, {Component, Fragment} from 'react';
import LoadingBar from 'react-redux-loading';
import {logoutUser} from "../actions/authedUser";
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Nav, Navbar, NavItem, NavbarBrand, NavLink as UINavLink} from 'reactstrap';

class Navigation extends Component {
    state = {
        loginDirect: false
    }

    handleOnSignout = (e) => {
        e.preventDefault();
        this.props.dispatch(logoutUser());
        this.setState(() => ({
            loginDirect: true
        }));
    }

    render() {
        if (this.state.loginDirect === true) {
            return (<Redirect to="/login"/>);
        }

        return (
            <Fragment>
                <div class="container">
                <Navbar color="light" expand="md">
                <NavbarBrand>Hello, {this.props.user.name}!</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <UINavLink tag={NavLink} exact to="/">Dashboard</UINavLink>
                        </NavItem>
                        <NavItem>
                            <UINavLink tag={NavLink} to="/leaderboard">Leaderboard</UINavLink>
                        </NavItem>
                        <NavItem>
                            <UINavLink tag={NavLink} to="/add">Add Question</UINavLink>
                        </NavItem>
                        <NavItem>
                            <UINavLink tag={NavLink} to="#" onClick={this.handleOnSignout}>Signout</UINavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <LoadingBar/>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        user: users[authedUser]
    };
}

export default connect(mapStateToProps)(Navigation);