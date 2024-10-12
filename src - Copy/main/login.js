import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./login.css";

function MainLogin() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const handleLogin = () => {
    const email = emailRef.current.value.trim();
    const pass = passRef.current.value.trim();

    if (email === '') {
      alert('Please enter an email');
      return;
    }
    if (pass === '') {
      alert('Please enter a password');
      return;
    }

    console.log(email+pass);
    if (email.toLowerCase() === "admin@admin.com" && pass === "admin") {
      localStorage.setItem("isadmin", true);
      navigate('/main/admins');
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="main_Login_page">
      <div className="nav">
        <div className="Logo">WeTreat<span>Main Admin</span></div>
      </div>
      <div className="Title">Log In</div>
      <input ref={emailRef} type="text" placeholder="Email" />
      <input ref={passRef} type="password" placeholder="Password" />
      <button onClick={handleLogin} className="con">Continue</button>
      <button onClick={()=>{navigate('/admin/form')}} className="site">Site Visit</button>
      <button onClick={()=>{navigate('/')}} className="site">User</button>
    </div>
  );
}

export default MainLogin;
