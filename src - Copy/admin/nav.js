import { useNavigate } from "react-router-dom";
import "./nav.css";

function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isadmin");
    navigate('/admin');
  };

  return (
    <div className="nav">
      <div
        className="Logo"
        onClick={() => navigate('/admin/sites')}
        role="button"
        aria-label="Go to Sites"
      >
        WeTreat<span>Admin</span>
      </div>

      <div className="profile">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
          alt="Profile"
          aria-label="Profile Icon"
        />

        <div className="dropdown">
          <div className="name">Admin</div>
          <button onClick={() => navigate('/admin/sites')}>Sites</button>
          <button onClick={() => navigate('/admin/users')}>Users</button>
          <button onClick={() => navigate('/admin/visits')}>Visits</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
