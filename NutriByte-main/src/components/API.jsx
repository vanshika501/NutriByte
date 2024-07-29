import React, { useState, useEffect } from 'react';

function API({inputText}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      var query = 'pasta'
      try {
        const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
          headers: {
            'X-Api-Key': 'vUoq5AUZObTtwVcr9H3ljA==3ctcsriSz64KOM4q'
          }
        }); 
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {data ? (
        <div>
          <p>Data fetched successfully:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default API;
