import React, { useState, useEffect } from 'react';
import config from './config';

const ViewCourt = () => {
  const [dataArray, setDataArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access');
        // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NTI0NTY1LCJpYXQiOjE3MDEzNDA1NjUsImp0aSI6IjA3OWQ2YmY4NjE5MjQ5OGM5NDI4YmQwMzZjMjllODk0IiwidXNlcl9pZCI6MX0._184KouM6L7OeRIb4pCkH_mdcyekIQx0NSgwtQ7gqQ4";

        const response = await fetch(`${config.url}/lawsphere-api/v1/admin_settings/case/`, {
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
                <th className='thead-dark'>Court</th>
                <th className='thead-dark'>Title</th>
                <th className='thead-dark'>Description</th>
                <th className='thead-dark'>Accused</th>
                <th className='thead-dark'>Victim</th>
                <th className='thead-dark'>Previous Hearing</th>
                <th className='thead-dark'>Next Hearing Date</th>
                <th className='thead-dark'>Next Hearing Time</th>
                <th className='thead-dark'>Employee Incharge</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.court_data.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.accused_data.first_name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.victim_data.first_name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.previous_hearing_date}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.next_hearing_date}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.next_hearing_time}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.employee_data.first_name} {item.employee_data.last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewCourt;
