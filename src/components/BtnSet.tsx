import React from 'react';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export const BtnCta = () => {
  return (
    <Button disableRipple className="btn-cta" variant="contained">
      <span>Play</span>
      <PlayArrowIcon className="quiz-play" />
    </Button>
  );
};

export const BtnSide = () => {
  return (
    <Button className="btn-side" variant="outlined">
      <span>Side button</span>
    </Button>
  );
};