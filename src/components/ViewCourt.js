import React, { useState, useEffect } from 'react';
import config from './config';

const ViewCourt = () => {
  const [dataArray, setDataArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const accessToken = localStorage.getItem('accessToken');
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NTI2MjA2LCJpYXQiOjE3MDEzNDIyMDYsImp0aSI6ImNjODg4NzE5YTg0MzRlYTZhOTg4Yjg5NTM5ODRjMTk1IiwidXNlcl9pZCI6MjJ9.GreZU0i_JMmG1x3gRGVpWjF4rJ7RxRZJlw6A4-mvwwQ";

        const response = await fetch(`${config.url}/lawsphere-api/v1/admin_settings/court/`, {
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
                <th className='thead-dark'>Name</th>
                <th className='thead-dark'>Email</th>
                <th className='thead-dark'>Mobile</th>
                <th className='thead-dark'>Address</th>
                <th className='thead-dark'>City</th>
                <th className='thead-dark'>State</th>
                <th className='thead-dark'>Country</th>
                <th className='thead-dark'>Category</th>
                <th className='thead-dark'>Manager Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.email}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.mobile}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.address}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.city_data.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.state_data.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.country_data.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.category_data.value}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.manager_data.first_name} {item.manager_data.last_name}</td>
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
