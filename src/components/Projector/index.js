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
                this.props.firebase.notifyEvents().orderByChild('event').equalTo('SPEAK').limitToLast(1).once('value', snapshot => {
                    var childData = snapshot.val()
                    if (!childData) return
                    const keys = Object.keys(childData)
                    if (keys.length === 0) return
                    var childID = keys[0]
                    childData = childData[childID]
                    state.tts.speak({ text: childData.content })
                })
                break
            case 'STOP':
                this.state.tts.cancel()
                break
            default:
                console.log('Unresolved dispatch', event, content)
        }
        var completedEvent = { event, content }
        this.props.firebase.emitEventCompleted(completedEvent)
        console.log('Completed event', completedEvent)
    }

    componentDidMount() {
        this.props.firebase.notifyEvents().endAt().limitToLast(1).on('child_added', data => {
            var eventObj = { event: data.val().event, content: data.val().content }
            if (!this.state.hasJustStarted) {
                console.log('Dispatching speak event...')
                this.projectorDispatcher(eventObj.event, eventObj.content)
            }
            this.setState({ hasJustStarted: false })
            console.log('Last event in feed:', eventObj)
        })
    }

    render() {
        return (
            <h1 className="title">AudioController</h1>
        )
    }
}
export default withFirebase(Projector)