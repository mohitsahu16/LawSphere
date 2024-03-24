import React, { useState, useEffect } from 'react';
import config from './config';

const ViewCountry = () => {
  const [dataArray, setDataArray] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.url}/lawsphere-api/v1/admin_settings/country/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDataArray(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div className='container'>
          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th className='.thead-dark'>S.No</th>
                <th className='.thead-dark'>Country Name</th>
                <th className='.thead-dark'>Country Code</th>
              </tr>
            </thead>
            <tbody>
              {dataArray.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</td>
                  <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.country_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewCountry;
