
import React from 'react'
import '../static/App.css'

function Message({ message }) {

    return (
        <div className = "msg-text">
            { message }
        </div>
    )
}

export default Message


