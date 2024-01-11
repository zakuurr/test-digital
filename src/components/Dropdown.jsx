import axios from "axios";
import React, { useEffect, useState } from "react";
import { Select } from 'antd';

function Dropdown() {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/berry-firmness/')
      .then(response => {
        const data = response.data.results;
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const onChange = (value, option) => {
    console.log(`selected ${value}`);
    setSelectedValue(option);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
                <Select
                  showSearch
                  placeholder="Select data"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={data
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(item => ({ value: item.url, label: item.name }))
                  }
                />
                
                {selectedValue && (
                  <div className="mt-3">
                    <h1>Output</h1>
                    <strong>Name:</strong> {selectedValue.label} <br />
                    <strong>URL:</strong> {selectedValue.value}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dropdown;
