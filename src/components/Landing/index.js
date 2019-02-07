import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import CenterScreen from '../CenterScreen'

const Landing = () => (
    <CenterScreen>
        <div className="container has-text-centered">
            <img src="./AmplitudeLogo.png" alt="Amplitude Logo" style={{ maxWidth: '180px' }} />
            <h1 className="title">Welcome to Amplitude</h1>
            <h3 className="subtitle">Announcements and more for multi-room events.</h3>
            <div className="field is-grouped" style={{ justifyContent: 'center' }}>
                <div className="control">
                    <Link to={ROUTES.LOGIN}>
                        <button className="button is-link">
                            Login
                        </button>
                    </Link>
                </div>
                <div className="control">
                    <Link to={ROUTES.PROJECTOR}>
                        <button className="button is-link">
                            Projector
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </CenterScreen>
)

export default Landing