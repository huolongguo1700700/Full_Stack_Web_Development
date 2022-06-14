/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import { Country } from './'

export default ({ countries }) => {
    const [search, setSearch] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(
        () => {
            if (!search) return
            const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
            setFilteredCountries(filtered)
        },
        [countries, search]
    )

    return (
        <>
            find countries <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
            {
                filteredCountries.length > 10 && <p>Too many matches, specify another filter</p> 
            }
            {
                filteredCountries.length > 1 && filteredCountries.length <= 10
                && filteredCountries.map((country, i) => <p key={`${country.cioc}-${i}`}>
                    {country.name.common} <button onClick={() => setSearch(country.name.common)}>show</button>
                </p>) 
            }
            {
                filteredCountries.length === 1 && <Country country={filteredCountries[0]} />
            }
        </>
    )
}