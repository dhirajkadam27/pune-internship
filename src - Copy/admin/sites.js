import { useNavigate } from "react-router-dom";
import AdminNav from "./nav";
import "./sites.css";
import React, { useState, useEffect, useRef } from "react";

function AdminSites() {
  const navigate = useNavigate();
  const [Changed, setChanged] = useState(0);
  const [CreateSite, setCreateSite] = useState(false);
  const [Sites, setSites] = useState([]);
  const [Loader, setLoader] = useState(false);



  const sitenameRef = useRef(null);
  const projectnameRef = useRef(null);
  const clientnameRef = useRef(null);
  const contactRef = useRef(null);
  const addressRef = useRef(null);
  const sdRef = useRef(null);


  useEffect(() => {

    const fetchSites = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL+'fetch/admin/Sites_one.php?adminid='+localStorage.getItem('adminid'));
      const jsonData = await response.json();
      if(jsonData.error){
        alert("Something went Wrong");
      }
      setSites(jsonData);
    };
    fetchSites(); 

  }, [Changed]);

  const CreateNewSite = async () => {
    setCreateSite(false);
    setLoader(true);
    const sitename = sitenameRef.current.value;
    const projectname = projectnameRef.current.value;
    const clientname = clientnameRef.current.value;
    const contact = contactRef.current.value;
    const address = addressRef.current.value;
    const sd = sdRef.current.value;

    if (!sitename.trim() || !projectname.trim() || !clientname.trim() || !sd.trim()|| !contact.trim() || !address.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add_site.php?sitename=${sitename}&projectname=${projectname}&address=${address}&clientname=${clientname}&contact=${contact}&sd=${sd}&adminid=${localStorage.getItem('adminid')}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data saved");
        setChanged(Changed+1);
      } else {
        setLoader(false);
        alert("Failed to save data");
      }
    } catch (error) {
        setLoader(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="admin_sites_page">
      <AdminNav />
      {
      Loader?<div className="loader">
      <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage"/>
    </div>:null
     }
      <div className="Title2">Sites</div>
      <div className="boxes">
        <button
          onClick={() => setCreateSite(!CreateSite)}
          className="create"
        >
          Create new Site
        </button>

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

      {CreateSite && (
        <div className="popup_user_back">
          <div className="popup_user">
            <div className="title">Add Site</div>
            <input ref={sitenameRef} type="text" placeholder="Name" />
            <select ref={projectnameRef}>
              <option>Filteration</option>
              <option>Softener</option>
              <option>RO</option>
              <option>UF</option>
              <option>UF</option>
              <option>DM+MB</option>
              <option>STP</option>
              <option>ETP</option>
            </select>
            <input ref={clientnameRef} type="text" placeholder="Client Name" />
            <input ref={addressRef} type="text" placeholder="Address" />
            <input ref={contactRef} type="number" placeholder="contact" />
            <input ref={sdRef} placeholder="Starting Date" type="date" />
            <button onClick={CreateNewSite}>Add</button>
            <button onClick={() => setCreateSite(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSites;
