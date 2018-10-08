import React, { Component } from 'react'
import { handleErrors, createTrip } from '../api'
import apiUrl from '../../apiConfig'

class TripCreate extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      destination: '',
      startDate: '',
      endDate: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

createTrip = event => {
  event.preventDefault()

  const { name, destination, startDate, endDate } = this.state
  const { user } = this.props

  createTrip(this.state, user)
    .then(console.log)
    .catch(console.log)
    // .then(console.log(this.state, 'trip info'))
    // .then(console.log(this.props, 'user'))
}

render() {
  const { trip } = this.state

  return (

    <form className='trip-form' onSubmit={this.createTrip}>
      <label>Name: </label>
      <input name="name" onChange={this.handleChange} required placeholder="name" type="text" value={this.state.name} />

      <label>Destination: </label>
      <input name="destination" onChange={this.handleChange} required placeholder="destination" type="text" value={this.state.destination} />

      <label>Start Date: </label>
      <input name="startDate" onChange={this.handleChange} required placeholder="start date" type="date" value={this.state.startDate} />

      <label>End Date: </label>
      <input name="endDate" onChange={this.handleChange} required placedholder="end date" type="date" value={this.state.endDate} />

      <button type="submit">Create</button>
    </form>
  )
}
}

export default TripCreate
