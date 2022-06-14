/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import '../App.css'

export default ({ message, classes }) => {
    if (!message) return

    return (
        <div className={classes}>
            {message}
        </div>
    )
}