import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './services/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

function App() {

  const [locationID, setLocationID] = useState(getRandomNumber(126))

  const url = `https://rickandmortyapi.com/api/location/${locationID}`
  const [ location, getLocation, hasError ] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [locationID])

  const inputId = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setLocationID(inputId.current.value.trim())
  }

  return (
    <div>
      <header className='header'>
        <img className='header__image' src="/images/Untitled.png" alt="" />
      </header>
      <form onSubmit={handleSubmit}>
        <input ref={inputId} type="number" />
        <button>Search</button>
      </form>
      {
        hasError
          ? (<h2>Hey coloca un numero del 1 al 126</h2>)
          : (
            <>
            <LocationInfo location={location}/>
            <div className='card__container'>
              {
                location?.residents.map(url => 
                <ResidentCard key={url} url={url}/>)
              }
            </div>
            </>
          )
      }
      
    </div>
  )
}

export default App
