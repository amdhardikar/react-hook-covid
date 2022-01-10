import { Paper, CardContent, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getStats } from '../api'

function Stats({ location, getLocation }) {
   const [stats, setStats] = useState([])
   const cardStyle = [
      {
         text: 'Total',
         textColor: 'lightgray',
         bgColor: '#ff6347a7',
      },
      {
         text: 'Recover',
         textColor: 'lightgray',
         bgColor: '#3cb371a7',
      },
      {
         text: 'Active',
         textColor: 'lightgray',
         bgColor: '#1e90ffa7',
      },
      {
         text: 'New',
         textColor: 'lightgray',
         bgColor: '#FFA500a7',
      },
      {
         text: 'Death',
         textColor: 'lightgray',
         bgColor: '#808080a7',
      },
   ]

   useEffect(() => {
      const loadData = async () => {
         const data = await getStats(location)
         if (data.length === 0) {
            getLocation('')
         } else {
            setStats(data)
         }
      }
      loadData()
   }, [location])

   return (
      <div className="stats-container">
         <div className="stats-cards">
            {stats.map((entry, index) => {
               return (
                  <Paper
                     elevation={0}
                     sx={{
                        width: '280px',
                        textAlign: 'left',
                        borderRadius: '5px',
                        backgroundColor: cardStyle[index].bgColor,
                     }}
                     key={index}>
                     <CardContent>
                        <Typography
                           variant="h6"
                           style={{
                              fontSize: '1rem',
                              color: 'white',
                           }}>
                           Today
                        </Typography>
                        <Typography variant="h6" component="div">
                           {cardStyle[index].text}
                        </Typography>
                        <Typography
                           variant="h4"
                           component="div"
                           style={{ fontWeight: '500' }}>
                           {entry ? entry : '0'}
                        </Typography>
                     </CardContent>
                  </Paper>
               )
            })}
         </div>
      </div>
   )
}

export default Stats
