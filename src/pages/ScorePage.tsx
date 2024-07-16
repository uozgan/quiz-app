import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Question, restartState } from "../state/quizSlice";
import { decode } from "html-entities";

const ScorePage = () => {
  const { score, quiz_history } = useSelector((state: RootState) => state.quiz);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(quiz_history);

  const handleClick = () => {
    dispatch(restartState());
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Your Score: {score}</h2>
      <button onClick={handleClick}>Play Again</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "40px",
        }}
      >
        <div>Review your Answers:</div>
        {quiz_history &&
          quiz_history.map((question: Question, i: number) => (
            <div key={question.question}>
              <h4>Question {i + 1}</h4>
              <h5>{decode(question.question)}</h5>
              <p>Correct Answer: {decode(question.correct_answer)}</p>
              <p>
                {question.correct === true
                  ? "Your answer was correct"
                  : question.correct === false
                  ? "Your answer was wrong"
                  : "Your time was up"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScorePage;
