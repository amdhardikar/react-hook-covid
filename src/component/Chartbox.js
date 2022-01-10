import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   Filler,
} from 'chart.js'
import { Paper } from '@mui/material'
import { getHistory } from '../api'

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   Filler
)

function Chartbox({ location, getLocation }) {
   const [dataSet, setData] = useState([])
   const [labels, setLabel] = useState([])

   useEffect(() => {
      // let label = history[0]

      const loadData = async () => {
         const data = await getHistory(location)
         if (data.labels.length === 0) {
            getLocation('')
         } else {
            setLabel(data.labels.reverse())
            setData([
               data.new.reverse(),
               data.active.reverse(),
               data.critical.reverse(),
               data.recover.reverse(),
               data.death.reverse(),
            ])
         }
      }
      loadData()
   }, [location])

   const graph = [
      {
         name: 'new',
         color: 'rgb(255, 165, 0)',
         background: 'rgb(255, 165, 0, 0.7)',
         card: 'rgb(255, 165, 0, 0.2)',
      },
      {
         name: 'active',
         color: 'rgb(30, 144, 255)',
         background: 'rgb(30, 144, 255, 0.7)',
         card: 'rgb(30, 144, 255, 0.2)',
      },
      {
         name: 'critical',
         color: 'rgb(255, 99, 71)',
         background: 'rgb(255, 99, 71, 0.7)',
         card: 'rgb(255, 99, 71, 0.2)',
      },
      {
         name: 'recover',
         color: 'rgb(60, 179, 113)',
         background: 'rgb(60, 179, 113, 0.7)',
         card: 'rgb(60, 179, 113, 0.2)',
      },
      {
         name: 'death',
         color: 'rgb(128, 128, 128)',
         background: 'rgb(128, 128, 128, 0.7)',
         card: 'rgb(128, 128, 128, 0.2)',
      },
   ]

   return (
      <div className="chart-container">
         {dataSet.map((entry, index) => {
            return (
               <Paper
                  elevation={0}
                  className="line-container"
                  key={index}
                  style={{ backgroundColor: graph[index].card }}>
                  <Line
                     data={{
                        labels: labels,
                        datasets: [
                           {
                              data: entry,
                              fill: true,
                              borderColor: graph[index].color,
                              backgroundColor: graph[index].background,
                              pointHitRadius: '500',
                           },
                        ],
                     }}
                     options={{
                        maintainAspectRatio: false,
                        elements: {
                           point: {
                              radius: 0,
                              hoverRadius: 8,
                              hitRadius: 8,
                              hoverBackgroundColor: graph[index].background,
                           },
                           line: {
                              borderWidth: 0,
                           },
                        },
                        scales: {
                           y: {
                              bounds: 'data',
                              beginAtZero: true,
                              grid: {
                                 display: false,
                              },
                              display: false,
                              grace: '50%',
                           },
                           x: {
                              beginAtZero: true,
                              grid: {
                                 display: false,
                              },
                              ticks: {
                                 display: true,
                                 autoSkip: true,
                                 align: 'start',
                                 maxRotation: 0,
                                 maxTicksLimit: 10,
                              },
                           },
                        },
                        plugins: {
                           legend: {
                              display: false,
                           },
                           title: {
                              display: true,
                              text: graph[index].name.toUpperCase(),
                              align: 'start',
                              font: {
                                 size: 20,
                                 family: 'Roboto',
                                 weight: '500',
                              },
                              padding: 0,
                           },
                           tooltip: {
                              backgroundColor: 'rgb(0,0,0,0.7)',
                              displayColors: false,
                              padding: 15,
                              bodyFont: {
                                 size: 18,
                                 weight: 'bold',
                                 family: 'Roboto',
                              },
                              bodyAlign: 'center',
                              titleFont: {
                                 size: 15,
                                 weight: '200',
                                 family: 'Roboto',
                              },
                              titleAlign: 'center',
                              caretPadding: 30,
                           },
                        },
                     }}
                  />
               </Paper>
            )
         })}
      </div>
   )
}

export default Chartbox
