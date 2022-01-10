import { useState } from 'react'
import './App.css'
import Stats from './component/Stats'
import Header from './component/Header'
import Chartbox from './component/Chartbox'
import StatsTable from './component/StatsTable'
import ToggleButtons from './component/ToggleButtons'

function App() {
   const [searchLocation, setSearchLocation] = useState('')
   const [pageNumber, setPageNumber] = useState(0)

   return (
      <div className="App">
         <ToggleButtons toggleButton={setPageNumber} value={pageNumber}/>
         {pageNumber === 0 && (
            <>
               <Header
                  location={searchLocation}
                  getLocation={setSearchLocation}
               />
               <Stats
                  location={searchLocation === '' ? 'all' : searchLocation}
                  getLocation={setSearchLocation}
               />
               <Chartbox
                  location={searchLocation === '' ? 'all' : searchLocation}
                  getLocation={setSearchLocation}
               />
            </>
         )}
         {pageNumber === 1 && <StatsTable />}
      </div>
   )
}

export default App
