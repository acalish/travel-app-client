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
      trips: []
    }
  }

  async componentDidMount() {
    const { history, user } = this.props
    const response = await indexTrip(user)
    const responseJSON = await response.json()
    this.setState({trips: responseJSON.trips})
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
      <p className="no-trips">{'It looks like you do not have any trips saved.  Click "Log Trip" to add a trip.'}</p>
    )

    return (
      <React.Fragment>
        <h1>Trips</h1>
        <div>
          {this.state.trips.length === 0 ? noTrips : null}
        </div>

        <div className='card-parent'>
          {tripListing}
        </div>
      </React.Fragment>
    )
  }
}


export default TripIndex
