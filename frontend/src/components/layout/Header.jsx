import { message } from 'antd';
import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Header () {
    const [loginUser, setLoginUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        setLoginUser(user);
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
        message.success('logout success');
    }
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand">Navbar</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to='/'>Home</Link>
        </li>
        <button className='btn btn-primary' onClick={logoutHandler}>logout</button>
        <li class="nav-item">
          <Link class="nav-link disabled" aria-disabled="true">{loginUser && loginUser.name}</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header;