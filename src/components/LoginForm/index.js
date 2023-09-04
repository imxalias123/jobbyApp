import './index.css'
import {Component} from 'react'

class LoginForm extends Component {
  state = {
    onSubmitError: false,
  }

  render() {
    const onSubmitError = this.state
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm()}>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input className="input" placeholder="Username" id="username" />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input className="input" placeholder="Password" id="password" />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm