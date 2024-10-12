import React, { useEffect, useState } from "react";
import "./sites.css";
import Nav from "./nav";
import { useNavigate } from "react-router-dom";

function Sites() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]); // State to store fetched sites
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(false); // State to store any fetch errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BASE_URL+'view_related_sites.php?name=' + localStorage.getItem('username')
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setSites(jsonData);
      } catch (error) {
        setError(false);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: "Something went Wrong"</div>;
  }

  return (
    <div className="sites_page">
      <Nav />
      <div className="Title2">Sites</div>
      <div className="boxes">
        {sites.length > 0 ? (
          sites.map((site) => (
              <div className="box" onClick={()=>{navigate(`/site?siteid=${site.siteid}&usertype=${site.type}`)}}>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/102/020/non_2x/outline-office-buildings-icon-free-vector.jpg"
                  alt="site"
                />
                <div className="sitename">{site.sitename}</div>
              </div>
          ))
        ) : (
          <div>No sites available.</div>
        )}
      </div>
    </div>
  );
}

export default Sites;
