import React, {Fragment} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container, Row} from 'reactstrap'
import {isEmpty} from "./App";
import Navigation from './Navigation'


const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
            isAuthenticated
                ?
                <Fragment>
                    <Navigation/>
                    <Container>
                        <Row>
                            <Component {...props}/>
                        </Row>
                    </Container>
                </Fragment>
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
        )
    }}/>
)

function mapStateToProps({authedUser}) {
    return {
        isAuthenticated: !isEmpty(authedUser)
    }
}

export default connect(mapStateToProps, null, null, {pure: false,})(PrivateRoute)