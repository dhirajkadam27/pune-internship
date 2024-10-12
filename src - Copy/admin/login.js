import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./login.css";

function AdminLogin() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passRef = useRef(null);


  const handleLogin = async () => {
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

    const url = `${process.env.REACT_APP_BASE_URL}check_admin.php?email=${email}&pass=${pass}`; // Replace with your actual URL
    const response = await fetch(url);
  
  
    const data = await response.json();
    if(data[0].status){
      localStorage.setItem("isadmin", true);
      localStorage.setItem("adminid", data[0].adminid);
      navigate('/admin/sites');
    }else{
      alert("Incorrect email or password");
    }
    
  };

  return (
    <div className="admin_Login_page">
      <div className="nav">
        <div className="Logo">WeTreat<span>Admin</span></div>
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

export default AdminLogin;
