import React, { useState } from 'react';
import toast from 'react-hot-toast';


import { axiosMethods } from '../utils/useAxiosMethos';

function PostData({ columns }) {

  const options = columns.data

  const [filterValue, setFilterValue] = useState(0)



  const [inputFields, setInputFields] = useState([{ key: '', value: '' }]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ key: '', value: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  const handleChangeKey = (index, event) => {
    const values = [...inputFields];
    values[index].key = event.target.value;
    setInputFields(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateValues = {}
    inputFields.forEach(item => {
      updateValues[item.key] = item.value

    })
    const reqdata = {
      "value": updateValues,
      "filterValue": {
        "User ID": filterValue
      }
    }
    const respons = await axiosMethods("http://127.0.0.1:8000/crud", "put", reqdata)

    if (respons.request.status == 200) {
      toast.success(respons.data.message)
    } else {
      toast.error("unable to update")
    }
    setFilterValue('')
    setInputFields([{ key: '', value: '' }])

  };

  return (
    <>
      <div>
        <select>
          <option value='User ID'>User ID</option>
        </select>
        <input
          type="text"
          placeholder="Enter user ID"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Enter value"
              value={inputField.value}
              onChange={event => handleChangeInput(index, event)}
            />
            <select value={inputField.key} onChange={event => handleChangeKey(index, event)}>
              {options && options.map((value, index) => (<option value={value} key={index}>{value}</option>))}

            </select>
            <button type="button" onClick={() => handleRemoveFields(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddFields}>Add More</button>
        <button type="submit">Submit</button>
      </form>
    </>
  );


}

export default PostData