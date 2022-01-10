const baseurl = 'https://covid-193.p.rapidapi.com'
const host = 'covid-193.p.rapidapi.com'
const apikey = '86f0c2f6a8msh99580a124bf87b8p1ff5e6jsn73e67e5da37c'

// get statistics
export const getStats = async (string) => {
   let cases = []
   await fetch(`${baseurl}/statistics?country=${string}`, {
      method: 'GET',
      headers: {
         'x-rapidapi-host': host,
         'x-rapidapi-key': apikey,
      },
   })
      .then((res) => res.json())
      .then((data) => {
         data = data.response[0]

         cases.push(data.cases.total)
         cases.push(data.cases.recovered)
         cases.push(data.cases.active)
         cases.push(data.cases.new)
         cases.push(data.deaths.total)
      })

   return cases
}

// global history
export const getHistory = async (string) => {
   let collections = []
   await fetch(`${baseurl}/history?country=${string}`, {
      method: 'GET',
      headers: {
         'x-rapidapi-host': host,
         'x-rapidapi-key': apikey,
      },
   })
      .then((res) => res.json())
      .then((data) => data.response)
      .then((data) => {
         collections = data
      })

   let data = {
      labels: [],
      new: [],
      active: [],
      critical: [],
      recover: [],
      death: [],
   }

   collections.forEach((ele) => {
      data.labels.push(ele.day)
      data.new.push(ele.cases.new)
      data.active.push(ele.cases.active)
      data.critical.push(ele.cases.critical)
      data.recover.push(ele.cases.recovered)
      data.death.push(ele.deaths.total)
   })

   return data
}

// get all country data
export const getAllStats = async () => {
   let allStatistics = []

   await fetch(`${baseurl}/statistics`, {
      method: 'GET',
      headers: {
         'x-rapidapi-host': host,
         'x-rapidapi-key': apikey,
      },
   })
      .then((res) => res.json())
      .then((data) => data.response)
      .then((data) => {
         const filteredArray = data.filter((entry) => {
            return entry.country !== 'All'
         })

         for (let entry of filteredArray) {
            let countryData = {
               country: entry.country,
               continent: entry.continent,
               population: entry.population,
               totalCases: entry.cases.total,
               recoveredCases: entry.cases.recovered,
               criticalCases: entry.cases.critical,
               activeCases: entry.cases.active,
               newCases: entry.cases.new,
               deaths: entry.deaths.total,
               testCount: entry.tests.total,
            }
            allStatistics.push(countryData)
         }

         allStatistics = allStatistics.sort((obj1, obj2) =>
            obj1.country < obj2.country ? -1 : 1
         )
      })

   return allStatistics
}
