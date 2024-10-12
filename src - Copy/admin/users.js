import { useNavigate } from "react-router-dom";
import AdminNav from "./nav";
import "./users.css";
import React, { useState, useEffect } from "react";

function AdminUsers() {
  const navigate = useNavigate();
  const [showUserForm, setShowUserForm] = useState(false);
  const [Changed, setChanged] = useState(0);
  const [data, setData] = useState([]);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BASE_URL+'view_users_one.php?adminid='+localStorage.getItem('adminid'));
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [Changed]);

  const handleClick = async () => {
    setShowUserForm(false);
    setLoader(true);
    const name = document.getElementById('name').value.trim();
    if (!name) {
      alert('Please enter a name');
      setLoader(false);
      return;
    }

    try {
      const url = `${process.env.REACT_APP_BASE_URL}add_user.php?name=${name}&adminid=${localStorage.getItem('adminid')}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        alert("Data saved");
        setLoader(false);
        setChanged(Changed+1);
      } else {
        alert("Failed to save data");
        setLoader(false);
      }
    } catch (error) {
      alert("Something went wrong");
      setLoader(false);
    }
  };

  return (
    <div className="admin_users_page">
      <AdminNav />

      {
      Loader?<div className="loader">
      <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage"/>
    </div>:null
     }

      <div className="Title2">Users</div>
      <div className="boxes">
        <button onClick={() => setShowUserForm(!showUserForm)} className="create">
          Create new User
        </button>

        {data.length > 0 ? (
          data.map((user) => (
                <div className="box" key={user.id} onClick={()=>{navigate(`/admin/user?id=${user.userid}`)}}>
                <img
                  src={user.photo === "" ? "https://static.vecteezy.com/system/resources/previews/009/102/020/non_2x/outline-office-buildings-icon-free-vector.jpg" : `data:image/jpg;charset=utf8;base64,${user.photo}`}
                  alt="site"
                />
                <div className="sitename">{user.name}</div>
              </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      {showUserForm && (
        <div className="popup_user_back">
          <div className="popup_user">
            <div className="title">Add User</div>
            <input id="name" type="text" placeholder="Name" />
            <button onClick={handleClick}>Add</button>
            <button onClick={() => setShowUserForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
