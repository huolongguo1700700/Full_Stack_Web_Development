/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react'

export default ({ persons }) => {
    const [search, setSearch] = useState('')

    return (
        <div>
            filter shown with <input type='text' onChange={(e) => setSearch(e.target.value)} />
            {
            search && persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
                .map(p => <p key={p.id}>{p.name} {p.number}</p>)
            }
      </div>
    )
};