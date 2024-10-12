import { useEffect } from "react";
import "./splash.css";
import { useNavigate } from "react-router-dom";

function Mainsplash() {
  const navigate = useNavigate();
  const SPLASH_TIMEOUT = 2000;

  useEffect(() => {
    const checkAdmin = localStorage.getItem('isadmin');
    const redirectTo = checkAdmin === null ? '/main/login' : '/main/sites';
    setTimeout(() => {
      navigate(redirectTo);
    }, SPLASH_TIMEOUT);
    console.log(checkAdmin);
  }, [navigate]);

  return (
    <div className="main_splash_page">
      <div className="logo">WeTreat</div>
      <div className="logotype">Main Admin</div>
    </div>
  );
}

export default Mainsplash;
