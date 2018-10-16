import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { handleErrors, createTrip, indexTrip, updateTrip, showTrip } from '../api'
import apiUrl from '../../apiConfig'
import messages from '../messages'

class TripUpdate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      destination: '',
      startDate: '',
      endDate: ''
    }
  }

  async componentDidMount () {
    const { user } = this.props
    const id = this.props.match.params.id

    const response = await showTrip(id, user)
    const responseJSON = await response.json()

    this.setState({name: responseJSON.trip.name})
    this.setState({destination: responseJSON.trip.destination})
    this.setState({startDate: responseJSON.trip.startDate})
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  updateTrip = async(event) => {
    event.preventDefault()

    const id = this.props.match.params.id
    const { name, destination, start_date, end_date } = this.state
    const { history, user, flash } = this.props

    const checkValid = function() {if(name.split(' ').every((item) => item === '') || destination.split(' ').every((item) => item === '')) {
      return flash(messages.tripEditError, 'flash-error')
    }}

    updateTrip(id, this.state, user)
      .then(handleErrors)
      .then(() => history.push('/trips'))
      .then(checkValid())
      .catch(error => {
        flash(messages.tripEditError, 'flash-error')
      })
  }

  render() {
    const { name, destination, start_date, end_date } = this.state

    return (
      <form className='trip-form' onSubmit={this.updateTrip}>
        <h3>Update Trip</h3>
        <label htmlFor="name">Name: </label>
        <input
          required
          name="name"
          type="text"
          value={name}
          onChange={this.handleChange}
        />
        <label htmlFor="destination">Destination: </label>
        <input
          required
          name="destination"
          type="text"
          value={destination}
          onChange={this.handleChange}
        />
        <label htmlFor="startDate">Start Date: </label>
        <input
          required
          name="startDate"
          type="date"
          value={start_date}
          max={this.state.endDate}
          onChange={this.handleChange}
        />
        <label htmlFor="endDate">End Date: </label>
        <input
          required
          name="endDate"
          type="date"
          value={end_date}
          min={this.state.startDate}
          onChange={this.handleChange}
        />
        <button type='submit'>Update</button>
      </form>
    )
  }
}

export default withRouter(TripUpdate)
