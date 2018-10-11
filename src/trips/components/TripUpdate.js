import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { handleErrors, createTrip, indexTrip, updateTrip, showTrip } from '../api'
import apiUrl from '../../apiConfig'

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

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  updateTrip = async(event) => {
    event.preventDefault()

    const id = this.props.match.params.id
    const { name, destination, startDate, endDate } = this.state
    const { history, user } = this.props

    updateTrip(id, this.state, user)
      .then(handleErrors)
      .then(() => history.push('/trips'))
  }

  render() {

    return (
      <form className='trip-form' onSubmit={this.updateTrip}>
        <h3>Update Trip</h3>
        <label htmlFor="name"></label>
        <input
          required
          name="name"
          type="text"
          placeholder={this.props.location.state.tripName}
          onChange={this.handleChange}
        />
        <label htmlFor="destination"></label>
        <input
          required
          name="destination"
          type="text"
          placeholder={this.props.location.state.tripDestination}
          onChange={this.handleChange}
        />
        <label htmlFor="startDate"></label>
        <input
          required
          name="startDate"
          type="date"
          onChange={this.handleChange}
        />
        <label htmlFor="endDate"></label>
        <input
          required
          name="endDate"
          type="date"
          onChange={this.handleChange}
        />
        <button type='submit'>Update</button>
      </form>
    )
  }
}

export default withRouter(TripUpdate)
