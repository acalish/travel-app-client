import React from 'react'

class TripCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      destination: '',
      startDate: '',
      endDate: ''
    }
  }

  handleChange = (event) => this.setState({
    [event.target.name]: event.target.value
  })

    handleSubmit = (event) => {
      event.preventDefault()
      console.log('trip name', this.state)
    }
    
    render() {
      const { trip } = this.state

      return (
        <React.Fragment>
          <h2>Create a Trip</h2>
          <form onSubmit={this.handleSubmit}>
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
        </React.Fragment>
      )
    }
}

export default TripCreate
