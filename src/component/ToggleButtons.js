import React, { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

function ToggleButtons({ toggleButton, value }) {
   const [tabname, setTabName] = useState(value === 0 ? 'Dashboard' : 'Table')

   const handleChange = (e) => {
      setTabName(e.target.value)
      e.target.value === 'Dashboard' ? toggleButton(0) : toggleButton(1)
   }

   return (
      <div style={{ width: '90vw', margin: 'auto', marginBottom: '30px' }}>
         <ToggleButtonGroup
            value={tabname}
            color="primary"
            onChange={(e) => handleChange(e)}>
            <ToggleButton value="Dashboard">Dashboard</ToggleButton>
            <ToggleButton value="Table">Table</ToggleButton>
         </ToggleButtonGroup>
      </div>
   )
}

export default ToggleButtons
