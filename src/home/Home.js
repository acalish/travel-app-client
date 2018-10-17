import React from 'react'
import './Home.scss'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='home-image'>
          <div className='home-text'>
            <h1 className='quote'>{'I haven\'t been everywhere, but it\'s on my list.'}</h1>
            <h3>- Susan Santag</h3>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Home
