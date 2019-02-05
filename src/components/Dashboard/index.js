import React from 'react'
import { Redirect } from 'react-router-dom'


import { AuthUserContext } from '../Session'

import * as ROUTES from '../../constants/routes'

import SpeechBox from '../SpeechBox'
import AuthButton from '../AuthButton'



const Dashboard = () => (
    <section className="section">
        <div className="container">
            <h1 className="title">Dashboard</h1>
            <SpeechBox />
            <br />
            <AuthButton />
        </div>
    </section>
)

const DashboardProtected = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <Dashboard /> : <Redirect to={ROUTES.LOGIN} />
        }
    </AuthUserContext.Consumer>
)

export default DashboardProtected
