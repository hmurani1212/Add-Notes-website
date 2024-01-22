import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
function Navbar() {
    const getAuth = localStorage.getItem("Token");
    const HnadleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand text-white" to="/">Quick-service restaurant</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <form class="d-flex" role="search">
                            <LocalDrinkIcon style={{ fontSize: "40px", color: "white" }} className='mx-3' />
                            {!getAuth ? <div className='container'>
                                <Link class="btn btn-primary mx-1" to="/Login" role="button">Login</Link>
                                <Link class="btn btn-primary mx-2" to="/Sign" role="button">Sign Up</Link>
                            </div> :
                                <div class="btn-group mx-5" role="group" aria-label="Button group with nested dropdown" style={{ position: "relative", right: "50px" }}>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt='....' style={{ width: "20px", height: "20px" }}></img>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><Link class="dropdown-item" to="/Profile">Profile</Link></li>
                                            <li><Link class="dropdown-item" href="#">Setting</Link></li>
                                            <li><Link class="dropdown-item" href="#" onClick={HnadleLogout}>Logout</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Navbar