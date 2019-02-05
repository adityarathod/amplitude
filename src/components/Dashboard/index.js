import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Speech from 'speak-tts'


import AuthButton from '../AuthButton'
import { AuthUserContext } from '../Session'

import * as ROUTES from '../../constants/routes'



class Dashboard extends Component {
    constructor(props) {
        super(props)
        const speech = new Speech()
        speech.init({
            'voice': 'Google UK English Female'
        })
        this.state = {
            text: '',
            tts: speech
        }
    }
    textChange(e) {
        this.setState({ text: e.target.value })
    }
    speaker() {
        this.state.tts.speak({ text: this.state.text })
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">Dashboard</h1>
                    <textarea className="textarea" onChange={this.textChange.bind(this)} rows="10" cols="30" style={{ width: '100%' }}></textarea>
                    <button className="button is-danger" onClick={this.speaker.bind(this)}>Announce</button>
                    <br />
                    <AuthButton />
                </div>
            </section>
        )
    }
}

const DashboardProtected = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <Dashboard /> : <Redirect to={ROUTES.LOGIN} />
        }
    </AuthUserContext.Consumer>
)

export default DashboardProtected
