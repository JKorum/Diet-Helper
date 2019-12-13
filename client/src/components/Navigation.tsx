import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, unregisterUser } from '../store/actions'

/*  
  analysis component    
  alert system (private components)
*/

interface NavConnectedProps {
  dispatch: Function
}

const Navigation: FunctionComponent<NavConnectedProps> = ({ dispatch }) => {
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleUnregister = () => {
    console.log('modal!')
    dispatch(unregisterUser())
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
      <div className='container align-items-baseline'>
        <span className='navbar-brand'>
          <i className='fas fa-carrot fa-2x'></i>
        </span>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarContent'
          aria-controls='navbarContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarContent'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>
                Search
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/collection'>
                Collection
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/analysis'>
                Analysis
              </NavLink>
            </li>
            <li className='nav-item dropdown'>
              <span
                className='nav-link dropdown-toggle'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Account
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
                <span className='dropdown-item' onClick={handleUnregister}>
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
