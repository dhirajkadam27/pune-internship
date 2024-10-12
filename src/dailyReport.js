import React, { useEffect, useState } from 'react';
import './dailyReport.css';
import { useLocation } from 'react-router-dom';
import Header from './header.png';
import Chart from "react-apexcharts";


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
  const [totalBill, setTotalBill] = useState(0);



  useEffect(() => {

    const FetchSiteGeneralData = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL + 'fetch/client/SiteGeneralData.php?siteid=' + siteId);
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
          if (i === jsonData.length - 1) {
            setNextname(jsonData[0].employeename);
          } else {
            setNextname(jsonData[i + 1].employeename);
          }
        }
      }

    };
    FetchSiteShiftData();

    const FetchSiteShiftDataById = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL + 'fetch/client/SiteShiftById.php?shiftid=' + shiftid + '&date=' + reportdate);
      const jsonData = await response.json();
      if (jsonData.error) {
        alert("Something went Wrong");
      }
      setShiftDataById(jsonData);
    };
    FetchSiteShiftDataById();

    const FetchSiteUserById = async () => {
      const response = await fetch(process.env.REACT_APP_BASE_URL + 'fetch/client/SiteUserById.php?userid=' + userid);
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


  }, [siteId, shiftid, reportdate, userid])



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


  
  function calculateEmployeeBill(start, end, cost) {
    // Define the variables

    // Define the start and end time
    const startTime = new Date(start);
    const endTime = new Date(end);

    // Calculate the duration in hours
    const durationInMs = endTime - startTime; // Duration in milliseconds
    const durationInHours = durationInMs / (1000 * 60 * 60); // Convert milliseconds to hours

    // Calculate total energy consumed in kWh
    const totalBill = cost * durationInHours; // in kWh

    // Output the total bill
    return totalBill;

  }


  function calculateBill(start, end, unit, power) {
    // Define the variables
    const powerInKw = power; // Power of the machine in kW
    const pricePerUnit = unit; // Price per unit in ₹

    // Define the start and end time
    const startTime = new Date(start);
    const endTime = new Date(end);

    // Calculate the duration in hours
    const durationInMs = endTime - startTime; // Duration in milliseconds
    const durationInHours = durationInMs / (1000 * 60 * 60); // Convert milliseconds to hours

    // Calculate total energy consumed in kWh
    const energyConsumed = powerInKw * durationInHours; // in kWh

    // Calculate the bill
    const totalBill = energyConsumed * pricePerUnit; // in ₹

    // Output the total bill
    return totalBill;

  }

  function calculateTotalPrice(quantityStr, priceStr, conversionFactor = 1) {
    // Extract numeric value and unit from quantity string (e.g., "10kg")
    const quantity = parseFloat(quantityStr);
    
    if(quantityStr){
      const quantityUnit = quantityStr.replace(/[0-9.]/g, '').trim().toLowerCase();
  

    // Extract numeric value and unit from price string (e.g., "₹20/L")
    const pricePerUnit = parseFloat(priceStr.replace(/[₹]/g, '').trim());
    const priceUnit = priceStr.replace(/[0-9₹./]/g, '').trim().toLowerCase();

    // Convert quantity if the units are different
    let convertedQuantity = quantity;
    if (quantityUnit !== priceUnit) {
      if (quantityUnit === 'kg' && priceUnit === 'l') {
        convertedQuantity = quantity * conversionFactor;  // kg to liters
      } else if (quantityUnit === 'l' && priceUnit === 'kg') {
        convertedQuantity = quantity / conversionFactor;  // liters to kg
      } else {
        return 'Invalid units. Please use "kg" or "l".';
      }
    }

    // Calculate total price
    const totalPrice = convertedQuantity * pricePerUnit;

    

    // setTotalBill(totalPrice);

    return totalPrice;
  }
  }


  useEffect(() => {
    // Get all divs with className "cal"

    setTimeout(() => {
      const divs = document.querySelectorAll(".cal");

      // Calculate the total of the numeric content in each div
      let sum = 0;
      divs.forEach((div) => {
        const text = div.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ""), 10);
        console.log("asa", text);
        if (!isNaN(number)) {
          sum += number;
        }
      });


      setTotalBill(sum); // Set the total
    }, 1000);

  }, []);


  // useEffect(() => {
  //   // Select all div elements with the class 'cal'
  //   const divs = document.querySelectorAll(".cal");

  //   // Extract the inner text, convert to numbers, and sum them up
  //   const totalSum = Array.from(divs).reduce((acc, div) => {
  //     const num = parseFloat(div.innerText); // Convert innerText to number
  //     return acc + (isNaN(num) ? 0 : num); // Add only if it's a number
  //   }, 0);

  //   setTotalBill(totalSum); // Set the calculated total in the state
  // }, []);


  const data = {
    options: {
      chart: {
        id: "basic-bar"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%', // Adjust this value to reduce/increase bar width
          endingShape: 'rounded',
          dataLabels: {
            position: 'top', // Position data labels above the bars
          },
        },
      },
      colors: ['#ebbf03', '#00a6ff'],
      xaxis: {
        categories: ['Standard', 'Calculated']
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `₹${val}`; // Adding the Rupee sign before the value
        },
      },

      annotations: {
        yaxis: [
          {
            y: GeneralData ? GeneralData.standart : 0, // Set the y-value dynamically based on your data
            borderColor: (GeneralData? GeneralData.standart:0) > (totalBill? totalBill / 1000:0) ? '#ffa500' :  '#FF4560', // Color of the limit line
            label: {
              borderColor: (GeneralData? GeneralData.standart:0) > (totalBill? totalBill / 1000:0) ? '#ffa500' :  '#FF4560',
              style: {
                color: '#fff',
                background: (GeneralData? GeneralData.standart:0) > (totalBill? totalBill / 1000:0) ? '#ffa500' :  '#FF4560',
              },
              text: 'BenchMark', // Label text for the limit line
            },
          },
        ],
      },

    },
    series: [
      {
        name: "Water Treated Cost Per Liter",
        data: [
          { x: 'Standard', y: GeneralData? GeneralData.standart:0, fillColor: '#008FFB' }, // Red color for Category 1
          { x: 'Calculated', y: totalBill? totalBill / 1000:0, fillColor: (GeneralData? GeneralData.standart:0) > (totalBill? totalBill / 1000:0) ? '#ffa500' :  '#FF4560'}, // Blue color for Category 2
        ],
      }
    ],
  };


  return (
    <div className="report-container">

      <img alt='img' width="100%" src={Header} />
      <p><span><strong>Site Name:</strong> {GeneralData ? GeneralData.sitename : null} </span> <span><strong>Address:</strong> {GeneralData ? GeneralData.address : null}</span> <span><strong>Contact:</strong> {GeneralData ? GeneralData.contact : null}</span></p>
      <p><span><strong>Operator Name:</strong>{ShiftDataById ? ShiftDataById.employeename : null} </span> <span><strong>Supervisor Name:</strong> {supervisor}</span> <span><strong>Shift:</strong> {ShiftDataById ? ShiftDataById.shifttype : null}</span></p>
      <p><span><strong>Date:</strong> {reportdate}</span></p>
      {totalBill}
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
            <th>Time</th>
            <th>Price</th>
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
                    <td>{equipment.start} - {equipment.end}</td>
                    <td>₹<span className="cal">{calculateBill(equipment.start, equipment.end, equipment.rupees, equipment.power)}</span></td>
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
            <th>Price</th>
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
                  <td>₹<span className="cal">{calculateTotalPrice(chemical.quantity + chemical.quantitytype, chemical.rupee + chemical.type, 1)}</span></td>
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
                    <td>{parameter.level ? parameter.level + "L" : "Not Filled"}</td>
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

      <h2>ManPower</h2>
      <table>
        <thead>
          <tr>
            <th>Operator Name</th>
            <th>Worked Time</th>
            <th>Payment/ Hour</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ShiftDataById ? ShiftDataById.employeename : null}</td>
            <td>{ShiftDataById ? ShiftDataById.startingtime : null} - {ShiftDataById ? ShiftDataById.endingtime : null}</td>
            <td>₹{ShiftDataById ? ShiftDataById.cost : null}</td>
            <td>₹<span className="cal">{calculateEmployeeBill(ShiftDataById.startingtime, ShiftDataById.endingtime, ShiftDataById.cost)}</span></td>
          </tr>
        </tbody>
      </table>


      <div className='imgbox'>


        {MonitoringData.length > 0 ? (
          <>
            {MonitoringData.map((data) => (
              <>
                {data.img === "true" ? <div className='box'>
                  <div className='boxtitle'>{data.monitoringname}</div>
                  <img src={`data:image/jpg;charset=utf8;base64,${data.imgdata}`} alt='img' />
                </div> : null}
              </>




            ))}
          </>
        ) : null}


      </div>


      <img style={{ "width": "100px", "marginTop": "50px" }} src={UserData ? "data:image/jpg;charset=utf8;base64," + UserData.sign : null} alt='sign' />
      <p><strong>Supervisor's Signature</strong></p>


      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        width="500"
      />

      <button onClick={(e) => { e.currentTarget.style.display = 'none'; window.print() }} id='print'>Print</button>
    </div>
  );
}

export default DailyReport;
