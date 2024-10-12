import "./user.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AdminNav from "./nav";
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AdminUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');
  
  const [userData, setUserData] = useState(null); 
  const [change, setChange] = useState(0); 
  const [username, setUsername] = useState(""); 
  const [aadharPhoto, setAadharPhoto] = useState(null);
  const [policePhoto, setPolicePhoto] = useState(null);
  const [SignPhoto, setSignPhoto] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [Loader, setLoader] = useState(false);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const addressRef = useRef(null);
  const aadharImgRef = useRef(null);
  const policeImgRef = useRef(null);
  const profileImgRef = useRef(null);
  const signImgRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}view_user.php?id=${userId}`);
        const data = await response.json();
        setUserData(data);
        setUsername(data.Name);
        emailRef.current.value = data.email;
        phoneRef.current.value = data.mobile;
        passwordRef.current.value = data.password;
        aadharImgRef.current.src = `data:image/jpg;charset=utf8;base64,${data.aadhar}`;
        policeImgRef.current.src = `data:image/jpg;charset=utf8;base64,${data.police}`;
        profileImgRef.current.src = `data:image/jpg;charset=utf8;base64,${data.photo}`;
        signImgRef.current.src = `data:image/jpg;charset=utf8;base64,${data.sign}`;
        addressRef.current.value = data.address;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId, change]);

  const handleSave = async () => {
    setLoader(true);
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    const address = addressRef.current.value;

    if (!email.trim() || !phone.trim() || !password.trim() || !address.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const formData = new FormData();
    formData.append('profile', profileImg);
    formData.append('photo', aadharPhoto);
    formData.append('police', policePhoto);
    formData.append('sign', SignPhoto);

    const url = `${process.env.REACT_APP_BASE_URL}update_user.php?email=${email}&phone=${phone}&password=${password}&address=${address}&id=${userId}`;

    try {
      const response = await fetch(url, { method: 'POST', body: formData });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChange(change+1);
      } else {
        setLoader(false);
        alert("Failed to save data");
      }
    } catch (error) {
      setLoader(false);
    alert("Something went wrong");
    }
  };

  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}view_related_sites.php?name=${username}`);
        const jsonData = await response.json();
        setSites(jsonData);
      } catch (error) {
        console.error('Error fetching related sites:', error);
      }
    };

    fetchSites();
  }, [username]);

  const Delete = async (deleteid) => {

    setLoader(true);

    const deletestring = deleteid.split("/");
    const tableid = deletestring[0];
    const table = deletestring[1];
    const tablename = deletestring[2];

    const url = `${process.env.REACT_APP_BASE_URL}Delete.php?id=${tableid}&table=${table}&tablename=${tablename}`; // Replace with your actual URL
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChange(change+1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
    
  };

  return (
    <div className="admin_user_page">
      <AdminNav />

      {
      Loader?<div className="loader">
      <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage"/>
    </div>:null
     }

      <div className="Title2">{userData ? userData.Name : null}</div>

      <Tabs onSelect={(index) => { if (index === 0) setChange(change + 1); }}>
        <TabList className="Tabs">
          <Tab><div className="tab">General</div></Tab>
          <Tab><div className="tab">Sites</div></Tab>
        </TabList>

        <TabPanel>
          <div className="save">
            <div className="label">Profile photo</div>
            <img src="" alt="profile" ref={profileImgRef} />
            <input id="profile" onChange={(e) => setProfileImg(e.target.files[0])} type="file" accept="image/*" />
            <input ref={emailRef} type="text" placeholder="Email" />
            <input ref={phoneRef} type="number" placeholder="Phone" />
            <input ref={passwordRef} type="text" placeholder="Password" />
            <div className="label">Aadhar photo</div>
            <img src="" alt="aadhar" ref={aadharImgRef} />
            <input id="aadhar" onChange={(e) => setAadharPhoto(e.target.files[0])} type="file" accept="image/*" />
            <div className="label">Police verification photo</div>
            <img src="" alt="police" ref={policeImgRef} />
            <input id="police" onChange={(e) => setPolicePhoto(e.target.files[0])} type="file" accept="image/*" />
            <div className="label">Sign photo</div>
            <img src="" alt="Sign" ref={signImgRef} />
            <input id="sign" onChange={(e) => setSignPhoto(e.target.files[0])} type="file" accept="image/*" />
            <input ref={addressRef} type="text" placeholder="Address" />
            <button onClick={handleSave}>Save</button>
            <br></br>
            <button className="delete" onClick={()=>{Delete(userId+"/users/userid");navigate(-1)}}>Delete</button>
          </div>
        </TabPanel>
        
        <TabPanel>
          <div className="boxes">
            {sites.length > 0 ? (
              sites.map((site) => (
                <div className="box" key={site.siteid} onClick={()=>{setLoader(true);navigate(`/admin/site?siteid=${site.siteid}`)}}>
                    <img src="https://static.vecteezy.com/system/resources/previews/009/102/020/non_2x/outline-office-buildings-icon-free-vector.jpg" alt="site" />
                    <div className="sitename">{site.sitename}</div>
                  </div>
              ))
            ) : null}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default AdminUser;
