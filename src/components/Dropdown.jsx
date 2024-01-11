import axios from "axios";
import React, { useEffect, useState } from "react";


function Dropdown() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [filter, setFilter] = useState([]);


  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/berry-firmness/')
      .then(response => {
        const data = response.data.results;
        console.log(data);
        setData(data);
        setFilter(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedData(selectedValue);

  
    const sort = [...filter].sort((a, b) => a.name.localeCompare(b.name));
    setFilter(sort);
  };
  
  return (
    <>
      <section className="h-full max-h-full min-h-full sm:py-20 lg:py-20">
        <div className="px-6 mx-auto rounded-lg sm:px-20 lg:px-20">
          <div className="flex items-center justify-center">
            <h1 className="mt-3 text-2xl font-semibold text-gray-900">
             Tes Dropdown
            </h1>
          </div>
          <div className="max-w-2xl mx-auto mt-8 rounded-lg md:mt-12">
            <div className="bg-gray-200 rounded-lg shadow-lg">
              <div className="justify-center px-4 py-6 sm:px-8 sm:py-10">
              <select className="w-full max-w-xs select select-bordered" onChange={handleSelectChange} value={selectedData || ''}>
              <option selected>Select</option>
              {data.map(item => (
          <option key={item.name} value={item.name}>{item.name}</option>
        ))}
            </select>

            <h2 className="mt-3">Output:</h2>
          <ul>
         
            {filter.map(item => (
              <li key={item.name} style={{ display: item.name === selectedData ? 'block' : 'none' }}>
                {item.name} <br/>
                {item.url}
                </li>
            ))}
          </ul>
              </div>

              
            </div>
          </div>
         
        </div>
      </section>
    </>
  );
}

export default Dropdown;
