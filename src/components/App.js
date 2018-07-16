import React, {Component, Fragment} from 'react';
import LoadingBar from 'react-redux-loading'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from "./Dashboard";
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AddQuestion from './AddQuestion';
import {connect} from 'react-redux';
import {handleInitialData} from "../actions/shared";
import Leaderboard from "./Leaderboard";
import Question from './Question';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {this.props.loading === true
                        ? null
                        : <div>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/" exact component={Dashboard}/>
                            <PrivateRoute path="/leaderboard" component={Leaderboard}/>
                            <PrivateRoute path="/add" component={AddQuestion}/>
                            <PrivateRoute path="/questions/:question_id" component={Question}/>
                        </div>}
                </Fragment>
            </Router>
        );
    }
}

export function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function mapStateToProps({questions, users}) {
    return {
        loading: isEmpty(questions) || isEmpty(users)
    };
}

export default connect(mapStateToProps)(App);
