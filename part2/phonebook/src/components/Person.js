/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

export default ({ persons, onDeletePerson }) => (
    <div>
        {
            persons.map(p => <p key={p.id}>
                {p.name} {p.number} <button onClick={() => onDeletePerson(p.id)}>delete</button>
            </p>)
        }
    </div>
)