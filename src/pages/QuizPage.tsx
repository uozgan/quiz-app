import React, { useEffect, useState } from "react";
import useAxios from "../api/useAxios";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeScore, updateQuizHistory } from "../state/quizSlice";
import { decode } from "html-entities";

const QuizPage = () => {
  const {
    quiz_category,
    quiz_difficulty,
    quiz_question_amount,
    score,
    quiz_history = [],
  } = useSelector((state: RootState) => state.quiz);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${quiz_question_amount}&category=${quiz_category}&difficulty=${quiz_difficulty}`;

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(10);

  useEffect(() => {
    if (response?.data.results.length) {
      const question = response?.data.results[questionIndex];
      let choices = [...question.incorrect_answers].concat(
        question.correct_answer
      );

      if (question.type === "boolean") {
        choices = ["True", "False"];
      } else {
        choices = choices.sort(() => Math.random() - 0.5);
      }

      setOptions(choices);
      setTimer(10);
    }
  }, [response, questionIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (
      timer > 0 &&
      questionIndex >= 0 &&
      questionIndex < response?.data.results.length
    ) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [timer, questionIndex, response]);

  const handleNextQuestion = () => {
    setTimer(0);
    dispatch(
      updateQuizHistory([
        ...quiz_history,
        response?.data.results[questionIndex],
      ])
    );
    setTimeout(() => {
      if (questionIndex + 1 < response?.data.results.length) {
        setQuestionIndex(questionIndex + 1);
        setTimer(10);
      } else {
        navigate("/score");
      }
    }, 1000);
  };

  const handleClickOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    const question = response?.data.results[questionIndex];
    if (!question) return;
    const correctAnswer =
      e.currentTarget.textContent === question.correct_answer;

    correctAnswer ? (question.correct = true) : (question.correct = false);
    dispatch(updateQuizHistory([...quiz_history, question]));

    if (correctAnswer) {
      dispatch(
        changeScore(question.type === "boolean" ? score + 5 : score + 10)
      );
    }

    if (questionIndex + 1 < response?.data.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  };

  if (loading) {
    return <h4>Loading</h4>;
  }

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <p>Time Left: {timer} sec</p>
      </div>
      <p style={{ fontSize: "24px", textAlign: "center", margin: "24px 0" }}>
        {decode(response?.data.results[questionIndex].question)}
      </p>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        {options.map((data, id) => (
          <button
            key={id}
            onClick={handleClickOption}
            style={{
              margin: "0 5px",
              fontSize: "16px",
            }}
          >
            {decode(data)}
          </button>
        ))}
      </div>
      <p>
        Question {questionIndex + 1} / {response?.data.results.length}{" "}
      </p>
    </div>
  );
};

export default QuizPage;
