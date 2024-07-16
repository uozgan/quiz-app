import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { changeAmount } from "../state/quizSlice";

const QuestionAmountField = () => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAmount(Number(e.target.value)));
  };

  return (
    <div style={{ margin: "20px 0", display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: "20px", marginBottom: "10px" }}>
        Question Amount:
      </label>
      <input
        type="number"
        id="myText"
        defaultValue={10}
        onChange={handleChange}
      />
    </div>
  );
};

export default QuestionAmountField;
