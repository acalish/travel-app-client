import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleErrors, createTrip, indexTrip, deleteTrip } from '../api'
import apiUrl from '../../apiConfig'
import { Card, CardBody, CardTitle } from 'mdbreact'

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

  // <div key={trip.id}>
  //   <p>{trip.name}</p>
  //   <p>{trip.destination}</p>
  //   <p>{trip.start_date}</p>
  //   <p>{trip.end_date}</p>
  //   <p><Link to={`/trips/${trip.id}/update`}>update</Link> | <a href="" onClick={(event) => this.deleteTrip(event, trip.id)}>delete</a></p>
  // </div>

  render() {
    const tripListing = this.state.trips.map(trip => {
      return (
        <Card key={trip.id}>
          <CardBody>
            <CardTitle>{trip.name}</CardTitle>
            <p>{trip.destination}</p>
            <p>{trip.start_date}</p>
            <p>{trip.end_date}</p>
            <p><Link to={{
              pathname: `/trips/${trip.id}/update`,
              state: {tripName: trip.name,
                tripDestination: trip.destination,
                tripStartDate: trip.start_date}
            }}>update</Link> | <a href="" onClick={(event) => this.deleteTrip(event, trip.id)}>delete</a></p>
          </CardBody>
        </Card>
      )
    })

    return (
      <React.Fragment>
        <h1>Trips</h1>

        <div>
          {tripListing}
        </div>
      </React.Fragment>
    )
  }
}


export default TripIndex
