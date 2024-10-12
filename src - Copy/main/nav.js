import { useNavigate } from "react-router-dom";
import "./nav.css";

function MainNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isadmin");
    navigate('/main');
  };

  return (
    <div className="nav">
      <div
        className="Logo"
        onClick={() => navigate('/admin/sites')}
        role="button"
        aria-label="Go to Sites"
      >
        WeTreat<span>Main Admin</span>
      </div>

      <div className="profile">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
          alt="Profile"
          aria-label="Profile Icon"
        />

        <div className="dropdown">
          <div className="name">Admin</div>
          <button onClick={() => navigate('/main/users')}>Users</button>
          <button onClick={() => navigate('/main/admins')}>Admins</button>
          <button onClick={() => navigate('/main/sites')}>Sites</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default MainNav;
