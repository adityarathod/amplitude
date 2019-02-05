import React from 'react'

const CenterScreen = props => (
    <div className="hero is-fullheight">
        <div className="hero-body">
            {props.children}
        </div>
    </div>
)

export default CenterScreen