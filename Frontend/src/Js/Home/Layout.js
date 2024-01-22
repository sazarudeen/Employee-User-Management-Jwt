import { Outlet, Link, useNavigate } from "react-router-dom";
import FooterComponent from "../../FooterComponent";
import { useState,useEffect } from "react";
import { FaUserLarge } from "react-icons/fa6";
import '../../index.css'

const Layout = ({ setMiddle }) => {

    setMiddle('Employee')

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = () => {
            setLoading(true);
        };

        const handleRouteChangeStart = () => {
            setLoading(true);
        };

        const handleRouteChangeComplete = () => {
            setLoading(false);
        };

        // Add event listeners
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('routeChangeStart', handleRouteChangeStart);
        window.addEventListener('routeChangeComplete', handleRouteChangeComplete);


        // Clean up event listeners when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('routeChangeStart', handleRouteChangeStart);
            window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
        };
    }, []);

    const ShowLoader = () => {
        return (
            <div className="loader loader-align loader-align-1">
            <div className="spinner"></div>
            <strong><p style={{ color: "white" }}>Loading...</p></strong>
            </div> 
        )
    }

    const HomeComponent = () => (
        <>
          {localStorage.getItem('currentUser') && (
            <div id="logoutContainer">
              <div style={{ position: 'relative' }}>
                <FaUserLarge className="userIcon" />
                <h2 style={{ color: 'white' }}>{JSON.parse(localStorage.getItem('currentUser'))['username']}</h2>
                <div id='logout' onClick={handleLogout} className="btn btn-info btn-lg">
                  <span className="glyphicon glyphicon-log-out"></span> Log out
                </div>
              </div>
            </div>
          )}
          {JSON.parse(localStorage.getItem('currentUser'))['isAdmin'] && (
            <div id="adminPanelContainer">
              <div style={{ position: 'relative' }}>
                <div id='logout' onClick={() => navigate("/users")} className="btn btn-info btn-lg" >
                  Manage Users
                </div>
              </div>
            </div>
          )}
          <div id="butt">
            {localStorage.getItem('currentUser') && (
              <div class="container-fluid dashboardText">
                Welcome to Employee Management Portal {JSON.parse(localStorage.getItem('currentUser'))['username']}
              </div>
            )}
            <div id='functionContainer'>
              <div className="liStyle">
                <Link to="/todo"><div className="btn btn-primary">To Do Management</div></Link>
              </div>
              <div className="liStyle">
                <Link to="/skills"><div className="btn btn-success">Skills Management</div></Link>
              </div>
            </div>
            <Outlet />
          </div>
        </>
      );
      

    const navigate = useNavigate();

    const handleLogout = () => {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'))['username']
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
        localStorage.setItem('loggedOut', true)
        navigate('/login', { state: { currentUser } })
    }

    return (
        <>
          {loading ? (
            <ShowLoader />
          ) : (
            <>
              <HomeComponent />
              <FooterComponent />
            </>
          )}
        </>
      );
};

export default Layout;