import { useNavigate, Link } from "react-router-dom";
import "./nav.css";
import { useEffect, useState } from "react";

function Nav() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // State to store fetched data

  useEffect(() => {
    setName(localStorage.getItem('username'));
  }, []); // Run only once after the initial render

  return (
    <div className="nav">
      <Link to="/sites"><div className="Logo">WeTreat</div></Link>

      <div className="profile">
        <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt="profile" />

        <div className="dropdown">
          <div className="name">{name}</div>
          <button onClick={() => {
            localStorage.removeItem("isuser");
            navigate('/');
          }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
