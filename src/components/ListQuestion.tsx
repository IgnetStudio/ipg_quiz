// packages

import React, { useState } from 'react';

// components & utils

import { BtnCta, BtnSide } from './BtnSet';
import { QuizStart } from '../components/QuizStart';
import { getQuestion } from '../utils/getQuestion';
import TimerTwoToneIcon from '@material-ui/icons/TimerTwoTone';
import ArrowRightTwoToneIcon from '@material-ui/icons/ArrowRightTwoTone';

// code

export const ListQuestion = () => {
  // hooks default
  const [currentScore, setScore] = useState(0);
  const [currentQuestion, setQuestion] = useState(0);
  const [currentStatus, setStatus] = useState(false);
  const objectQuestion = getQuestion[currentQuestion];

  // time & question settings

  const [setCurrentTime, setTime] = useState(20);
  const [currentData, setData] = useState({
    setCurrentTime: 20,
    statusTime: 'stop',
    setQuestion: null,
    activeQuestion: '',
  });

  const timer = () => {
    let count = currentData.setCurrentTime;
    const int = setInterval(() => {
      setTime(count - 1);
      count = count - 1;
      if (count < 1) clearInterval(int);
    }, 1000);
  };

  // hooks update
  const handleQuestion = (correctAnswer: boolean) => {
    if (correctAnswer) {
      setScore(currentScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < getQuestion.length) {
      setQuestion(nextQuestion);
    } else {
      setStatus(true);
    }
  };

  return (
    <>
      {currentStatus ? (
        <>
          <div className="quiz-panel">
            <div className="quiz-status">
              <span>{currentQuestion + 1}</span>
              <ArrowRightTwoToneIcon className="quiz-arrow" />
              <span>{getQuestion.length}</span>
            </div>
            <div className="quiz-counter">
              <span>{setCurrentTime}</span>
              <ArrowRightTwoToneIcon className="quiz-arrow" />
              <TimerTwoToneIcon className="quiz-timer" />
            </div>
          </div>
          <div className="quiz-result">
            <h2>
              Game over, score: {currentScore} out of {getQuestion.length}
            </h2>
            <BtnCta />
            <BtnSide />
          </div>
        </>
      ) : (
        <>
          {currentData && currentData.activeQuestion !== '' ? (
            <div className="quiz-wrapper">
              <div className="quiz-panel">
                <div className="quiz-status">
                  <span>{currentQuestion + 1}</span>
                  <ArrowRightTwoToneIcon className="quiz-arrow" />
                  <span>{getQuestion.length}</span>
                </div>
                <div className="quiz-counter">
                  <span>{setCurrentTime}</span>
                  <ArrowRightTwoToneIcon className="quiz-arrow" />
                  <TimerTwoToneIcon className="quiz-timer" />
                </div>
              </div>
              <div className="quiz-definition">
                <h2>{objectQuestion.definition}</h2>
              </div>
              <ul>
                {objectQuestion.options.map((answer) => {
                  const question = answer.answer;
                  const charCounter = question.length;
                  return (
                    <li key={answer.id}>
                      <button onClick={() => handleQuestion(answer.value)}>
                        <span
                          className="quiz-type"
                          style={{
                            width: `${charCounter}ch`,
                            animation: `typing 2s steps(${charCounter})`,
                          }}
                        >
                          {question}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <QuizStart
              onClick={() => {
                setData({ ...currentData, activeQuestion: 'q1' });
                timer();
              }}
            />
          )}
        </>
      )}
    </>
  );
};
