/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

export default ({ onSubmit, setNewName, setNewPhoneNumber, newName, newPhoneNumber }) => {

    return (
        <form onSubmit={onSubmit}>
        <div>
          <div>
            name: <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div>
            number: <input type='text' value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
};