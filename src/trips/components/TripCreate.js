import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { handleErrors, createTrip } from '../api'
import apiUrl from '../../apiConfig'
import messages from '../messages'

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

  clearFormInfo = () => this.setState({
    name: '',
    destination: '',
    startDate: '',
    endDate: ''
  })

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  createTrip = event => {
    event.preventDefault()

    const { name, destination, startDate, endDate } = this.state
    const { user, history, flash } = this.props

    const checkValid = function() {if(name.split(' ').every((item) => item === '') || destination.split(' ').every((item) => item === '')) {
      return flash(messages.tripCreateError, 'flash-error')
    }}


    createTrip(this.state, user)
      .then(handleErrors)
      .then(() => history.push('/trips'))
      .then(checkValid())
      .catch(error => {
        this.clearFormInfo()
        flash(messages.tripCreateError, 'flash-error')
      })
  }

  render() {
    const { trip } = this.state

    return (
      <React.Fragment>
        <h2> Create a Trip Listing </h2>
        <form className='trip-form' onSubmit={this.createTrip}>
          <label>Name: </label>
          <input name="name" onChange={this.handleChange} required placeholder="name" type="text" value={this.state.name} />

          <label>Destination: </label>
          <input name="destination" onChange={this.handleChange} required placeholder="destination" type="text" value={this.state.destination} />

          <label>Start Date: </label>
          <input name="startDate" onChange={this.handleChange} required placeholder="start date" max={this.state.endDate} type="date" value={this.state.startDate} />

          <label>End Date: </label>
          <input name="endDate" onChange={this.handleChange} required placedholder="end date" min={this.state.startDate} type="date" value={this.state.endDate} />

          <button type="submit">Create</button>
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(TripCreate)
