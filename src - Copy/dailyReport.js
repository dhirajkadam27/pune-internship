import React, { useEffect, useState } from 'react';
import './dailyReport.css';
import { useLocation } from 'react-router-dom';
import Header from './header.png';

const DailyReport = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const siteId = queryParams.get('siteid');
  const supervisor = queryParams.get('supervisor');
  const shiftid = queryParams.get('shiftid');
  const userid = queryParams.get('userid');
  const reportdate = queryParams.get('date');


  const [GeneralData, setGeneralData] = useState();
  const [UserData, setUserData] = useState([]);
  const [ShiftDataById, setShiftDataById] = useState([]);
  const [MonitoringData, setMonitoringData] = useState([]);
  const [EquipmentData, setEquipmentData] = useState([]);
  const [OperationData, setOperationData] = useState([]);
  const [ChemicalData, setChemicalData] = useState([]);
  const [ToolboxData, setToolboxData] = useState([]);
  const [Water, setWater] = useState([]);
  const [Nextname, setNextname] = useState("");
  const [Nextcontact, setNextcontact] = useState("");
  


  useEffect(() => {

    const FetchSiteGeneralData = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL+'fetch/client/SiteGeneralData.php?siteid=' + siteId);
      const jsonData = await response.json();
      if (jsonData.error) {
        alert("Something went Wrong");
      }
      setGeneralData(jsonData);
    };
    FetchSiteGeneralData();

    const FetchSiteShiftData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteShiftDataOnlyOperator.php?siteid=${siteId}&date=${reportdate}`);
      const jsonData = await response.json();
      if (jsonData.error) {
        alert("Something went Wrong");
      }
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].shiftid === shiftid) {
          if(i===jsonData.length-1){
            setNextname(jsonData[0].employeename);
          }else{
            setNextname(jsonData[i+1].employeename);
          }
        }
      }

    };
    FetchSiteShiftData();

    const FetchSiteShiftDataById = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL+'fetch/client/SiteShiftById.php?shiftid=' + shiftid+'&date='+reportdate);
      const jsonData = await response.json();
      if (jsonData.error) {
        alert("Something went Wrong");
      }
      setShiftDataById(jsonData);
    };
    FetchSiteShiftDataById();

    const FetchSiteUserById = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL+'fetch/client/SiteUserById.php?userid=' + userid);
      const jsonData = await response.json();
      if (jsonData.error) {
        alert("Something went Wrong");
      }
      setUserData(jsonData);
    };
    FetchSiteUserById();

    const FetchSiteMonitoringData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteMonitoringData.php?siteid=${siteId}&userid=${userid}&date=${reportdate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setMonitoringData(data);
    };
    FetchSiteMonitoringData();


    const FetchSiteEquipmentData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteEquipmentData.php?siteid=${siteId}&userid=${userid}&date=${reportdate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setEquipmentData(data);
    };
    FetchSiteEquipmentData();

    const FetchSiteOperationData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteOperationData.php?siteid=${siteId}&userid=${userid}&date=${reportdate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setOperationData(data);
    };
    FetchSiteOperationData();



    const FetchSiteChemicalData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteChemicalData.php?siteid=${siteId}&userid=${userid}&date=${reportdate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setChemicalData(data);
      console.log(data);
    };
    FetchSiteChemicalData();


    const FetchSiteToolboxData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteToolboxData.php?siteid=${siteId}&userid=${userid}&date=${reportdate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setToolboxData(data);
    };

    FetchSiteToolboxData();

    const FetchSiteWaterData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteWaterData.php?siteid=${siteId}&userid=${userid}&date=${reportdate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setWater(data);
    };

    FetchSiteWaterData();


  }, [siteId, shiftid,reportdate,userid])


  
  useEffect(() => {
  
  const FetchContact = async () => {

    const url = `${process.env.REACT_APP_BASE_URL}view_users.php`; // Replace with your actual URL
    const response = await fetch(url); // Replace with your API URL
    const data = await response.json();
    if (data.error) {
      alert("Something went Wrong");
    }
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === Nextname) {
        setNextcontact(data[i].mobile);
      }
    }
    
  };

  FetchContact();

}, [Nextname])

  return (
    <div className="report-container">
    
      <img alt='img' width="100%" src={Header} />
      <p><span><strong>Site Name:</strong> {GeneralData ? GeneralData.sitename : null} </span> <span><strong>Address:</strong> {GeneralData ? GeneralData.address : null}</span> <span><strong>Contact:</strong> {GeneralData ? GeneralData.contact : null}</span></p>
      <p><span><strong>Operator Name:</strong>{ShiftDataById ? ShiftDataById.employeename : null} </span> <span><strong>Supervisor Name:</strong> {supervisor}</span> <span><strong>Shift:</strong> {ShiftDataById ? ShiftDataById.shifttype : null}</span></p>
      <p><span><strong>Date:</strong> {reportdate}</span></p>

      <h2>Operations</h2>
      <table>
        <thead>
          <tr>
            <th>Operations</th>
            <th>Tank Level</th>
            <th>Health</th>
          </tr>
        </thead>
        <tbody>

          {MonitoringData.length > 0 ? (
            <>
              {MonitoringData.map((monitoring) => (

                <tr>
                  <td>{monitoring.monitoringname}</td>
                  <td>{monitoring.tanklevel ? monitoring.tanklevel : "Not Filled"}</td>
                  <td>Ok</td>
                </tr>

              ))}
            </>
          ) : null}
        </tbody>
      </table>

      <h2>Equipments</h2>
      <table>
        <thead>
          <tr>
            <th>Equipments</th>
            <th>Make</th>
            <th>Model</th>
            <th>Power</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>


          {EquipmentData.length > 0 ? (
            <>
              {
                EquipmentData.map((equipment) => (

                  <tr>
                    <td>{equipment.equipmentname}</td>
                    <td>{equipment.make}</td>
                    <td>{equipment.model}</td>
                    <td>{equipment.power}</td>
                    <td>{equipment.status ? equipment.status : "Not Filled"}</td>
                  </tr>

                ))
              }
            </>
          ) : null}

        </tbody>
      </table>

      <h2>Operation</h2>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Backwash Time</th>
            <th>Rinse Time</th>
            <th>Service Time</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>

          {OperationData.length > 0 ? (
            <>
              {
                OperationData.map((operation) => (

                  <tr>
                    <td>1. {operation.operationname}</td>
                    <td>
                      Start Time: {operation.backwash ? operation.backwash + " - " : "Not Filled"}<br />
                      End Time: {operation.backwash1 ? operation.backwash1 + " - " : "Not Filled"}
                    </td>
                    <td>
                      Start Time: {operation.rinse ? operation.rinse + " - " : "Not Filled"}<br />
                      End Time: {operation.rinse1 ? operation.rinse1 + " - " : "Not Filled"}
                    </td>
                    <td>
                      Start Time: {operation.service ? operation.service + " - " : "Not Filled"}<br />
                      End Time: {operation.service1 ? operation.service1 + " - " : "Not Filled"}
                    </td>
                    <td>Ok</td>
                  </tr>

                ))
              }
            </>
          ) : null}


        </tbody>
      </table>

      <h2>Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {ChemicalData.length > 0 ? (
            <>
              {ChemicalData.map((chemical) => (

                <tr>
                  <td>CHEMICALS</td>
                  <td>{chemical.chemicalname}</td>
                  <td>{chemical.quantity}{chemical.quantitytype}</td>
                </tr>

              ))}
            </>
          ) : null}

          
{ToolboxData.length > 0 ? (
            <>
              {ToolboxData.map((toolbox) => (

                <tr>
                  <td>TOOL BOX</td>
                  <td>{toolbox.name}</td>
                  <td>{toolbox.quantity}</td>
                </tr>

              ))}
            </>
          ) : null}


      
        </tbody>
      </table>

      <h2>Flow Meters</h2>
      <table>
        <thead>
          <tr>
            <th>Raw Water Flow Meter</th>
            <th>Qty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>

        {Water.length > 0 ? (
            <>
              {
                Water.map((parameter) => (

                  <tr>
                    <td>{parameter.name}</td>
                    <td>{parameter.level ? parameter.level : "Not Filled"}</td>
                    <td>Ok</td>
                  </tr>

                ))
              }
            </>
          ) : null}
          
        </tbody>
      </table>

      <h2>Handover</h2>
      <table>
        <thead>
          <tr>
            <th>H. Over Op Name</th>
            <th>H. Over Op Number</th>
            <th>Reliever Name</th>
            <th>Reliever Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Nextname}</td>
            <td>{Nextcontact}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>


     <div className='imgbox'>


     {MonitoringData.length > 0 ? (
            <>
              {MonitoringData.map((data) => (
                <>
                 {data.img==="true"? <div className='box'>
                  <div className='boxtitle'>{data.monitoringname}</div>
                  <img src={`data:image/jpg;charset=utf8;base64,${data.imgdata}`} alt='img'/>
                  </div>:null}
                </>

               
                 

              ))}
            </>
          ) : null}
      
   
     </div>


     <img style={{"width":"100px","margin-top":"50px"}} src={UserData?"data:image/jpg;charset=utf8;base64,"+UserData.sign:null} alt='sign'/>
      <p><strong>Supervisor's Signature</strong></p>


      <button onClick={(e)=>{e.currentTarget.style.display = 'none';window.print()}} id='print'>Print</button>
    </div>
  );
}

export default DailyReport;
