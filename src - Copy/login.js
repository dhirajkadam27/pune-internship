import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [Loader, setLoader] = useState(false);

  const handleClick = async () => {
    setLoader(true);
    const mobile = document.getElementById('mobile').value;
    const pass = document.getElementById('pass').value;
    if (mobile.trim() === '') {
      alert('Please enter a email');
      return;
    }
    if (pass.trim() === '') {
      alert('Please enter a password');
      return;
    }


    const url = `${process.env.REACT_APP_BASE_URL}check_user.php?mobile=${mobile}&pass=${pass}`; // Replace with your actual URL
    const response = await fetch(url);
  
    if (!response.ok) {
      setLoader(false);
      return;
    }
  
    const data = await response.json();
    if(data[0].status){
      localStorage.setItem("isuser",true);
      localStorage.setItem("userid",data[0].userid);
      localStorage.setItem("username",data[0].Name);
      setLoader(false);
      navigate('/sites');
    }else{
      setLoader(false);
      alert("wrong Email or Password");
    }
    
  };


  return (
    <div className="Login_page">
     {
      Loader?<div className="loader">
      <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage"/>
    </div>:null
     }
      <div className="nav"><div onClick={()=>{navigate('/login')}} className="Logo">WeTreat</div></div>
      <div className="Title">Log In</div>
      <input id="mobile" placeholder="Mobile number" type="number" />
      <input id="pass" placeholder="Password" type="password" />
      <button onClick={()=>{handleClick()}} className="con">Continue</button>
      {/* <button onClick={()=>{setLoader(true);navigate('/admin/form')}} className="site">Site Visit</button> */}
      <button onClick={()=>{setLoader(true);navigate('/admin')}} className="site">Admin</button>
    </div>
  );
}

export default Login;