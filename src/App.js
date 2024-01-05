import React, { useState, useMemo } from 'react';
import Header from './Comp/header';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import './App.css';
import { Stack } from '@mui/material';
import Fields from './Comp/fields';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return data.filter((element) =>
      element.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const addData = () => {
    
    
    
  if (!name || !email) {
      alert('Please fill in both Name and Email fields.');
      return;
    }
    else if(!name)
    {
      alert('Please fill in the Name field.');
      return;
    }
    else if(!email)
    {
      alert('Please fill in the Email field.');
      return;
    }
    setData([...data, { name: name, email: email }]);
    setName('');
    setEmail('');
  };

  const handleDelete = (indexToDelete) => {
    const newData = data.filter((_, index) => index !== indexToDelete);
    setData(newData);
  };

  // const handleSearch = () => {
  //   // Logic to update filtered data based on search query
  //   if (searchQuery.trim() !== '') {
  //     const searchData = data.filter((element) =>
  //       element.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setData(searchData);
  //   } else {
  //     // If the search query is empty, display all data
  //     setData(data);
  //   }
  // };
  
  return (
    <div className='App'>
      <Header />
      <div className='form'>
        <Stack direction='row' spacing={6}>
          <TextField
            value={name}
            onChange={(event) => setName(event.target.value)}
            id='outlined-multiline-flexible'
            label='Name'
            required
          />

          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id='outlined-multiline-flexible'
            label='Email'
            required
          />

          <Button variant='contained' color='success' onClick={addData}>
            <AddIcon />
          </Button>
        </Stack>
      </div>
      <div className='form'>
        <Paper
          component='form'
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Search by Name'
            inputProps={{ 'aria-label': 'search data with name' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton
            type='button'
            sx={{ p: '10px' }}
            aria-label='search'
           
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      {/* data show */}
      <div className='data'>
        <div className='data_val'>
          <h4>I'd</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Remove</h4>
        </div>

        {searchQuery
          ? filteredData.map((element, index) => (
              <Fields
                key={index}
                name={element.name}
                email={element.email}
                index={index}
                onDelete={handleDelete} // Pass onDelete function
              />
            ))
          : data.map((element, index) => (
              <Fields
                key={index}
                name={element.name}
                email={element.email}
                index={index}
                onDelete={handleDelete} // Pass onDelete function
              />
            ))}
      </div>
    </div>
  );
}

export default App;
