import React from 'react'

const TripForm = (props) => {
  const { action, trip, handleChange, handleSubmit } = props
  const formattedAction = action.charAt(0).toUpperCase() + action.slice(1)

  return (
    <React.Fragment>
      <h1>{formattedAction} Trip</h1>
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

    </React.Fragment>
  )
}

export default TripForm
