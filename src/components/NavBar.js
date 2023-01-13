import React,{useContext,useEffect} from 'react';
import noteContext from '../context/notes/noteContext';
import './NavBar.css'

function NavBar() {
  const context = useContext(noteContext);
  const {theme, setTheme} = context;
  useEffect(()=>{
    if(theme==="light"){
      document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(238, 238, 238)';
      document.getElementsByTagName('body')[0].style.color = 'rgb(148, 145, 145)';
    }else{
      document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(43, 42, 42)';
      document.getElementsByTagName('body')[0].style.color = 'rgb(235, 234, 234)';
    }
  },[theme])



  const changeTheme = ()=>{
    if(theme==="light"){
      setTheme("dark");
      localStorage.setItem("note-theme","dark");
    }else{
      setTheme("light");
      localStorage.setItem("note-theme","light");
    }
  }
  return (
    <div>
      <div className={`navbar ${(theme==="light")?"":"navbar-dark"}`}>
        <div className="nav-logo">
          <div className="nav-logo-img"><i class="fa-solid fa-note-sticky"></i></div>
          <div className="nav-logo-text">Notes</div>
        </div>
        <div className="nav-items">
          <label class="switch">
            <input type="checkbox" checked={(theme==="dark")?true:false} onClick={changeTheme}/>
              <span class="slider round"></span>
          </label>
          {(theme==="light")?<i class="fa-solid fa-sun"></i>:<i class="fa-solid fa-moon"></i>}
        </div>
      </div>
    </div>
  )
}

export default NavBar;