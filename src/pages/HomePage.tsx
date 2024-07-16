import React, { FormEvent } from "react";
import SelectOptionField from "../components/SelectOptionField";
import QuestionAmountField from "../components/QuestionAmountField";
import useAxios from "../api/useAxios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const navigate = useNavigate();

  if (loading) {
    return <h4>Loading</h4>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/quiz");
  };

  return (
    <div style={{ display: "flex" }}>
      <form onSubmit={handleSubmit}>
        <SelectOptionField
          options={response?.data.trivia_categories}
          label="Category"
        />
        <SelectOptionField options={difficultyOptions} label="Difficulty" />
        <QuestionAmountField />
        <button type="submit" style={{ margin: "20px 0", width: "100%" }}>
          Start quiz
        </button>
      </form>
    </div>
  );
};

export default HomePage;
