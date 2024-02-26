import React, { useState } from 'react';
import toast from 'react-hot-toast';


import { axiosMethods } from '../utils/useAxiosMethos';
import { MenuItem, styled, Select, TextField, Button } from '@mui/material';

const Wapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: "center",
  padding: '2px',
  height: "100vh",
  gap: "50px"

}))

const Findbar = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: "center",
  padding: '2px',
  gap: "30px"

}))

const FilterColumnDiv = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: "center",
  padding: '2px',
  gap: '20px'

}))

const FilterDiv = styled('div')(() => ({
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'space-between',
  alignItems: "flex-end",
  padding: '2px',
  gap: '10px'

}))

const SubmitButtonDIv = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  alignItems: "end",
  padding: '2px',
  gap: '20px'

}))

function PostData({ columns }) {



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
    <Wapper>
      <Findbar>
        <Select value="User ID">
          <MenuItem value='User ID'>User ID</MenuItem>
        </Select>
        <TextField label='Enter user ID' onChange={e => setFilterValue(e.target.value)} />
      </Findbar>
      <form onSubmit={handleSubmit}>
        <FilterDiv>
          {inputFields.map((inputField, index) => (
            <FilterColumnDiv key={index}>
              <TextField
                label='Enter the Value'
                onChange={event => handleChangeInput(index, event)}
              />
              <Select value={inputField.key} onChange={event => handleChangeKey(index, event)} style={{ width: '200px' }}>
                {columns && Object.keys(columns).map((key, index) => (
                  <MenuItem value={key} key={index}>{key}</MenuItem>
                ))}

              </Select>
              <Button variant='outlined' onClick={() => handleRemoveFields(index)}>Remove</Button>
            </FilterColumnDiv>
          ))}
          <SubmitButtonDIv>
            <Button variant='outlined' onClick={handleAddFields}>Add More</Button>
            <Button variant='outlined' type="submit" >Submit</Button>
          </SubmitButtonDIv>
        </FilterDiv>
      </form>
    </Wapper>
  );


}

export default PostData