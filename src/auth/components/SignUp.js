import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, signUp, signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  clearUserInfo = () => this.setState({
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signUp = event => {
    event.preventDefault()

    const { email, password, passwordConfirmation} = this.state
    const { flash, history, setUser } = this.props

    signUp(this.state)
      .then(res => res.ok ? res : new Error())
      .then(() => signIn(this.state))
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(response => {
        this.clearUserInfo()
      })
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(error => {
        this.clearUserInfo()
        flash(messages.signUpFailure, 'flash-error')
      })
  }


  render () {
    const { email, password, passwordConfirmation} = this.state

    return (
      <form className='auth-form' onSubmit={this.signUp}>
        <h3>Sign Up</h3>

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
