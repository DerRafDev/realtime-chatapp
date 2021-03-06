import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {

    //geting the name and the room from the user
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="JoinInnerContainer">
                <h1 className="heading">Enter</h1>
                <div><input placeholder="Name" className="JoinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="JoinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="Submit">Sign In</button>
                </Link> 
            </div>
        </div>
    )
}

export default Join;