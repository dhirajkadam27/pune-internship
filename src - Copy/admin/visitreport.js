import React, { useEffect, useState } from 'react';
import './visitreport.css';
import { useLocation } from 'react-router-dom';
import Header from '../header.png';

const VisitReport = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const visitid = queryParams.get('visitid');
  const [Visit, setVisit] = useState([]);

  useEffect(() => {

    const fetchVisits = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL+'fetch/admin/Visit.php?visitid='+visitid);
      const jsonData = await response.json();
      if(jsonData.error){
        alert("Something went Wrong");
      }
      setVisit(jsonData);
      console.log(jsonData[0]);
    };
    fetchVisits(); 

  }, [visitid]);

  return (
    <div className="visit-report">
      <img alt='img' width="100%" src={Header} />

      <h3 className="title">SITE VISIT REPORT</h3>
      <p><strong>Date:</strong> {Visit[0]?Visit[0].date:"loading"}</p>
      <p><strong>Project Name:</strong>  {Visit[0]?Visit[0].projectname:"loading"}</p>
      <p><strong>Site Name:</strong>  {Visit[0]?Visit[0].sitename:"loading"}</p>
      <p><strong>Subject:</strong> {Visit[0]?Visit[0].subjectname:"loading"}</p>
      <p><strong>Technician Name:</strong> {Visit[0]?Visit[0].technicalname:"loading"}</p>
      <br />

      <h2 className="subtitle">Maintenance:</h2>
      <pre>
      {Visit[0]?Visit[0].maintenance:"loading"}
      </pre>

      
      <h2 className="subtitle">Description:</h2>
      <pre>
      {Visit[0]?Visit[0].info:"loading"}
      </pre>
      <br />
   
      <br />
      <br />
      <br />
      <p>FOR</p>
      <p><strong>PANSHUL ENGINEERING AND CHEMICALS PVT LTD.</strong></p>
      
      <img style={{"width":"100px","margin-top":"50px"}} src={"https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"} alt='sign'/>


      <button onClick={(e)=>{e.currentTarget.style.display = 'none';window.print()}} id='print'>Print</button>

</div>
  );
};

export default VisitReport;
