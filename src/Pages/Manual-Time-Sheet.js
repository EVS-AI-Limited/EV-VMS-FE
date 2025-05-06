import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import Box from '@mui/material/Box';
import NavBar from '../Components/NavBar';
import axios from 'axios';
import authHeader from '../services/authHeader';
import MyCalendarService from '../services/manual-timesheet-service';



function MyCalendar() {
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [projects, setProjects] = useState([]);
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitted!');
    console.log('Project ID:', projectName);
    console.log('Project ID:', projectId);
    console.log('Description:', description);
    console.log('Time:', time);
    console.log('Date:', date);

    try {
      await MyCalendarService.submitTimeSheet(
        projectName,
        projectId,
        description,
        time,
        date
      );
      console.log('Timesheet submitted successfully!');
      // Reset the form
      setProjectId('');
      setProjectName('')
      setDescription('');
      setTime('');
      setDate('');

      // Open the calendar page
      window.location.href = '/calendar';
    } catch (error) {
      console.error('Error submitting timesheet:', error);
      // Handle the error (e.g., display an error message)
    }
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8081/projects', { headers: authHeader() });
        setProjects(response.data);
        console.log('Success fetching projects:', response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the project box
      if (
        event.target.closest('.project-box') === null &&
        event.target.closest('.project-button') === null
      ) {
        setIsBoxOpen(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  

  const handleProjectButtonClick = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  const handleProjectSelect = (e) => {
    const selectedProject = projects.find((project) => project.projectName === e.target.value);
  
    if (selectedProject) {
      setProjectName(selectedProject.projectName);
      setProjectId(selectedProject.projectId);
    }
  };
  
   



  
  
  return (
    <>
      <NavBar />
      <Box height={80} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1 style={{ marginTop: '-30px' }}>Manual TimeSheet</h1>

          <Box
            sx={{
              backgroundColor: '#ffffff',
              boxShadow: '2px 4px 8px 4px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              borderRadius: '8px',
              height: '69%',
              width: '23%',
              marginLeft: '250px',
              position: 'fixed'
            }}
          >
           {/* <form className='Manual-form' onSubmit={handleSubmit}> */}
           <form className='Manual-form' onSubmit={handleSubmit}>
           <select className='project-dropdown' value={projectName} onChange={handleProjectSelect}>
                  <option>Select Project</option>
                  {projects.map((project) => (
                   <option key={project.projectId} value={project.projectName}>
                   {project.projectName} (ID: {project.projectId})
                 </option>
 
                  ))}
                </select>


  {isBoxOpen && (
      <Box
        sx={{
          width: '400px',
          maxHeight: '250px', // Set a max height for scrolling
          border: '2px solid aliceblue',
          borderRadius: '4px',
          padding: '8px',
          backgroundClip: 'border-box',
          position: 'fixed',
          bottom: ' 270px',
          left: '387',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          overflowY: 'auto', // Enable scrolling
          top: '143px',
        }}
      >
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.projectId} onClick={() => handleProjectSelect(project)}>
              {project.projectName} (ID: {project.projectId})
            </li>
          ))}
        </ul>
      </Box>
              )}
              

              <br />
              <div>
                <label>
                  Description:<br />
                  <input
                    className='Manual-input'
                    type="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div>
                <label>
                  Time:<br />
                  <input
                    className='Manual-input'
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}                
                  />
                </label>
              </div>
              <br />
              <div>
                <label>
                  Date: <br />
                  <input
                    className='Manual-input'
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div>
                <button type="submit" className='Maual-Submit-Button'>Submit</button>
              </div>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MyCalendar;
