import React, { useEffect, useState } from 'react';
import SideBar from '../Components/SideBar';
import Box from '@mui/material/Box';
import NavBar from '../Components/NavBar';
import { Link } from 'react-router-dom';
import { BiTrash, BiEdit } from "react-icons/bi";
import Userservice from '../services/userservice';
import '../App.css';

function Team({ handleEdit, handleDelete }) {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const slicedEmployees = employees.slice(firstIndex, lastIndex);
  const npage = Math.ceil(employees.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [openDropdown, setOpenDropdown] = useState({});
  


  useEffect(() => {
    Userservice.getUsers()
      .then(response => {
        setEmployees(response.data);
        console.log(">>>>>>>>>>>>>>>success");
      })
      .catch(error => {
        console.log(">>>>>>>>>>>>>>>>>>>>not");
        throw error;
      });
  }, []);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
  };
  

  const filteredEmployees = employees.filter((employee) =>
  (employee.firstName && employee.firstName.toLowerCase().includes(searchText)) ||
  (employee.lastName && employee.lastName.toLowerCase().includes(searchText))
);



  const columns = [
    {
      name: 'UserName',
      selector: 'username',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Contact',
      selector: 'contact',
      sortable: false,
    },
    {
      name: 'Action',
      selector: 'action',
      sortable: false,
    },
  ];

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '-30px' }}>
          <h1 className='TeamMembers'>Team Members</h1>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'left' }}>
            <input
              type="text"
              placeholder="Search by name"
              value={searchText}
              onChange={handleSearch}
              style={{
                padding: '0.5rem',
                border: '3px solid dodgerblue',
                borderRadius: '6px',
                marginRight: '1rem',
                width: '200px',
                boxShadow: 'none',
                outline: 'none',
                fontSize: '1rem',
                boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <Link to="/AddEmployee">
              <button
                className='Team-Button'
                style={{
                  padding: '0.5rem 1rem',
                  background: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Add New Member
              </button>
            </Link>
          </div>
          <Box
            sx={{
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              p: 2,
              borderRadius: '6px',
              border: '2px solid aliceblue',
              borderRadius: '4px',
              backgroundClip: 'border-box',
              zIndex: '1000',
              transition: 'width .3s ease,transform .3s ease',
              fontfamily: 'Arial, sans-serif',
              color: '#697A8D',
            }}
          >
            <table className='teamtable'>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.Id}>
                    <td>{employee.userName}</td>
                    <td>{employee.firstName} {employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
              <td>
              <div className="dropdown">
  
   
      
             <button
               className="dropdown-itemedit"
               onClick={() => handleEdit(employee.Id)}
             >
               Edit <BiEdit />
             </button>

             <button
               className="dropdown-itemdel"
               onClick={() => handleDelete(employee.Id)}
             >
               Delete <BiTrash />
             </button>
       
      
    
              </div>
            </td>

                  </tr>
                ))}
              </tbody>
            </table>
            <nav>
              <ul className='pagination'>
                <li className='page-item'>
                  <a href='#' className='page-link' onClick={prePage}>Prev</a>
                </li>
                {numbers.map((n, j) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={j}>
                    <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                  </li>
                ))}
                <li className='page-item'>
                  <a href='#' className='page-link' onClick={nextPage}>Next</a>
                </li>
              </ul>
            </nav>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Team;
