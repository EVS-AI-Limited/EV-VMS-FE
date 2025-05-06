import React, { useState } from 'react';import SideBar from '../Components/SideBar';
import NavBar from '../Components/NavBar';
import Box from '@mui/material/Box';
import Table from 'react-bootstrap/Table';
import '../App.css'; // Import the CSS file for styling
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TimeSheet() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <NavBar />
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Time Sheet</h1>
          <div className="timesheetdatepicker">
          <DatePicker 
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    placeholderText='Tis Week...'
                  /></div>
                  <div className='timesheettable'>
          <Table striped className="custom-table">
            <thead>
              <tr>
                <th>Projects</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thrusday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
        

            <tr>
              <td>
                <button className='timesheetselectbtn'>select project</button>
              </td>
              <td><input type="text" className="small-input" /></td>
              <td><input type="text" className="small-input" /></td>
              <td><input type="text" className="small-input" /></td>
              <td><input type="text" className="small-input" /></td>
              <td><input type="text" className="small-input" /></td>
              <td><input type="text" className="small-input" /></td>
              <td><input type="text" className="small-input" /></td>
              <td>00:00:00</td>
            </tr>



              <tr>
                <td>Total</td>
                <td>00:00:00</td>
                <td>00:00:00</td>
                <td>00:00:00</td>
                <td>00:00:00</td>
                <td>00:00:00</td>
                <td>00:00:00</td>
                <td>00:00:00</td>
                <td>00:00:00</td>
              </tr>
            </tbody>
                <button className='newrowbtn'>Add new row</button>
            </Table>
            </div>
        </Box>
      </Box>
      
    </>
  );
}

export default TimeSheet;
