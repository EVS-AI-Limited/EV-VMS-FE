import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SideBar from '../Components/SideBar';
import Box from '@mui/material/Box';
import NavBar from '../Components/NavBar';
import '../App.css'; // Import the CSS file for styling
import MyCalendarService from '../services/manual-timesheet-service';



function Calendar() {
  const [employees, setEmployees] = useState([]);



  useEffect(() => {
    MyCalendarService.getManualSheet()
      .then(response => {
        setEmployees(response.data);
        console.log(">>>>>>>>>>>>>>>success");
      })
      .catch(error => {
        console.log(">>>>>>>>>>>>>>>>>>>>not");
        throw error;
      });
  }, []);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  
  

  
  return (
    <>
      <NavBar />
      <Box height={80} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Replace the button with a Link */}
          <Link to="/ManualTimeSheet">
            <button className='Maunal-TmeSheet-btn'>Fill Your Time-Sheet</button>
          </Link>

          <div className='Calendar-Table'>
            <table>
              <thead>
                <tr>
                  
                  <th>Created At</th>
                  <th>Date</th>
                  <th>Description</th>           
                  <th>Total Time (in hrs) </th>
                  <th>Project Name</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.Id}>
                    <td>{formatDate(employee.date)}</td>
                    <td>{employee.date1}</td>
                    <td>{employee.description}</td>
                    <td>{employee.duration}</td>
                    <td>{employee.projectName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Calendar;
