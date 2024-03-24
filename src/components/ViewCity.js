import React, { useState, useEffect } from 'react';
import config from './config';

const ViewCity = () => {
  const [dataArray, setDataArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.url}/lawsphere-api/v1/admin_settings/city/`);
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
        <>
        {/* <h2>List of Cities</h2> */}
        <div className='container' style={{ padding: '20px', maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden' }}>
          <table className="table table-striped table-bordered table-sm" style={{ margin: '10px', padding: '10px' }}>
            <thead>
              <tr>
                <th className='thead-dark'>S.No</th>
                <th className='thead-dark'>City Name</th>
                <th className='thead-dark'>State Name</th>
                <th className='thead-dark'>Country Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.state_data?.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.state_data?.country_data?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
      )}
    </div>
  );
};

export default ViewCity;
