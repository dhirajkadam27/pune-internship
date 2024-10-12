import { useEffect } from "react";
import "./splash.css";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const iduser = localStorage.getItem('isuser');
    const timeoutId = setTimeout(() => {
      navigate(iduser === null ? '/login' : '/sites');
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="splash_page">
      <div className="logo">WeTreat</div>
    </div>
  );
}

export default Splash;
