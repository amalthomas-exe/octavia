import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import './NavBar.css'

function NavBar() {
  const context = useContext(noteContext);
  const {theme, setTheme} = context;

  const changeTheme = ()=>{
    if(theme==="light"){
      document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(43, 42, 42)';
      document.getElementsByTagName('body')[0].style.color = 'rgb(235, 234, 234)';
      setTheme("dark");
    }else{
      document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(238, 238, 238)';
      document.getElementsByTagName('body')[0].style.color = 'rgb(148, 145, 145)';
      setTheme("light");
    }
  }
  return (
    <div>
      <div className={`navbar ${(theme==="light")?"":"navbar-dark"}`}>
        <div className="nav-logo">
          <div className="nav-logo-img"><i className="fa-solid fa-robot"></i></div>
          <div className="nav-logo-text">Wall-E</div>
        </div>
        <div className="nav-item">
          <label class="switch">
            <input type="checkbox" onClick={changeTheme}/>
              <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default NavBar;