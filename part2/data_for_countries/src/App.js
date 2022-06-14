import { useState, useEffect } from 'react'
import axios from 'axios'

import { Search } from './components'

const App = () => {

  const [countries, setCountries] = useState([])


  useEffect(
    () => {
      axios.get('https://restcountries.com/v3.1/all')
        .then(res => setCountries(res.data))
        .catch(() => setCountries([]))
    },
    []
  )

  return (
    <div>
      <Search countries={countries} />
    </div>
  )
}

export default App
