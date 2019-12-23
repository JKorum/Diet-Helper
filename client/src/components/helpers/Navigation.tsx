import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../store/actions'

interface NavConnectedProps {
  dispatch: Function
}

const Navigation: FunctionComponent<NavConnectedProps> = ({ dispatch }) => {
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-light'>
      <div className='container align-items-baseline'>
        <button
          className='navbar-toggler ml-auto'
          type='button'
          data-toggle='collapse'
          data-target='#navbarContent'
          aria-controls='navbarContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <i className='fas fa-bars'></i>
        </button>

        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarContent'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>
                <span id='nav-search' className='badge-nav'>
                  <p>Search</p>
                </span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/collection'>
                <span id='nav-collection' className='badge-nav'>
                  <p>Collection</p>
                </span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/analysis'>
                <span id='nav-analysis' className='badge-nav'>
                  <p>Analysis</p>
                </span>
              </NavLink>
            </li>
            <li className='nav-item dropdown'>
              <span
                className='nav-link'
                data-toggle='dropdown'
                id='navbarDropdown'
                role='button'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <span id='nav-account' className='badge-nav'>
                  <p>Account</p> <i className='fas fa-caret-left'></i>
                </span>
              </span>

              <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <span className='dropdown-item' onClick={handleLogout}>
                  Exit
                </span>
                <div className='dropdown-divider'></div>
                <NavLink className='dropdown-item' to='/credentials'>
                  Credentials
                </NavLink>
                <div className='dropdown-divider'></div>
                <span
                  className='dropdown-item'
                  data-toggle='modal'
                  data-target='#unregisterModal'
                >
                  Delete
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default connect()(Navigation)
