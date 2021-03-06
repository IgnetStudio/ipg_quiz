// packages

import React, { useState } from 'react';

// UI-Material components

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// code

export const MaterialSelect = () => {
  const [currentValue, setValue] = useState('default');
  const changeHandler = (event) => {
    const value: string = event.target.value;
    setValue(value);
  };

  return (
    <div className="quiz-select mobile-off">
      <FormControl fullWidth>
        <Select value={currentValue} onChange={changeHandler}>
          <MenuItem hidden value={'default'}>
            Select...
          </MenuItem>
          <MenuItem value={'file'}>File</MenuItem>
          <MenuItem value={'settings'}>Settings</MenuItem>
          <MenuItem value={'help'}>Help</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
