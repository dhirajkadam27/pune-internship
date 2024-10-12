import { useNavigate } from "react-router-dom";
import AdminNav from "./nav";
import "./users.css";
import React, { useState, useEffect } from "react";

function AdminUsers() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BASE_URL+'view_users.php');
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="admin_users_page">
      <AdminNav />

      <div className="Title2">Users</div>
      <div className="boxes">

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

 
    </div>
  );
}

export default AdminUsers;
