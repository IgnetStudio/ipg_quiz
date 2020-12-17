// packages

import React, { useContext, useState } from 'react';

// React Context API

import ThemeContext from '../context/ThemeContext';
import PointsContext from '../context/PointsContext';

// custom components

import { QuizStart } from '../components/QuizStart';
import QuizPanel from './QuizPanel';
import QuizDefinition from './QuizDefinition';
import ItemQuestion from './ItemQuestion';
import QuizResult from './QuizResult';

// utils

import { getQuestion } from '../utils/getQuestion';

// code

export const ListQuestion = () => {
  // hooks default
  const [currentScore, setScore] = useState(0);
  const [currentQuestion, setQuestion] = useState(0);
  const [currentStatus, setStatus] = useState(false);
  const objectQuestion = getQuestion[currentQuestion];

  // use React Context API
  const { isTerminal } = useContext(ThemeContext);
  const { setPoints } = useContext(PointsContext);

  // time & question settings
  const [setCurrentTime, setTime] = useState(20);
  const [currentData, setData] = useState({
    setCurrentTime: 20,
    statusTime: 'stop',
    setQuestion: null,
    activeQuestion: '',
  });
  let int;
  const timer = () => {
    let count = currentData.setCurrentTime;
    int = setInterval(() => {
      setTime(count - 1);
      count = count - 1;
      if (count < 1) clearInterval(int);
    }, 1000);
  };

  // hooks update
  const handleQuestion = (correctAnswer: boolean) => {
    setTime(20);
    clearInterval(int);
    if (correctAnswer) {
      setScore(currentScore + 1);
      setPoints(setCurrentTime * 5);
    } else {
      setPoints(-1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < getQuestion.length) {
      setQuestion(nextQuestion);
    } else {
      setStatus(true);
    }
    setTime(20);
  };

  const onHandleSubmit = () => {
    setData({ ...currentData, activeQuestion: 'q1' });
    timer();
  };

  return (
    <>
      {currentStatus ? (
        <>
          <QuizPanel
            setCurrentTime={setCurrentTime}
            currentQuestion={currentQuestion}
            totalQuestion={getQuestion.length}
          />
          <QuizResult currentScore={currentScore} totalQuestion={getQuestion.length} />
        </>
      ) : (
        <>
          {currentData && currentData.activeQuestion !== '' ? (
            <div className="quiz-wrapper">
              <QuizPanel
                setCurrentTime={setCurrentTime}
                currentQuestion={currentQuestion}
                totalQuestion={getQuestion.length}
              />
              <QuizDefinition definitionQuestion={objectQuestion.definition} />
              <ItemQuestion
                options={objectQuestion.options}
                handleValue={handleQuestion}
                isTerminal={isTerminal}
              />
            </div>
          ) : (
            <QuizStart onFormSubmit={onHandleSubmit} />
          )}
        </>
      )}
    </>
  );
};
