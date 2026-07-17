import {Link , Outlet, useNavigate} from "react-router-dom"


const Dashboard = ()=>{

    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
    



    return(
        <div className="dashboard-wrapper">
            <div className="navbar">
                <div className="dashboard-head">
                    <img className="image" src="logo2.png"/>
                    <h3>SBS Contact</h3>
                </div>
                <div className="dashboard-link">
                    <Link className="link" to="/dashboard/home"><span><i className="fa-solid fa-house"></i></span> Home</Link>
                    <Link className="link" to="/dashboard/ContactList"><span><i className="fa-solid fa-table-list"></i></span> Contact List</Link>
                     <Link className="link" to="/dashboard/AddContact"><span><i className="fa-solid fa-address-book"></i></span> Add Contact</Link>
                    {/* <Link className="link" to="/home"><span><i class="fa-solid fa-right-from-bracket"></i></span> Logout</Link> */}
                </div>
                <div>
                    <button className="logout-btn" onClick={logout}><span><i className="fa-solid fa-right-from-bracket"></i></span> Logout</button>
                </div>
           </div>

           <div className="dashboard-content">
            <Outlet/>
           </div>
        </div>
    )
}

export default Dashboard