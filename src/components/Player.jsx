import React, { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onChangePlayer }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handelEdit = () => {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangePlayer(symbol, playerName);
        }
    }
    const handelChange = (e) => {
        setPlayerName(() => e.target.value);
    }

    return (
        <li className={isActive && "active"}>
            <span className="player">
                {isEditing ? <input type="text" value={playerName} required onChange={handelChange} /> : <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handelEdit}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}