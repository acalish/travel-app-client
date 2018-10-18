import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleErrors, createTrip, indexTrip, deleteTrip } from '../api'
import apiUrl from '../../apiConfig'
import { Card, CardBody, CardTitle } from 'mdbreact'
import './Trip.scss'

class TripIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: [],
      loading: true
    }
  }

  async componentDidMount() {
    const { history, user } = this.props
    const response = await indexTrip(user)
    const responseJSON = await response.json()
    setTimeout(() => {
      // after 1 second, loading will be false
      this.setState({trips: responseJSON.trips, loading: false})
    }, 1000)

  }

  async deleteTrip(event, tripId) {
    event.preventDefault()

    await deleteTrip(tripId, this.props.user)
    this.setState({trips: this.state.trips.filter(trip => trip.id !== tripId)})
  }

  render() {
    const tripListing = this.state.trips.map(trip => {
      return (
        <Card className="trip-card" key={trip.id}>
          <CardBody>
            <CardTitle>{trip.name}</CardTitle>
            <p>{trip.destination}</p>
            <p>start date: {trip.start_date}</p>
            <p>end date: {trip.end_date}</p>
            <p><Link className="link" to={{
              pathname: `/trips/${trip.id}/update`,
              state: {tripName: trip.name,
                tripDestination: trip.destination,
                tripStartDate: trip.start_date,
                tripEndDate: trip.end_date}
            }}> update</Link>  | <a className="link" href="" onClick={(event) => this.deleteTrip(event, trip.id)}> delete </a></p>
          </CardBody>
        </Card>
      )
    })

    const noTrips = (
      <p className="message">{'It looks like you do not have any trips saved.  Click "Log Trip" to add a trip.'}</p>
    )

    const hasTrips = (
      <div className='card-parent'>
        {tripListing}
      </div>
    )

    return (
      <React.Fragment>
        <h1>Trips</h1>
        {/* if loading is true, display message, if not, show trips or noTrips */}
        <div>{this.state.loading ?
          <p className="message">✈️ loading your trips...</p>
          :this.state.trips.length === 0 ? noTrips : hasTrips}
        </div>
      </React.Fragment>
    )
  }
}


export default TripIndex
