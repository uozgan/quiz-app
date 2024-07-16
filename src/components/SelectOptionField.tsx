import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { changeCategory, changeDifficulty } from "../state/quizSlice";

interface Option {
  id: string | number;
  name: string;
}

interface SelectOptionFieldProps {
  label: string;
  options: Option[];
}

const SelectOptionField = (props: SelectOptionFieldProps) => {
  const { label, options } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);

    switch (label) {
      case "Category":
        dispatch(changeCategory(e.target.value));
        break;
      case "Difficulty":
        dispatch(changeDifficulty(e.target.value));
        break;
      default:
        return;
    }
  };

  return (
    <div style={{ margin: "20px 0", display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: "20px", marginBottom: "10px" }}>{label}:</label>
      <select value={value} onChange={handleChange} style={{ width: "100%" }}>
        {options.map((opt: Option, i: number) => (
          <option value={opt.id} key={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptionField;
