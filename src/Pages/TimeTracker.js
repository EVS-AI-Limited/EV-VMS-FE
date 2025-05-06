import React, { useState, useEffect } from 'react';
import SideBar from '../Components/SideBar';
import Box from '@mui/material/Box';
import NavBar from '../Components/NavBar';
import ModalPage from './CreateNewProject';
import axios from 'axios';
import authHeader from '../services/authHeader';
import timeTrackerservice from '../services/time-trackerservice';

function TimeTracker() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [buttonColor, setButtonColor] = useState('dodgerblue');
  const [projects, setProjects] = useState([]);
  const [rowData, setRowData] = useState([]);

  const [taskTitle, setTaskTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [status, setStatus] = useState('');
  const [stopTime, setStopTime] = useState('');

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

    if (isBoxOpen) {
      fetchProjects();
    }
  }, [isBoxOpen]);

  const TimeTrackerData = {
    taskTitle,
    duration,
    projectId,
    projectName,
    startTime,
    status,
    stopTime
  };

  useEffect(() => {
    timeTrackerservice.addProject(TimeTrackerData)
      .then(response => {
        setProjects(response.data);
        console.log("Success");
      })
      .catch(error => {
        console.log("Error:", error);
        throw error;
      });
  }, []);

  const handleProjectButtonClick = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  const handleClickOutside = (event) => {
    // Check if the clicked element is outside the project box
    if (
      event.target.closest('.project-box') === null &&
      event.target.closest('.project-button') === null
    ) {
      setIsBoxOpen(false);
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleProjectSelect = (projectName) => {
    // Update the project input field with the selected project name
    const projectInput = document.querySelector('.projectinput');
    if (projectInput) {
      projectInput.value = projectName;
    }

    // Update the selected project name in the project-button
    const projectButton = document.querySelector('.project-button');
    if (projectButton) {
      projectButton.textContent = projectName;
    }

    

    // Close the project box
    setIsBoxOpen(false);
  };

  const handleStartStopTimer = () => {
    if (timerActive) {
      // Stop the timer
      clearInterval(timerInterval);
      setTimerActive(false);
      setTimerInterval(null); // Reset timerInterval
      setButtonColor('dodgerblue'); // Change button color back to blue

      // Add a new row to the table
      const newRow = {
        time: formatTime(time), // Format the time
        projectName: document.querySelector('.project-button').textContent // Get the selected project name
      };
      setRowData(prevData => [...prevData, newRow]);
    } else {
      // Start the timer
      const startTime = Date.now() - time; // Resume from the previous time if available
      setTimerActive(true);
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        setTime(elapsedTime);
      }, 1000);
      setTimerInterval(interval); // Store the interval reference in timerInterval
      setButtonColor('red'); // Change button color to red
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('click', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NavBar />
      <Box height={25} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              width: '1160px',
              height: '55px',
              border: '2px solid aliceblue',
              borderRadius: '4px',
              padding: '8px',
              backgroundClip: 'border-box',
              transform: 'translateY(70px)',
              transition: 'width .3s ease,transform .3s ease',
              position: 'fixed',
              zIndex: '1000',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              marginLeft: '-50px',
            }}
          >
            <input type="text" className='workinput' placeholder='What are you working on ?' />
            <button className='project-button' onClick={handleProjectButtonClick}>
              Project
            </button>
            <div>
              <button
                onClick={handleStartStopTimer}
                className='Timerbtn'
                style={{ backgroundColor: buttonColor }} // Set button color dynamically
              >
                {timerActive ? 'Stop' : 'Start'}
              </button>
            </div>
            <div className='Timer'>{formatTime(time)}</div>
          </Box>
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
                left: '61%',
                transform: 'translateX(-50%)',
                zIndex: '1000',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'white',
                overflowY: 'auto', // Enable scrolling
              }}
              className="project-box" // Add a class for easier selection
            >
              <input type="text" className='projectinput' placeholder='Find Or Select Project...' />

              <ul className="project-list">
                {projects.map((project) => (
                  <li key={project.projectId} onClick={() => handleProjectSelect(project.projectName)}>
                    {project.projectName}
                  </li>
                ))}
              </ul>
              
             <div className='newproject2'> <button className='newproject' onClick={handleModalOpen}>Create new project</button></div>

            </Box>
          )}
          {isModalOpen && <ModalPage onClose={handleModalClose} />}

          <div className='TimeTracker-Table'>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Task Title</th>
                  <th>Duration</th>
                  <th>Project Id</th>           
                  <th>Start Time</th>
                  <th>Status</th>
                  <th>Stop Time</th>
                </tr>
              </thead>
              <tbody>
                {rowData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.projectName}</td>
                    <td>{row.taskTitle}</td>
                    <td>{row.duration}</td>
                    <td>{row.projectId}</td>                  
                    <td>{row.startTime}</td>
                    <td>{row.status}</td>
                    <td>{row.stopTime}</td>
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

export default TimeTracker;
