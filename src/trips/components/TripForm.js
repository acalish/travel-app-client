import React from 'react'

const TripForm = (props) => {
  const { trip, handleChange, handleSubmit } = props

  return (
    <React.Fragment>
      <h1> Trip</h1>
      <p>name: <input type="text" name="name" onChange={handleChange} placeholder="name" /></p>
      <p>destination: <input type="text" name="destination" onChange={handleChange} placeholder="destination" /></p>
      <p>start date: <input type="date" name="start date" onChange={handleChange} placeholder="start date" /></p>
      <p>end date: <input type="date" name="end date" onChange={handleChange} placeholder="end date"/></p>
      <p><input type="submit" value="Submit" onClick={handleSubmit} /></p>
    </React.Fragment>
  )
}

export default TripForm
