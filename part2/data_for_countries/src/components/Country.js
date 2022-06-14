/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

export default ({ country }) => (
    <>
        <h2>{country.name.common}</h2>
        <p>captial {country.capital.join('/')}</p>
        <p>area {country.area}</p>

        <h3>languages</h3>
        {Object.entries(country.languages).map(language => (
            <ul key={language[0]}>
                <li>{language[1]}</li>
            </ul>
        ))}
        
        <img
            alt='Flag'
            src={country.flags['png']}
            width='100px'
            height='100px' />
    </>
)