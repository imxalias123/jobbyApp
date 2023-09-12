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
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-logo"
      />
      <div className="icons-container">
        <Link className="link" to="/">
          <AiFillHome className="home-icon" size={25} />
        </Link>

        <Link className="link" to="/jobs">
          <BsBriefcase className="case-icon" size={25} />
        </Link>

        <FiLogOut onClick={onClickLogout} className="logout-icon" size={25} />
      </div>
      <ul className="link-container">
        <Link className="link" to="/">
          <li>Home</li>
        </Link>
        <Link className="link" to="/jobs">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" onClick={onClickLogout} className="logout-btn">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
