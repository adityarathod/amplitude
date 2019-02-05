import React from 'react'
import { Redirect } from 'react-router-dom'

import AuthButton from '../AuthButton'
import { AuthUserContext } from '../Session'

import * as ROUTES from '../../constants/routes'

const Dashboard = () => (
    <section className="section">
        <div className="container">
            <h1 className="title">Dashboard</h1>
            <textarea rows="10" cols="30" style={{ width: '100%' }}></textarea>
            <button className="button is-danger">Announce</button>
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
