import { useEffect } from "react";
import "./splash.css";
import { useNavigate } from "react-router-dom";

function Adminsplash() {
  const navigate = useNavigate();
  const SPLASH_TIMEOUT = 2000;

  useEffect(() => {
    const checkAdmin = localStorage.getItem('isadmin');
    const redirectTo = checkAdmin === null ? '/admin/login' : '/admin/sites';
    setTimeout(() => {
      navigate(redirectTo);
    }, SPLASH_TIMEOUT);
    console.log(checkAdmin);
  }, [navigate]);

  return (
    <div className="admin_splash_page">
      <div className="logo">WeTreat</div>
      <div className="logotype">Admin</div>
    </div>
  );
}

export default Adminsplash;
