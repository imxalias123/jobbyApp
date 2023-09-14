import './index.css'
import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <ul className="ul-header">
        <li>
          <Link className="link" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </li>
        <li>
          <Link className="link" to="/">
            <AiFillHome className="home-icon" size={25} />
            <h1 className="large">Home</h1>
          </Link>
        </li>
        <li>
          <Link className="link" to="/jobs">
            <BsBriefcase className="case-icon" size={25} />
            <h1 className="large">Jobs</h1>
          </Link>
        </li>
      </ul>
      <FiLogOut onClick={onClickLogout} className="logout-icon" size={25} />

      <button type="button" onClick={onClickLogout} className="logout-btn">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
