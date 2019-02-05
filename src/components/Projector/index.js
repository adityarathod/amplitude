import React, { Component } from 'react'
import { withFirebase } from '../Firebase'

import Speech from 'speak-tts'

class Projector extends Component {
    constructor(props) {
        super(props)
        const speech = new Speech()
        speech.init({
            'voice': 'Google UK English Female'
        })
        this.state = {
            hasJustStarted: true,
            tts: speech
        }
    }

    projectorDispatcher(event, content) {
        switch (event) {
            case 'SPEAK':
                this.state.tts.speak({ text: content })
                break
            case 'RESPEAK_LAST':
                var state = this.state
                this.props.firebase.notifyEvents().orderByChild('event').equalTo('SPEAK').once('value', snapshot => {
                    var snapshots = Array(snapshot)
                    var childData = snapshots[snapshots.length - 1].val()
                    console.log(childData)
                    state.tts.speak({ text: childData.content })
                })
                break
            default:
                console.log('Unresolved dispatch', event, content)
        }
    }

    componentDidMount() {
        this.props.firebase.notifyEvents().on('child_added', data => {
            if (!this.state.hasJustStarted) {
                this.projectorDispatcher(data.val().event, data.val().content)
            }
            this.setState({ hasJustStarted: false })
            console.log(data.val().event, data.val().content)
        })
    }

    render() {
        return (
            <h1 className="title">Projector</h1>
        )
    }
}
export default withFirebase(Projector)