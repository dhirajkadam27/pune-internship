import "./admin.css";
import AdminNav from "./nav";
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MainAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');

  const [userData, setUserData] = useState(null);
  const [change, setChange] = useState(0);
  const [Loader, setLoader] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}view_admin.php?id=${userId}`);
        const data = await response.json();
        setUserData(data);
        nameRef.current.value = data.name;
        emailRef.current.value = data.email;
        passRef.current.value = data.pass;
      } catch (error)  {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId, change]);

  const handleSave = async () => {
    setLoader(true);
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    if (!name.trim() || !email.trim() || !pass.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}update_admin.php?name=${name}&email=${email}&pass=${pass}&id=${userId}`;

    try {
      const response = await fetch(url, { method: 'POST' });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChange(change + 1);
      } else {
        setLoader(false);
        alert("Failed to save data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
  };


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
        setChange(change + 1);
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
    <div className="main_admin_page">
      <AdminNav />

      {
        Loader ? <div className="loader">
          <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage" />
        </div> : null
      }

      <div className="Title2">{userData ? userData.Name : null}</div>

      <div className="save">
        <div className="label">Main Admin</div>
        <input ref={nameRef} type="text" placeholder="Name" />
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passRef} type="number" placeholder="Password" />
        <button onClick={handleSave}>Save</button>
        <br></br>
        <button className="delete" onClick={() => { Delete(userId + "/admin/adminid"); navigate(-1) }}>Delete</button>
      </div>

    </div>
  );
}

export default MainAdmin;
