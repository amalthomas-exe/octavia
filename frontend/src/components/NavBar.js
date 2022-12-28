import React from 'react';
import './NavBar.css'

function NavBar() {
  return (
    <div>
      <div className="navbar navbar-dark">
        <div className="nav-logo">
          <div className="nav-logo-img"><i className="fa-solid fa-robot"></i></div>
          <div className="nav-logo-text">Wall-E</div>
        </div>
        <div className="nav-item">
          <label class="switch">
            <input type="checkbox" />
              <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default NavBar;