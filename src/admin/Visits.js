import { useNavigate } from "react-router-dom";
import AdminNav from "./nav";
import "./Visits.css";
import React, { useState, useEffect } from "react";

function Visits() {
  const navigate = useNavigate();
  const [Visits, setVisits] = useState([]);


  useEffect(() => {

    const fetchVisits = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL+'fetch/admin/Visits_one.php?adminid='+localStorage.getItem('adminid'));
      const jsonData = await response.json();
      if(jsonData.error){
        alert("Something went Wrong");
      }
      setVisits(jsonData);
    };
    fetchVisits(); 

  }, []);


  return (
    <div className="admin_visit_page">
      <AdminNav />
      <div className="Title2">Visits</div>
      <div className="boxes">
    

        {Visits.length > 0 ? (
          <>
            {Visits.map((visit) => (
                <div className="box" key={visit.visitid} onClick={()=>{navigate(`/admin/visit?visitid=${visit.visitid}`)}}>
                  <div className="sitename">{visit.projectname}</div>
                </div>
            ))}
          </>
        ) : null}
      </div>

    </div>
  );
}

export default Visits;
