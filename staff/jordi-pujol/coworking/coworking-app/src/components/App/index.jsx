'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import logic from '../../logic'
import Workspace from '../Create-workspace'

class App extends Component {

    state = { workspaceFeedback: null }

    handleNewWorkspace = (email, password, name) => {
        try {
            return logic.logInUser(email, password)
                .then(token => logic.createWorkspace(name, token))
                .then(() => this.props.history.push('/home'))
                .catch(({ message }) => this.setState({ workspaceFeedback: message }))
        }
        catch ({ message }) {
            this.setState({ workspaceFeedback: message })
        }
    }

    render() {

        const { state: { workspaceFeedback }, handleNewWorkspace } = this

        return <main className='app'>
            <Route exact path='/register' render={() => !logic.isUserLoggedIn ? <Register /> : <Redirect to='/home/inbox' />} />
            <Route path='/login/:link' render={(props) => !logic.isUserLoggedIn ? <Login link={props.match.params.link} /> : <Redirect to='/home' />} />
            <Route exact path='/login' render={(props) => !logic.isUserLoggedIn ? <Login link={props.match.params.link} /> : <Redirect to='/home' />} />
            <Route exact path='/workspace' render={() => <Workspace onNewWorkspace={handleNewWorkspace} feedback={workspaceFeedback} />} />
            <Route exact path='/' render={()=> <Redirect to='/home/inbox'/>}/> 
            <Route path='/home' render={() => logic.isUserLoggedIn ? <Home /> : <Redirect to='/login' />} />
        </main>
    }
}

export default withRouter(App)