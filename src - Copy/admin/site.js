import "./site.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useState, useEffect } from "react";
import AdminNav from "./nav";
import { useLocation, useNavigate } from 'react-router-dom';

function AdminSite() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const siteid = queryParams.get('siteid');


  
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [Loader, setLoader] = useState(false);
  const [GeneralData, setGeneralData] = useState();
  const [ShiftData, setShiftData] = useState([]);
  const [EquipmentData, setEquipmentData] = useState([]); 
  const [OperationData, setOperationData] = useState([]); 
  const [ChemicalData, setChemicalData] = useState([]); 
  const [ToolboxData, setToolboxData] = useState([]); 
  const [MonitoringData, setMonitoringData] = useState([]); 
  const [MsgData, setMsgData] = useState([]); 
  const [Changed, setChanged] = useState(0);


  const [ShiftPopup, setShiftPopup] = useState(false);



  const [EquipmentPopup, setEquipmentPopup] = useState(false);
  const [OperationPopup, setOperationPopup] = useState(false);
  const [ChemicalPopup, setChemicalPopup] = useState(false);
  const [ToolboxPopup, setToolboxPopup] = useState(false);
  const [MonitoringPopup, setMonitoringPopup] = useState(false);



  const [users, setUsers] = useState([]);


  useEffect(() => {
    const FetchSiteGeneralData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteGeneralData.php?siteid=${siteid}`);
      const data = await response.json();
      setGeneralData(data);
    };
    FetchSiteGeneralData();


    const FetchSiteShiftData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteShiftData.php?siteid=${siteid}&date=${formattedDate}`); // Replace with your API URL
      const data = await response.json();
      if(data.error){
        alert("Something went Wrong");
      }
      setShiftData(data);
    };
    FetchSiteShiftData();

    const FetchSiteEquipmentData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/admin/SiteEquipmentData.php?siteid=${siteid}`); // Replace with your API URL
      const data = await response.json();
      if(data.error){
        alert("Something went Wrong");
      }
      setEquipmentData(data);
    };
    FetchSiteEquipmentData();

    const FetchSiteOperationData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/admin/SiteOperationData.php?siteid=${siteid}`); // Replace with your API URL
      const data = await response.json();
      if(data.error){
        alert("Something went Wrong");
      }
      setOperationData(data);
    };
    FetchSiteOperationData();

    
    const FetchSiteChemicalData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/admin/SiteChemicalData.php?siteid=${siteid}`); // Replace with your API URL
      const data = await response.json();
      if(data.error){
        alert("Something went Wrong");
      }
      setChemicalData(data);
      console.log(data);
    };
    FetchSiteChemicalData();

    
    const FetchSiteToolboxData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/admin/SiteToolboxData.php?siteid=${siteid}`); // Replace with your API URL
      const data = await response.json();
      if(data.error){
        alert("Something went Wrong");
      }
      setToolboxData(data);
    };

    FetchSiteToolboxData();

    
    const FetchSiteMonitoringData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/admin/SiteMonitoringData.php?siteid=${siteid}`); // Replace with your API URL
      const data = await response.json();
      if(data.error){
        alert("Something went Wrong");
      }
      setMonitoringData(data);
    };
    FetchSiteMonitoringData();


    const FetchSiteMessageData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/client/SiteMessageData.php?siteid=${siteid}`); // Replace with your API URL
      const data = await response.json();
      setMsgData(data);
    }
    FetchSiteMessageData();



    const fetchUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}fetch/admin/Users.php`); // Replace with your API URL
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();

  }, [siteid, Changed,formattedDate]);


  const AddShift = async () => {

    setShiftPopup(false);
    setLoader(true);
    const shifttype = document.getElementById('shifttype').value;
    const shiftrole = document.getElementById('shiftrole').value;
    const employeename = document.getElementById('employeename').value;
    const startingtime = document.getElementById('startingtime').value;
    const endingtime = document.getElementById('endingtime').value;
    if (shifttype.trim() === '') {
      alert('Please enter a Site type');
      setLoader(false);
      return;
    }
    if (shiftrole.trim() === '') {
      alert('Please enter a Shift role');
      setLoader(false);
      return;
    }
    if (employeename.trim() === '') {
      alert('Please enter a Employee name');
      setLoader(false);
      return;
    }
    if (startingtime.trim() === '') {
      alert('Please enter a Starting time');
      setLoader(false);
      return;
    }
    if (endingtime.trim() === '') {
      alert('Please enter a Ending time');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SiteShift.php?siteid=${siteid}&shifttype=${shifttype}&shiftrole=${shiftrole}&employeename=${employeename}&startingtime=${startingtime}&endingtime=${endingtime}`; // Replace with your actual URL
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed+1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
    
  };

  const AddEquipment = async () => {

    setEquipmentPopup(false);
    setLoader(true);
    const equipmentname = document.getElementById('equipmentname').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const serial = document.getElementById('serial').value;
    const power = document.getElementById('power').value;
    const rupees = document.getElementById('rupees').value;
    const capacity = document.getElementById('capacity').value;
    if (equipmentname.trim() === '') {
      alert('Please enter a Equipment Name');
      setLoader(false);
      return;
    }
    if (make.trim() === '') {
      alert('Please enter a Make');
      setLoader(false);
      return;
    }
    if (model.trim() === '') {
      alert('Please enter a model');
      setLoader(false);
      return;
    }
    if (serial.trim() === '') {
      alert('Please enter a Serial');
      setLoader(false);
      return;
    }
    if (rupees.trim() === '') {
      alert('Please enter a Rupees');
      setLoader(false);
      return;
    }
    if (power.trim() === '') {
      alert('Please enter a Power');
      setLoader(false);
      return;
    }
    if (capacity.trim() === '') {
      alert('Please enter a capacity');
      setLoader(false);
      return;
    }
    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SiteEquipment.php?siteid=${siteid}&equipmentname=${equipmentname}&make=${make}&model=${model}&serial=${serial}&power=${power}&rupees=${rupees}&capacity=${capacity}`; // Replace with your actual URL
     
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed+1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
    
  };



  const AddOperation = async () => {

    setOperationPopup(false);
    setLoader(true);
    const operationname = document.getElementById('operationname').value;
    if (operationname.trim() === '') {
      alert('Please enter a Operation name');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SiteOperation.php?siteid=${siteid}&operationname=${operationname}`; // Replace with your actual URL
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed+1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
    
  };


  const AddChemical = async () => {

    setChemicalPopup(false);
    setLoader(true);
    const chemicalname = document.getElementById('chemicalname').value;
    const crupees = document.getElementById('crupees').value;
    if (chemicalname.trim() === '') {
      alert('Please enter a chemical name');
      setLoader(false);
      return;
    }
    if (crupees.trim() === '') {
      alert('Please enter a Rupees');
      setLoader(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SiteChemical.php?siteid=${siteid}&chemicalname=${chemicalname}&rupee=${crupees}`; // Replace with your actual URL
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed+1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
    
  };


  const AddToolbox = async () => {

    setToolboxPopup(false);
    setLoader(true);
    const toolboxname = document.getElementById('toolboxname').value;
    if (toolboxname.trim() === '') {
      alert('Please enter a toolbox name');
      setLoader(false);
      return;
    }
    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SiteToolbox.php?siteid=${siteid}&toolboxname=${toolboxname}`; // Replace with your actual URL
     
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed+1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
    
  };


  const AddMonitoring = async () => {

    setMonitoringPopup(false);
    setLoader(true);
    const monitoringname = document.getElementById('monitoringname').value;
    const monitoringimg = document.getElementById('monitoringimg').value;
    if (monitoringname.trim() === '') {
      alert('Please enter a monitoring name');
      setLoader(false);
      return;
    }
    if (monitoringimg.trim() === '') {
      alert('Please enter a monitoring Image');
      setLoader(false);
      return;
    }
    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SiteMonitoring.php?siteid=${siteid}&monitoringname=${monitoringname}&monitoringimg=${monitoringimg}`; // Replace with your actual URL
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed+1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
    
  };


  
  const SendMessage = async () => {

    setLoader(true);
    const from = "Admin";
    const to = document.getElementById('to').value;
    const msg = document.getElementById('msg').value;
    if (from.trim() === '') {
      alert('Please enter a from');
      setLoader(false);
      return;
    }
    if (to.trim() === '') {
      alert('Please enter a to');
      setLoader(false);
      return;
    }
    if (msg.trim() === '') {
      alert('Please enter a msg');
      setLoader(false);
      return;
    }
    const url = `${process.env.REACT_APP_BASE_URL}add/admin/SendMessage.php?siteid=${siteid}&from=${from}&to=${to}&msg=${msg}`; // Replace with your actual URL
     
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status) {
        setLoader(false);
        alert("Data Saved");
        setChanged(Changed+1);
      } else {
        setLoader(false);
        alert("Failed to Save Data");
      }
    } catch (error) {
      setLoader(false);
      alert("Something went wrong");
    }
    
  };



  const Delete = async (deleteid) => {

    setOperationPopup(false);
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
        setChanged(Changed+1);
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
    <div className="admin_site_page">
      <AdminNav />
      <div className="Title2">{GeneralData ? GeneralData.sitename : null}</div>
      {
      Loader?<div className="loader">
      <img src={'https://i.gifer.com/ZZ5H.gif'} alt="LoaderImage"/>
    </div>:null
     }

      <Tabs>
        <TabList className="Tabs">
          <Tab><div className="tab">General</div></Tab>
          <Tab><div className="tab">Shift</div></Tab>
          <Tab><div className="tab">Equipments</div></Tab>
          <Tab><div className="tab">Operations</div></Tab>
          <Tab><div className="tab">Chemical</div></Tab>
          <Tab><div className="tab">Toolbox</div></Tab>
          <Tab><div className="tab">Monitoring</div></Tab>
          <Tab><div className="tab">Messages</div></Tab>
        </TabList>


        <TabPanel>

          <div className="general">
            <div className="generaltext">Site Name: {GeneralData ? GeneralData.sitename : null}</div>
            <div className="generaltext">Project Name: {GeneralData ? GeneralData.projectname : null}</div>
            <div className="generaltext">Client Name: {GeneralData ? GeneralData.clientname : null}</div>
            <div className="generaltext">Address: {GeneralData ? GeneralData.address : null}</div>
            <div className="generaltext">Starting Date: {GeneralData ? GeneralData.startingdate : null}</div>
            <button className="delete" onClick={()=>{Delete(siteid+"/sites/siteid");navigate(-1)}}>Delete</button>
          </div>

        </TabPanel>

        <TabPanel>

          <button className="createbtn" onClick={() => {
            ShiftPopup ? setShiftPopup(false) : setShiftPopup(true);
          }}>Create new</button>


          {ShiftData.length > 0 ? (
            <>
              {ShiftData.map((shift) => (
                <div key={shift.shiftid} className="task">
                  <div className="taskname">{shift.shifttype}</div>
                  <div className="taskname">{shift.shiftrole} : {shift.employeename}</div>
                  <div className="taskname">{shift.startingtime} - {shift.endingtime}</div>
                  <button className="delete" onClick={()=>{Delete(shift.shiftid+"/shift/shiftid")}}>Delete</button>
                </div>

              ))}
            </>
          ) : null}



          {ShiftPopup ? <div className="popup_equipment_back">
            <div className="popup_equipment">
              <div className="title">Add Shift</div>
              <select id="shifttype">
                <option>General shift</option>
                <option>First shift</option>
                <option>Second shift</option>
                <option>Third shift</option>
              </select>
              <select id="shiftrole">
                <option>Operator</option>
                <option>Supervisor</option>
                <option>Helper</option>
                <option>Reliver</option>
              </select>
              <select id="employeename">

                {users.length > 0 ? (
                  <>
                    {users.map((user) => (

                      <option>{user.name}</option>

                    ))}
                  </>
                ) : null}
              </select>
              <input id="startingtime" type="datetime-local" />
              <input id="endingtime" type="datetime-local" />
              <button onClick={() => { AddShift() }}>Add</button>
              <button onClick={() => { setShiftPopup(false); }}>Cancel</button>
            </div>
          </div> : null}



        </TabPanel>
        <TabPanel>

          <button className="createbtn" onClick={() => {
            EquipmentPopup ? setEquipmentPopup(false) : setEquipmentPopup(true);
          }}>Create new</button>

          {EquipmentData.length > 0 ? (
            <>
              {EquipmentData.map((equipment) => (
                <div key={equipment.equipmentid} className="task">
                  <div className="taskname">{equipment.equipmentname}</div>
                  <div className="taskname">{equipment.make}</div>
                  <div className="taskname">{equipment.model}</div>
                  <div className="taskname">{equipment.serial}</div>
                  <div className="taskname">{equipment.power}/KW</div>
                  <div className="taskname">Rs.{equipment.rupees}/Unit</div>
                  <div className="taskname">{equipment.capacity}</div>
                  <button className="delete" onClick={()=>{Delete(equipment.equipmentid+"/equipments/equipmentid")}}>Delete</button>
                </div>

              ))}
            </>
          ) : null}



          {EquipmentPopup ? <div className="popup_equipment_back">
            <div className="popup_equipment">
              <div className="title">Add Equipment</div>
              <input id="equipmentname" type="text" placeholder="Name" />
              <input id="make" type="text" placeholder="Make" />
              <input id="model" type="text" placeholder="Model Number" />
              <input id="serial" type="text" placeholder="Serial Number" />
              <div style={{"display":"flex","alignItems":"center"}}><input style={{"width":"80%"}} id="power" type="number" placeholder="Power" /><label style={{"marginLeft":"10px"}}>KW</label></div>
              <div style={{"display":"flex","alignItems":"center"}}><input style={{"width":"80%"}} id="rupees" type="number" placeholder="Rupees" /><label style={{"marginLeft":"10px"}}>/Unit</label></div>
              <input id="capacity" type="text" placeholder="Capacity" />
              <button onClick={() => { AddEquipment(); }}>Add</button>
              <button onClick={() => { setEquipmentPopup(false); }}>Cancel</button>
            </div>
          </div> : null}



        </TabPanel>
        <TabPanel>
          <button className="createbtn" onClick={() => {
            OperationPopup ? setOperationPopup(false) : setOperationPopup(true);
          }}>Create new</button>


          {OperationData.length > 0 ? (
            <>
              {OperationData.map((operation) => (

                <div key={operation.operationid} className="task">
                  <div className="taskname">{operation.operationname}</div>
                  <div className="taskname">{operation.img}</div>
                  <button className="delete" onClick={()=>{Delete(operation.operationid+"/operations/operationid")}}>Delete</button>
                </div>

              ))}
            </>
          ) : null}



          {OperationPopup ? <div className="popup_equipment_back">
            <div className="popup_equipment">
              <div className="title">Add Operation</div>
              <input id="operationname" type="text" placeholder="Name" />
              <button onClick={() => { AddOperation() }}>Add</button>
              <button onClick={() => { setOperationPopup(false); }}>Cancel</button>
            </div>
          </div> : null}

        </TabPanel>
        <TabPanel>

          <button className="createbtn" onClick={() => {
            ChemicalPopup ? setChemicalPopup(false) : setChemicalPopup(true);
          }}>Create new</button>



          {ChemicalData.length > 0 ? (
            <>
              {ChemicalData.map((chemical) => (

                <div key={chemical.chemicalid} className="task">
                  <div className="taskname">{chemical.chemicalname}</div>
                  <button className="delete" onClick={()=>{Delete(chemical.chemicalid+"/chemical/chemicalid")}}>Delete</button>
                </div>

              ))}
            </>
          ) : null}




          {ChemicalPopup ? <div className="popup_equipment_back">
            <div className="popup_equipment">
              <div className="title">Add Chemical</div>
              <input id="chemicalname" type="text" placeholder="Name" />
              <div style={{"display":"flex","alignItems":"center"}}><input style={{"width":"80%"}} id="crupees" type="number" placeholder="Rupees" /><label style={{"marginLeft":"10px"}}>/Liter</label></div>
              <button onClick={() => { AddChemical() }}>Add</button>
              <button onClick={() => { setChemicalPopup(false); }}>Cancel</button>
            </div>
          </div> : null}

        </TabPanel>
        <TabPanel>


          <button className="createbtn" onClick={() => {
            ToolboxPopup ? setToolboxPopup(false) : setToolboxPopup(true);
          }}>Create new</button>

          {ToolboxData.length > 0 ? (
            <>
              {ToolboxData.map((toolbox) => (

                <div key={toolbox.toolboxid} className="task">
                  <div className="taskname">{toolbox.name}</div>
                  <button className="delete" onClick={()=>{Delete(toolbox.toolboxid+"/toolbox/toolboxid")}}>Delete</button>
                </div>

              ))}
            </>
          ) : null}




          {ToolboxPopup ? <div className="popup_equipment_back"><div className="popup_equipment">
            <div className="title">Add Toolbox</div>
            <input id="toolboxname" type="text" placeholder="Name" />
            <button onClick={() => { AddToolbox() }}>Add</button>
            <button onClick={() => { setToolboxPopup(false); }}>Cancel</button>
          </div></div> : null}
        </TabPanel>
        <TabPanel>


          <button className="createbtn" onClick={() => {
            MonitoringPopup ? setMonitoringPopup(false) : setMonitoringPopup(true);
          }}>Create new</button>


          {MonitoringData.length > 0 ? (
            <>
              {MonitoringData.map((monitoring) => (

                <div key={monitoring.monitoringid} className="task">
                  <div className="taskname">{monitoring.monitoringname}</div>
                  <button className="delete" onClick={()=>{Delete(monitoring.monitoringid+"/monitoring/monitoringid")}}>Delete</button>
                </div>

              ))}
            </>
          ) : null}




          {MonitoringPopup ? <div className="popup_equipment_back">
            <div className="popup_equipment_back">
              <div className="popup_equipment">
                <div className="title">Add Monitoring</div>
                <input id="monitoringname" type="text" placeholder="Name" />
              <label>Image</label>
              <select id="monitoringimg">
              <option value={true}>True</option>
              <option value={false}>False</option>
              </select>
                <button onClick={() => { AddMonitoring() }}>Add</button>
                <button onClick={() => { setMonitoringPopup(false); }}>Cancel</button>
              </div>
            </div>
          </div> : null}

        </TabPanel>
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
            <option>Supervisor</option>
            <option>Operator</option>
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

export default AdminSite;
