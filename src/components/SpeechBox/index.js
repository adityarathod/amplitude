import React, { Component } from 'react'

import { withFirebase } from '../Firebase'


class SpeechBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    textChange(e) {
        this.setState({ text: e.target.value })
    }
    speaker() {
        this.props.firebase.emitSpeakAction(this.state.text)
    }
    respeak() {
        this.props.firebase.emitRespeakAction()
    }
    stopSpeaking() {
        this.props.firebase.emitStopAction()
    }
    render() {
        return (
            <>
                <textarea
                    className="textarea"
                    onChange={this.textChange.bind(this)}
                    rows="10"
                    cols="30"
                    style={{ width: '100%' }}
                >
                </textarea>
                <button className="button is-danger" onClick={this.speaker.bind(this)}>Announce</button>
                &emsp;
                <button className="button is-info" onClick={this.respeak.bind(this)}>Respeak</button>
                &emsp;
                <button className="button is-warning" onClick={this.stopSpeaking.bind(this)}>Stop Speaking</button>
            </>
        )
    }
}

export default withFirebase(SpeechBox)