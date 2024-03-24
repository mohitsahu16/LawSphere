import React, { useState, useEffect } from 'react';
import config from './config';

const ViewEmployee = () => {
  const [dataArray, setDataArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access');
        // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NTI0NTY1LCJpYXQiOjE3MDEzNDA1NjUsImp0aSI6IjA3OWQ2YmY4NjE5MjQ5OGM5NDI4YmQwMzZjMjllODk0IiwidXNlcl9pZCI6MX0._184KouM6L7OeRIb4pCkH_mdcyekIQx0NSgwtQ7gqQ4";

        const response = await fetch(`${config.url}/lawsphere-api/v1/admin_settings/employee/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setDataArray(data.results);
        setFilteredData(data.results); // Initialize filteredData with all data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div style={{ margin: '20px' }}>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div className='container' style={{ padding: '20px' }}>
          {/* {console.log(filteredData)} */}
          <table className="table table-striped table-bordered table-sm" style={{ margin: '10px', padding: '10px' }}>
            <thead>
              <tr>
                <th className='thead-dark'>S.No</th>
                <th className='thead-dark'>Employee code</th>
                <th className='thead-dark'>Name</th>
                <th className='thead-dark'>Email</th>
                <th className='thead-dark'>Mobile</th>
                <th className='thead-dark'>Department</th>
                <th className='thead-dark'>Designation</th>
                <th className='thead-dark'>Court Name</th>
                <th className='thead-dark'>Primary</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.emp_code}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.user_data?.email}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.mobile}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.department_data?.value}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.designation_data?.value}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.court_data?.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.is_primary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewEmployee;
