import apiUrl from './../apiConfig.js'


export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Received status in 400 or 500 range.')
  }
}

export const createTrip = (trip, user) => {
  // console.log('trip', trip)
  // console.log('user', user.token)
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

export const showTrip = (tripId, user) => {
  return fetch(apiUrl + '/trips/' + tripId, {
    method: 'GET',
    headers: {
      'Contect-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updateTrip = (id, trip, user) => {
  console.log('api id', id)
  console.log('api user', user)
  return fetch(apiUrl + '/trips/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
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

export const deleteTrip = (tripId, user) => {
  console.log('delete id', tripId)
  console.log('delete user', user)
  return fetch(apiUrl + '/trips/' + tripId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
    }
  })
}
