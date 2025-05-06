import React, { useEffect, useState } from 'react';
import projectservice from '../services/projectservice';


const ModalPage = ({ onClose }) => {
  const [projectName, setInputValue] = useState('');
  const [projects, setProjects] = useState([]);

  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCreate = () => {
    if (projectName === null || projectName.trim() === '') {
      console.log('Project name cannot be empty');
      return;
    }
  
    console.log('Input value:', projectName);
  
    const projectData = {
      projectName: projectName
    };
  
    projectservice.createProject(projectData)
      .then(response => {
        const createdProject = {
          projectName: response.data.projectName,
        
        };
        setProjects([...projects,createdProject]);
        onClose();
      })
      .catch(error => {
        console.log("Error creating project:", error);
      });
  };

  const handleCancel = () => {
    // Close the modal
    onClose();
  };

  const handleClose = () => {
    // Close the modal
    onClose();
  };



  useEffect(() => {
    projectservice.getProjects() 
      .then(response => {
        console.log('Retrieved projects:', response.data);
        setProjects(response.data);
        console.log('Success');
      })
      .catch(error => {
        console.log('Error:>>>>>>>>>>>>>>>>>>>>>>>>>', error);
      });
  }, []);
  
  return (
    <div className="modal">
      <div className='modalcontainer'>
        <button onClick={handleClose} className='modalclose'>
          <span>&times;</span>
        </button>
        <h2 className='modalpage'>Create New Project</h2>
        <hr />
        <input
           type="text"
           value={projectName}
           onChange={handleInputChange}
           className='modalinput'
            placeholder='Enter project name'
        />
        <button onClick={handleCreate} className='modalbuttoncreate'>Create</button>
        <button onClick={handleCancel} className='modalbuttoncancel'>Cancel</button>
      </div>
    </div>
  );
};

export default ModalPage;
