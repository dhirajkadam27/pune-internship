import { useEffect, useState } from "react";
import "./visitform.css";
import { useNavigate } from "react-router-dom";

function VisitForm() {
  const navigate = useNavigate();
  const [Loader, setLoader] = useState(false);
  const [data, setData] = useState(false);

  const CreateNewVisit = async () => {
    setLoader(true);
    const date = document.getElementById('date').value;
    const projectname = document.getElementById('pro').value;
    const sitename = document.getElementById('site').value;
    const subjectname = document.getElementById('sub').value;
    const technicalname = document.getElementById('tech').value;
    const info = document.getElementById('desc').value;
    const maintenance = document.getElementById('main').value;
    const adminid = document.getElementById('adminid').value;

    if (!date.trim() || !projectname.trim() || !sitename.trim() || !subjectname.trim() || !technicalname.trim() || !info.trim() || !maintenance.trim()|| !adminid.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SiteVisit.php?date=${date}&projectname=${projectname}&sitename=${sitename}&subjectname=${subjectname}&technicalname=${technicalname}&info=${info}&maintenance=${maintenance}&adminid=${adminid}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data saved");
        navigate(0);
      } else {
        setLoader(false);
        alert("Failed to save data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BASE_URL+'view_admins.php');
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
    <div className="visitform">

      {
        Loader ? <div className="loader">
          <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage" />
        </div> : null
      }

      <div className="Title">Site Visit</div>
      <input id="date" type="date" />
      <select id="adminid">
        <option>Select your Port</option>

        {data.length > 0 ? (
          data.map((admin) => (
          <option key={admin.id} value={admin.adminid}>{admin.name}</option>
          ))
        ) : (
          <option value={0}>null</option>
        )}

      </select>
      <input id="pro" type="text" placeholder="Project Name" />
      <input id="site" type="text" placeholder="Site Name" />
      <input id="sub" type="text" placeholder="Subject Name" />
      <input id="tech" type="text" placeholder="Technician Name" />
      <textarea id="desc" placeholder="Description"></textarea>
      <textarea id="main" placeholder="Maintenance"></textarea>
      <button onClick={() => { CreateNewVisit() }} className="con">Submit</button>
    </div>
  );
}

export default VisitForm;
