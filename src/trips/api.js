import apiUrl from './../apiConfig.js'


export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Received status in 400 or 500 range.')
  }
}

export const createTrip = (trip, user) => {
  console.log('trip', trip)
  console.log('user', user.token)
  return fetch(apiUrl + '/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      trip: {
        name: trip.name,
        destination: trip.destination,
        start_date: trip.startDate,
        end_date: trip.endDate
      }
    })
  })
}

export const indexTrip = (user) => {
  return fetch(apiUrl + '/trips', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
    }
  })
}
