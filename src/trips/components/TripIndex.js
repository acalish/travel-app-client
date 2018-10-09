import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleErrors, createTrip, indexTrip } from '../api'
import apiUrl from '../../apiConfig'

class TripIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: []
    }
  }

  async componentDidMount() {
    const { history, user } = this.props
    const response = await indexTrip(user)
    const responseJSON = await response.json()
    this.setState({trips: responseJSON.trips})
  }


  render() {
    const tripListing = this.state.trips.map(trip => {
      return (
        <div key={trip.id}>
          <p>{trip.name}</p>
          <p>{trip.destination}</p>
          <p>{trip.start_date}</p>
          <p>{trip.end_date}</p>
          {/* <p><Link to={`trips/${trip.id}/show`}>{trip.name}</Link></p> */}
          <p><Link to={`/trips/${trip.id}/edit`}>update</Link> | <a href="" onClick={(event) => this.deleteTrip(event, trip.id)}>delete</a></p>
        </div>
      )
    })

    return (
      <React.Fragment>
        <h1>Trips</h1>

        <table>
          <tbody>
            {tripListing}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}


export default TripIndex
