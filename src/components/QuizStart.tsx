// packages

import React, { useContext, useState } from 'react';

// React Context API

import ThemeContext from '../context/ThemeContext';
import UserContext from '../context/UserContext';

// components

import { SelectSet } from './ui/SelectSet';
import { IconSet } from './ui/IconSet';
import { ReactComponent as Logo } from '../styles/img/cube-lines.svg';
import { LogoCube } from './logo/LogoCube';
import { BtnCta } from './ui/BtnSet';

// UI-Material components

import TextField from '@material-ui/core/TextField';

// UI-Terminal components

import { TextInput } from 'nes-react';

// code

export const QuizStart: React.FC<{ onFormSubmit: () => void }> = ({ onFormSubmit }) => {
  const { isMaterial, isTerminal } = useContext(ThemeContext);
  const { createUser } = useContext(UserContext);
  const [name, setName] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setName(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    createUser(name);
    onFormSubmit();
  };

  return (
    <>
      <div className="quiz-panel">
        <SelectSet />
        <IconSet />
      </div>
      <div className="quiz-start">
        <div className="quiz-logo mobile-off">
          {isMaterial && <LogoCube value="any" index="any" />}
          {isTerminal && <Logo />}
        </div>
        <form className="quiz-form" noValidate onSubmit={submitHandler} autoComplete="off">
          <div className="quiz-input">
            {isMaterial && (
              <TextField
                id="quiz-name"
                label="Enter your name"
                value={name}
                onChange={changeHandler}
                variant="outlined"
              />
            )}
            {isTerminal && (
              <TextInput
                id="quiz-name"
                label="Enter your name"
                value={name}
                readOnly
                // onChange={changeHandler}
              />
            )}
          </div>
          <div className="quiz-btn" onClick={submitHandler}>
            <BtnCta />
          </div>
        </form>
      </div>
    </>
  );
};
