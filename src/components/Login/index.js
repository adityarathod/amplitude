import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { AuthUserContext } from '../Session'
import * as ROUTES from '../../constants/routes'

import CenterScreen from '../CenterScreen'

const LoginPage = () => (
    <CenterScreen>
        <div className="container has-text-centered">
            <Link to={ROUTES.LANDING}>
                <strong>&larr; Home</strong>
            </Link>
            <br />
            <br />
            <h1 className="title">Log In to Amplitude</h1>
            <LoginForm />
        </div>
    </CenterScreen>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }
    onSubmit = event => {
        const { email, password } = this.state
        this.props.firebase.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.DASHBOARD)
            })
            .catch(error => {
                this.setState({ error })
            })
        event.preventDefault()
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        const { email, password, error } = this.state
        const isInvalid = password === '' || email === ''
        return (
            <form onSubmit={this.onSubmit}>
                {error && <div className="notification is-danger"><strong>{error.message}</strong></div>}
                <div className="field">
                    <input
                        name="email"
                        className="input"
                        value={email} onChange={this.onChange} type="text" placeholder="Email Address"
                    />
                </div>
                <div className="field">
                    <input
                        className="input"
                        name="password" value={password} onChange={this.onChange} type="password" placeholder="Password"
                    />
                </div>
                <button disabled={isInvalid} type="submit" className="button is-link">
                    Sign In
                </button>
            </form>
        )
    }
}

const LoginForm = compose(
    withRouter,
    withFirebase,
)(Login)


const LoginPageAuthy = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <Redirect to={ROUTES.DASHBOARD} /> : <LoginPage />
        }
    </AuthUserContext.Consumer>
)

export default LoginPageAuthy
export { LoginForm }