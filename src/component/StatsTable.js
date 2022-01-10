import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllStats } from '../api'

function StatsTable() {
   const [allStats, setAllStats] = useState([])
   const [searchVal, setSearchVal] = useState('')
   const [renderData, setRenderData] = useState([])

   const onChangeHandler = (e) => {
      setSearchVal(e.target.value)
      if (searchVal !== '') {
         const renderedEle = allStats.filter((ele) => {
            const nameString = ele.country.concat('', ele.continent)
            return nameString
               .toLowerCase()
               .includes(searchVal.toLowerCase())
         })
         setRenderData(renderedEle)
      } else {
         setRenderData(allStats)
      }
   }

   useEffect(() => {
      const loadData = async () => {
         const data = await getAllStats()
         setAllStats(data)
         setRenderData(data)
      }
      loadData()
   },[])

   return (
      <div
         style={{
            width: '90vw',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '30px',
         }}>
         <TextField
            fullWidth
            placeholder="Search country"
            value={searchVal}
            onChange={onChangeHandler}
         />
         <TableContainer
            component={Paper}
            style={{
               width: '90vw',
               marginLeft: 'auto',
               marginRight: 'auto',
               marginTop: '30px',
            }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell style={{ fontSize: '18px' }} align="left">
                        Country
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="left">
                        Continent
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="right">
                        Total
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="right">
                        Recovered
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="right">
                        Critical
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="right">
                        Active
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="right">
                        New
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="right">
                        Deaths
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="right">
                        Tests
                     </TableCell>
                     <TableCell style={{ fontSize: '18px' }} align="right">
                        Population
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {renderData.map((entry, index) => (
                     <TableRow key={index}>
                        <TableCell style={{ fontSize: '18px' }} align="left">
                           {entry.country}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="left">
                           {entry.continent ? entry.continent : '-'}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="right">
                           {entry.totalCases ? entry.totalCases : 0}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="right">
                           {entry.recoveredCases ? entry.recoveredCases : 0}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="right">
                           {entry.criticalCases ? entry.criticalCases : 0}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="right">
                           {entry.activeCases ? entry.activeCases : 0}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="right">
                           {entry.newCases ? entry.newCases : 0}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="right">
                           {entry.deaths ? entry.deaths : 0}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="right">
                           {entry.testCount ? entry.testCount : 0}
                        </TableCell>
                        <TableCell style={{ fontSize: '18px' }} align="right">
                           {entry.population ? entry.population : 0}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   )
}

export default StatsTable
