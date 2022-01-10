import { TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

function Header({ location, getLocation }) {
   const [locationVal, setLocationVal] = useState('')
   const inputRef = useRef()

   const onchangeHandler = (e) => {
      setLocationVal(e.target.value)
   }

   const onKeyPressHandler = (e) => {
      if (e.key === 'Enter') {
         getLocation(locationVal)
         setLocationVal('')
      }
   }

   useEffect(() => {
      inputRef.current.focus()
   }, [location])

   return (
      <div className="header-container">
         <div className="location-container">
            <Typography
               variant="h3"
               sx={{
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
               }}>
               {location === '' ? 'World' : location}
            </Typography>
         </div>
         <div className="input-container">
            <TextField
               fullWidth
               ref={inputRef}
               value={locationVal}
               onKeyPress={(e) => onKeyPressHandler(e)}
               onChange={(e) => onchangeHandler(e)}
               placeholder="Search country"
            />
         </div>
      </div>
   )
}

export default Header
