// packages

import React from 'react';

// UI-Material components

import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import VolumeOffTwoToneIcon from '@material-ui/icons/VolumeOffTwoTone';
import VolumeUpTwoToneIcon from '@material-ui/icons/VolumeUpTwoTone';
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';
import StarHalfTwoToneIcon from '@material-ui/icons/StarHalfTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

// code

export const MaterialIcons = () => {
  return (
    <>
      <StarTwoToneIcon fontSize="default" className="quiz-star material-icon desktop-only" />
      <StarBorderTwoToneIcon fontSize="default" className="quiz-star material-icon desktop-only" />
      <StarHalfTwoToneIcon fontSize="default" className="quiz-star material-icon desktop-only" />
      <VolumeOffTwoToneIcon fontSize="default" className="quiz-audio material-icon desktop-only" />
      <VolumeUpTwoToneIcon fontSize="default" className="quiz-audio material-icon desktop-only" />
      <MenuTwoToneIcon fontSize="default" className="quiz-menu material-icon" />
    </>
  );
};
