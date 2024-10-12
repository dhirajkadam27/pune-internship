import { useNavigate } from "react-router-dom";
import AdminNav from "./nav";
import "./sites.css";
import React, { useState, useEffect } from "react";

function MainSites() {
  const navigate = useNavigate();
  const [Sites, setSites] = useState([]);
  const [Loader, setLoader] = useState(false);



  useEffect(() => {

    const fetchSites = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL+'fetch/admin/Sites.php');
      const jsonData = await response.json();
      if(jsonData.error){
        alert("Something went Wrong");
      }
      setSites(jsonData);
    };
    fetchSites(); 

  }, []);



  return (
    <div className="main_sites_page">
      <AdminNav />
      {
      Loader?<div className="loader">
      <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage"/>
    </div>:null
     }
      <div className="Title2">Sites</div>
      <div className="boxes">

        {Sites.length > 0 ? (
          <>
            {Sites.map((site) => (
                <div className="box" key={site.siteid} onClick={()=>{setLoader(true);navigate(`/admin/site?siteid=${site.siteid}`)}}>
                  <img src="https://static.vecteezy.com/system/resources/previews/009/102/020/non_2x/outline-office-buildings-icon-free-vector.jpg" alt="site" />
                  <div className="sitename">{site.sitename}</div>
                </div>
            ))}
          </>
        ) : null}
      </div>

   
    </div>
  );
}

export default MainSites;
