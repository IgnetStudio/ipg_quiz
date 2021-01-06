// packages

import React from 'react';

// UI-Terminal components

import { Button } from 'nes-react';
import { ReactComponent as TerminalPlay } from '../../styles/img/terminal-play.svg';

// code

export const TerminalBtnStart = () => {
  return (
    <>
      <Button success>
        Play
        <TerminalPlay className="quiz-play terminal-icon" />
      </Button>
    </>
  );
};

export const TerminalBtnCta = () => {
  return (
    <>
      <Button success>
        Relay
        <TerminalPlay className="quiz-play terminal-icon" />
      </Button>
    </>
  );
};

export const TerminalBtnSide = () => {
  return (
    <>
      <Button error>Side Button</Button>
    </>
  );
};
