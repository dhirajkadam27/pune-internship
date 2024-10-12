import "./site.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useState, useEffect } from "react";
import AdminNav from "./nav";
import { useLocation, useNavigate } from 'react-router-dom';

function Site() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const siteId = queryParams.get('siteid');
  const usertype = queryParams.get('usertype');
  const userId = localStorage.getItem('userid');
  const username = localStorage.getItem('username');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const livetime = `${hours}:${minutes}`;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;


  const [Loader, setLoader] = useState(true);
  const [GeneralData, setGeneralData] = useState();
  const [OperatorShiftData, setOperatorShiftData] = useState([]);
  const [EquipmentData, setEquipmentData] = useState([]);
  const [OperationData, setOperationData] = useState([]);
  const [ChemicalData, setChemicalData] = useState([]);
  const [ToolboxData, setToolboxData] = useState([]);
  const [MonitoringData, setMonitoringData] = useState([]);
  const [MsgData, setMsgData] = useState([]);
  const [Water, setWater] = useState([]);
  const [checkShift, setcheckShift] = useState(false);
  const [InputDate, setInputDate] = useState();

  const [Changed, setChanged] = useState(0);

  useEffect(() => {
    const FetchSiteGeneralData = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL+'fetch/client/SiteGeneralData.php?siteid=' + siteId);
      const jsonData = await response.json();
      if (jsonData.error) {
        alert("Something went Wrong");
      }
      setGeneralData(jsonData);
      setLoader(false);
    };
    FetchSiteGeneralData();

  }, [siteId]);


  useEffect(() => {


    const FetchSiteShiftData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteShiftDataOnlyOperator.php?siteid=${siteId}&date=${formattedDate}`);
      const jsonData = await response.json();
      if (jsonData.error) {
        alert("Something went Wrong");
      }


      function timeToMinutes(time) {
        let [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      }

      function isTimeInShift(time1, time2, time3) {
        let start = timeToMinutes(time1);
        let end = timeToMinutes(time2);
        let time = timeToMinutes(time3);

        // Shift crosses midnight
        if (start > end) {
          if (time >= start || time < end) {
            return "within";
          } else {
            return "not";
          }
        } else {
          // Normal shift
          if (time >= start && time <= end) {
            return "within";
          } else {
            return "not";
          }
        }
      }

      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].employeename === username) {
          if (isTimeInShift(jsonData[i].startingtime, jsonData[i].endingtime, livetime) === "within") {
            setcheckShift(true);
          }
        }
      }

    };
    FetchSiteShiftData();
  }, [formattedDate, siteId, livetime, username]);

  useEffect(() => {


    const FetchSiteShiftData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteShiftDataOnlyOperator.php?siteid=${siteId}&date=${formattedDate}`);
      const jsonData = await response.json();
      if (jsonData.error) {
        alert("Something went Wrong");
      }
      console.log(jsonData)
      setOperatorShiftData(jsonData);

    };
    FetchSiteShiftData();

    const FetchSiteEquipmentData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteEquipmentData.php?siteid=${siteId}&userid=${userId}&date=${formattedDate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setEquipmentData(data);
    };
    FetchSiteEquipmentData();

    const FetchSiteOperationData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteOperationData.php?siteid=${siteId}&userid=${userId}&date=${formattedDate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setOperationData(data);
    };
    FetchSiteOperationData();


    const FetchSiteChemicalData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteChemicalData.php?siteid=${siteId}&userid=${userId}&date=${formattedDate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setChemicalData(data);
    };
    FetchSiteChemicalData();


    const FetchSiteToolboxData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteToolboxData.php?siteid=${siteId}&userid=${userId}&date=${formattedDate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setToolboxData(data);
    };

    FetchSiteToolboxData();


    const FetchSiteWaterData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteWaterData.php?siteid=${siteId}&userid=${userId}&date=${formattedDate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setWater(data);
    };

    FetchSiteWaterData();


    const FetchSiteMonitoringData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteMonitoringData.php?siteid=${siteId}&userid=${userId}&date=${formattedDate}`); // Replace with your API URL
      const data = await response.json();
      if (data.error) {
        alert("Something went Wrong");
      }
      setMonitoringData(data);
    };
    FetchSiteMonitoringData();

    const FetchSiteMessageData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteMessageData.php?siteid=${siteId}`); // Replace with your API URL
      const data = await response.json();
      setMsgData(data);
    }
    FetchSiteMessageData();


  }, [siteId, userId, Changed, usertype, formattedDate]);

  function timeToMinutes(time) {
    let [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  function isTimeInShift(time1, time2, time3) {
    let start = timeToMinutes(time1);
    let end = timeToMinutes(time2);
    let time = timeToMinutes(time3);

    // Shift crosses midnight
    if (start > end) {
      if (time >= start || time < end) {
        return "within";
      } else {
        return "not";
      }
    } else {
      // Normal shift
      if (time >= start && time <= end) {
        return "within";
      } else {
        return "not";
      }
    }
  }


  const MarkAttendance = async (shiftid, starttime, img) => {

    function timeToMinutes(time) {
      let [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    }

    function isTimeWithinLimit(time, time1, limit) {
      let minutesTime = timeToMinutes(time);
      let minutesTime1 = timeToMinutes(time1);

      // Check if time1 is more than 'limit' minutes ahead of time
      if (minutesTime1 - minutesTime > limit) {
        return false;
      } else {
        return true;
      }
    }

    let attendace = "Half Present";
    if (isTimeWithinLimit(starttime, livetime, 15)) {
      attendace = "Present";
    }


    function checkAttendance(startTime, endTime) {
      const now = new Date(); // Get current time
      const start = new Date(startTime); // Parse start time
      const end = new Date(endTime); // Parse end time
  
      // Calculate 15 minutes in milliseconds
      const fifteenMinutesAfterStart = new Date(start.getTime() + 15 * 60 * 1000); 
  
      // Check if now is between start and end time
      if (now >= start && now <= end) {
          // If the current time is within 15 minutes after the start time
          if (now <= fifteenMinutesAfterStart) {
              return "Present"
          } else {
              return "Half Present"
          }
      } else {
        return "Absent"
      }
  }


    setLoader(true);
    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteShift.php?shiftid=${shiftid}&userid=${userId}&time=${livetime}&type=${attendace}&date=${formattedDate}`; // Replace with your actual URL
    const formData = new FormData();
    formData.append('photo', img);

    try {
      const response = await fetch(url, { method: 'POST', body: formData });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }

  };



  const AddEquipmentGet = async (status, equipmentid) => {

    setLoader(true);
    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteEquipment.php?equipmentid=${equipmentid}&userid=${userId}&status=${status}&date=${formattedDate}`; // Replace with your actual URL

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }

  };

  const AddEquipmentPost = async (status, equipmentid, img) => {

    setLoader(true);
    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteEquipment.php?equipmentid=${equipmentid}&userid=${userId}&status=${status}&date=${formattedDate}`; // Replace with your actual URL
    const formData = new FormData();
    formData.append('photo', img);

    try {
      const response = await fetch(url, { method: 'POST', body: formData });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }

  };



  const AddOperation = async (operationid) => {

    setLoader(true);
    var backwash = document.getElementById(operationid + 'backwash').value;
    var rinse = document.getElementById(operationid + 'rinse').value;
    var service = document.getElementById(operationid + 'service').value;
    var backwash1 = document.getElementById(operationid + 'backwash1').value;
    var rinse1 = document.getElementById(operationid + 'rinse1').value;
    var service1 = document.getElementById(operationid + 'service1').value;

    if (!backwash.trim() || !rinse.trim() || !service.trim() || !backwash1.trim()|| !rinse1.trim() || !service1.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteOperation.php?&userid=${userId}&operationid=${operationid}&backwash=${backwash}&rinse=${rinse}&service=${service}&backwash1=${backwash1}&rinse1=${rinse1}&service1=${service1}&date=${formattedDate}`; // Replace with your actual URL

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }

  };



  const Addchemical = async (chemicalid) => {


    setLoader(true);
    var quantiy = document.getElementById(chemicalid + 'quantiy').value;
    var quantiytype = document.getElementById(chemicalid + 'quantiytype').value;

    if (!quantiytype.trim() || !quantiy.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteChemical.php?userid=${userId}&chemicalid=${chemicalid}&quantiy=${quantiy}&quantiytype=${quantiytype}&date=${formattedDate}`; // Replace with your actual URL


    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }

  };


  const AddToolbox = async (toolboxid) => {

    setLoader(true);
    var quantiy = document.getElementById(toolboxid + 'toolboxquantity').value;

    
    if (!quantiy.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteToolbox.php?userid=${userId}&toolboxid=${toolboxid}&quantiy=${quantiy}&date=${formattedDate}`; // Replace with your actual URL 

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }

  };

  const AddWater = async (water) => {

    setLoader(true);
    var level = document.getElementById(water + 'waterlevel').value;

    
    if (!level.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteWater.php?userid=${userId}&waterid=${water}&siteid=${siteId}&level=${level}&date=${formattedDate}`; // Replace with your actual URL 

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }

  };



  const AddMonitoring = async (monitoringid) => {

    setLoader(true);
    var tanklevel = document.getElementById(monitoringid + 'tanklevel').value;

    
    if (!tanklevel.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteMonitoring.php?userid=${userId}&monitoringid=${monitoringid}&tanklevel=${tanklevel}&date=${formattedDate}`; // Replace with your actual URL

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }

  };

  const AddMonitoringPost = async (monitoringid, img) => {

    setLoader(true);
    var tanklevel = document.getElementById(monitoringid + 'tanklevel').value;

    
    if (!tanklevel.trim()) {
      alert('Please fill in all fields');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/client/SiteMonitoring.php?userid=${userId}&monitoringid=${monitoringid}&tanklevel=${tanklevel}&date=${formattedDate}`; // Replace with your actual URL

    const formData = new FormData();
    formData.append('photo', img);

    try {
      const response = await fetch(url, { method: 'POST', body: formData });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      console.error('Error saving user data:', error);
    }

  };



  const SendMessage = async () => {

    setLoader(true);
    const from = usertype;
    const to = document.getElementById('to').value;
    const msg = document.getElementById('msg').value;
    if (from.trim() === '') {
      alert('Please enter a from');
      return;
    }
    if (to.trim() === '') {
      alert('Please enter a to');
      return;
    }
    if (msg.trim() === '') {
      alert('Please enter a msg');
      return;
    }
    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SendMessage.php?siteid=${siteId}&from=${from}&to=${to}&msg=${msg}`; // Replace with your actual URL

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed + 1);
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
    <div className="site_page">
      <AdminNav />

      {
        Loader ? <div className="loader">
          <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage" />
        </div> : null
      }

      <div className="Title2">{GeneralData ? GeneralData.sitename : null}</div>

      <Tabs>
        <TabList className="Tabs">
          <Tab><div className="tab">General</div></Tab>
          <Tab><div className="tab">Reports</div></Tab>
          {usertype === "Operator" ? <><Tab><div className="tab">Shift</div></Tab>
            <Tab><div className="tab">Equipments</div></Tab>
            <Tab><div className="tab">Operations</div></Tab>
            <Tab><div className="tab">Chemical</div></Tab>
            <Tab><div className="tab">Toolbox</div></Tab>
            <Tab><div className="tab">Water Parameter</div></Tab>
            <Tab><div className="tab">Monitoring</div></Tab></> : null}
          <Tab><div className="tab">Messages</div></Tab>
        </TabList>


        <TabPanel>

          <div className="general">
            <div className="generaltext">Site Name: {GeneralData ? GeneralData.sitename : null}</div>
            <div className="generaltext">Project Name: {GeneralData ? GeneralData.projectname : null}</div>
            <div className="generaltext">Client Name: {GeneralData ? GeneralData.clientname : null}</div>
            <div className="generaltext">Address: {GeneralData ? GeneralData.address : null}</div>
            <div className="generaltext">Starting Date: {GeneralData ? GeneralData.startingdate : null}</div>
          </div>

        </TabPanel>


        <TabPanel>

          <div className="datetxt">Date</div>
          <input className="dateinput" type="date" onChange={(e) => { setInputDate(e.target.value) }} />



          {InputDate ? OperatorShiftData.length > 0 ? (
            <>
              {
                OperatorShiftData.map((operator) => (
                  <button className="shiftbtn" onClick={()=>{navigate(`/DailyReport?siteid=${siteId}&userid=${operator.userid}&supervisor=${username}&shiftid=${operator.shiftid}&date=${InputDate}`)}}>{operator.shifttype}</button>
                ))
              }
            </>
          ) : null : null}


{OperatorShiftData.length > 0 ? (
              <>
                {OperatorShiftData.map((shift) => (
                  <>
                    {
                      <div key={shift.shiftid} className="task">
                        <div className="taskname">{shift.shifttype} - {shift.shiftrole}</div>
                        <div className="taskname">{shift.employeename}</div>
                        <div className="taskname">{shift.startingtime} - {shift.endingtime}</div>
                      </div>
                    }
                  </>



                ))}
              </>
            ) : null}

        </TabPanel>

        {usertype === "Operator" ? <>
          <TabPanel>



            {OperatorShiftData.length > 0 ? (
              <>
                {OperatorShiftData.map((shift) => (
                  <>
                    {
                      shift.employeename === username ? <div key={shift.shiftid} className="task">
                        <div className="taskname">{shift.shifttype} - {shift.shiftrole}</div>
                        <div className="taskname">{shift.employeename}</div>
                        <div className="taskname">{shift.startingtime} - {shift.endingtime}</div>
                        <input id={"shiftinput" + shift.shiftid} style={{ "display": "none" }} accept="image/*"capture="camera" type="file" onChange={(e) => { MarkAttendance(shift.shiftid, shift.startingtime, e.target.files[0]) }} />
                        {shift.img ? shift.type : isTimeInShift(shift.startingtime, shift.endingtime, livetime) === "within" ? <button onClick={() => { document.getElementById("shiftinput" + shift.shiftid).click() }}>Mark Attendace</button> : "Not Filled"}
                      </div> : null
                    }
                  </>



                ))}
              </>
            ) : null}




          </TabPanel>
          <TabPanel>


            {checkShift ? EquipmentData.length > 0 ? (
              <>
                {
                  EquipmentData.map((equipment) => (
                    <div key={equipment.equipmentid} className="task">
                      <div className="taskname">{equipment.equipmentname}</div>
                      <input id={"eqimg" + equipment.equipmentid} style={{ "display": "none" }} accept="image/*"capture="camera" type="file" onChange={(e) => { AddEquipmentPost("Maintaince", equipment.equipmentid, e.target.files[0]) }} />
                      {equipment.status ? <div className="taskname">Status: {equipment.status ? equipment.status : "Not Filled"}<br /><img alt="as" src={"data:image/jpg;charset=utf8;base64," + equipment.statusimg} /></div> : (<div className="eqbtns"><button onClick={() => { AddEquipmentGet("On", equipment.equipmentid) }}>On</button><button style={{ "background": "#d64848" }} onClick={() => { AddEquipmentGet("Off", equipment.equipmentid) }}>Off</button><button style={{ "background": "#ed9e23" }} onClick={() => { document.getElementById("eqimg" + equipment.equipmentid).click() }}>Maintance</button></div>) }
                    </div>

                  ))
                }
              </>
            ) : null : <div className="noshift">It's not your shift</div>}


          </TabPanel>
          <TabPanel>


            {checkShift ? OperationData.length > 0 ? (
              <>
                {
                  OperationData.map((operation) => (

                    <div key={operation.operationid} className="task">
                      <div className="taskname">{operation.operationname}</div>


                      { operation.rinse ? <><div className="taskname">Backwash Time: {operation.backwash ? operation.backwash + " - " : "Not Filled"}{operation.backwash1 ? operation.backwash1 : ""}</div>
                        <div className="taskname">Rinse Time: {operation.rinse ? operation.rinse + " - " : "Not Filled"}{operation.rinse1 ? operation.rinse1 : ""}</div>
                        <div className="taskname">Service Time: {operation.service ? operation.service + " - " : "Not Filled"}{operation.service1 ? operation.service1 : ""}</div></> : <>
                        <div className="opinput">
                          <label>Backwash Time:</label>
                          <input id={operation.operationid + "backwash"} type="time" />
                          <input id={operation.operationid + "backwash1"} type="time" />
                        </div>

                        <div className="opinput">
                          <label>Rinse Time:</label>
                          <input id={operation.operationid + "rinse"} type="time" />
                          <input id={operation.operationid + "rinse1"} type="time" />
                        </div>

                        <div className="opinput">
                          <label>Service Time:</label>
                          <input id={operation.operationid + "service"} type="time" />
                          <input id={operation.operationid + "service1"} type="time" />
                        </div>
                        <button onClick={() => { AddOperation(operation.operationid) }}>Add</button>
                      </>}


                    </div>

                  ))}
              </>
            ) : null : <div className="noshift">It's not your shift</div>}



          </TabPanel>
          <TabPanel>



            {checkShift ? ChemicalData.length > 0 ? (
              <>
                {
                  ChemicalData.map((chemical) => (

                    <div key={chemical.chemicalid} className="task">
                      <div className="taskname">{chemical.chemicalname}</div>

                      { chemical.quantity ? <><div className="taskname">Quantity: {chemical.quantity ? chemical.quantity : "Not Filled"} {chemical.quantitytype ? chemical.quantitytype : ""}</div></> : <><div className="cheminput">
                        <label>Quantity:</label>
                        <input id={chemical.chemicalid + "quantiy"} type="text" />
                      </div>
                        <div className="cheminput">
                          <label>Quantity Type:</label>
                          <select id={chemical.chemicalid + "quantiytype"}>
                            <option>Kg</option>
                            <option>L</option>
                          </select>
                          <button onClick={() => { Addchemical(chemical.chemicalid) }}>add</button>
                        </div></>}

                    </div>

                  ))}
              </>
            ) : null : <div className="noshift">It's not your shift</div>}

          </TabPanel>
          <TabPanel>

            {checkShift ? ToolboxData.length > 0 ? (
              <>
                {ToolboxData.map((toolbox) => (

                  <div key={toolbox.toolboxid} className="task">
                    <div className="taskname">{toolbox.name}</div>

                    {toolbox.quantity ? <div className="taskname">Quantity: {toolbox.quantity ? toolbox.quantity : "Not Filled"}</div> : <div className="toolinput">
                      <label>Quantity:</label>
                      <input id={toolbox.toolboxid + "toolboxquantity"} type="text" />
                      <button onClick={() => { AddToolbox(toolbox.toolboxid) }}>Add</button>
                    </div>}

                  </div>

                ))}
              </>
            ) : null : <div className="noshift">It's not your shift</div>}


          </TabPanel>


          <TabPanel>

          {checkShift ? Water.length > 0 ? (
              <>
                {Water.map((parameter) => (

                  <div key={parameter.waterid} className="task">
                    <div className="taskname">{parameter.name}</div>

                    {parameter.level ? <div className="taskname">Quantity: {parameter.level ? parameter.level : "Not Filled"}</div> : <div className="toolinput">
                      <label>Quantity:</label>
                      <input id={parameter.waterid + "waterlevel"} type="text" />
                      <button onClick={() => { AddWater(parameter.waterid) }}>Add</button>
                    </div>
                    }

                  </div>

                ))}
              </>
            ) : null : <div className="noshift">It's not your shift</div>}


          </TabPanel>

          <TabPanel>

            {checkShift ? MonitoringData.length > 0 ? (
              <>
                {MonitoringData.map((monitoring) => (

                  <div key={monitoring.monitoringid} className="task">
                    <div className="taskname">{monitoring.monitoringname}</div>

                    { monitoring.tanklevel ? <div className="taskname">Tank Level: {monitoring.tanklevel ? monitoring.tanklevel : "Not Filled"}</div> : <div className="moninput">
                      <label>Tank Level:</label>
                      <input id={monitoring.monitoringid + "tanklevel"} type="text" />
                      <input id={"monitoringimg" + monitoring.monitoringid} style={{ "display": "none" }} accept="image/*"capture="camera" type="file" onChange={(e) => { AddMonitoringPost(monitoring.monitoringid, e.target.files[0]) }} />

                      {monitoring.img === "false" ? <button onClick={() => { AddMonitoring(monitoring.monitoringid) }}>Add</button> : <button onClick={() => { document.getElementById("monitoringimg" + monitoring.monitoringid).click() }}>Upload</button>}

                    </div> }

                  </div>

                ))}
              </>
            ) : null : <div className="noshift">It's not your shift</div>}



          </TabPanel></> : null}


        <TabPanel>


          {MsgData.length > 0 ? (
            <>
              {MsgData.map((msg) => (

                <div className="message">
                  <div className="name">From: {msg.msgfrom}</div>
                  <div className="name">To: {msg.msgto}</div>
                  <div className="msg">Message: {msg.msg}</div>
                </div>

              ))}
            </>
          ) : null}


          <div className="messageinput">
            <div className="nameinput">To: <select id="to">
              {usertype === "Operator" ? <><option>Supervisor</option>
                <option>Admin</option></> : <><option>Admin</option>
                <option>Operator</option></>}

            </select></div>
            <div className="msginput">Message: <textarea id="msg"></textarea></div>
            <button onClick={() => { SendMessage() }}>Send</button>
          </div>


        </TabPanel>

      </Tabs>

      <div>


      </div>

    </div>
  );
}

export default Site;
