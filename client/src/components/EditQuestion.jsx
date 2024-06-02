import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useStateValue } from "../contex/AppContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import quizService from "../services/quizService";
import { Link } from "react-router-dom";

const EditQuestion = () => {
  const { state, dispatch } = useStateValue();
  const { user, quizzes, questionId } = state;
  console.log('editquestion', state)

  const [input1Clicked, setInput1Clicked] = useState(false);
  const [input2Clicked, setInput2Clicked] = useState(false);
  const [input3Clicked, setInput3Clicked] = useState(false);
  const [input4Clicked, setInput4Clicked] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(questionId === -1 ? 1 : (quizzes?.questions[questionId]?.correctAnswer || null));

  const [formData, setFormData] = useState({
    quizId: quizzes?._id || "",
    index: questionId === -1 ? 0 : questionId,
    questionName: questionId === -1 ? "Quiz Name" : quizzes?.questions[questionId]?.questionName || "",
    correctAnswer: questionId === -1 ? 1 : (quizzes?.questions[questionId]?.correctAnswer || null),
    answers: questionId === -1 ? Array.from({ length: 4 }, () => "") : quizzes?.questions[questionId]?.answers || Array.from({ length: 4 }, () => ""),
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (index, e) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = e.target.value;
    setFormData({ ...formData, answers: newAnswers });
  };

  const handleInputClick = (index) => {
    setCorrectAnswer(index + 1);
    setFormData({ ...formData, correctAnswer: index + 1 });
    setInput1Clicked(index === 0);
    setInput2Clicked(index === 1);
    setInput3Clicked(index === 2);
    setInput4Clicked(index === 3);
  };

  const handleMouseEnter = (index) => {
    if (index === 0) setIsHovered1(true);
    if (index === 1) setIsHovered2(true);
    if (index === 2) setIsHovered3(true);
    if (index === 3) setIsHovered4(true);
  };

  const handleMouseLeave = (index) => {
    if (index === 0) setIsHovered1(false);
    if (index === 1) setIsHovered2(false);
    if (index === 2) setIsHovered3(false);
    if (index === 3) setIsHovered4(false);
  };

  const updateQuestion = async () => {
    try {
      const response = await quizService.updateOneQuestion(formData);
      console.log('updateQuestion', response.data.data.quiz);
      dispatch({ type: "GET_DETAILS_ONE_QUIZ", payload: response.data.data.quiz });
      navigate(`/editQuiz/${quizzes._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  const addQuestion = async () => {
    try {
      const newQuestion = {
        questionName: "",
        correctAnswer: null,
        answers: Array.from({ length: 4 }, () => ""),
      };

      setFormData({
        ...formData,
        questionName: "Input Question",
        correctAnswer: 1,
        answers: Array.from({ length: 4 }, () => ""),
      });

      const response = await quizService.addOneQuestion(formData);
      console.log('addQuestion', response.data.data.quiz);
      dispatch({ type: "NEW_QUESTION", payload: response.data.data.quiz.questions.length - 1 });
      dispatch({ type: "GET_DETAILS_ONE_QUIZ", payload: response.data.data.quiz });
      navigate(`/editQuiz/${quizzes._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  
  
  
  // Mảng màu để áp dụng cho các câu trả lời
  const colors = ["bg-fuchsia-300", "bg-blue-300", "bg-yellow-300", "bg-green-300"];

  return (
    <div className="flex justify-center items-center text-white">
      <div className="bg-[#461a42] flex flex-col items-center justify-start pt-5 w-[1000px] h-[600px] rounded-md">
        <label className="w-[950px] h-[300px] flex justify-center items-center border border-gray-100 rounded-md bg-[#461a42] hover:bg-[#2e112b]">
          <textarea
            name="questionName"
            onChange={(e) => changeHandler(e)}
            style={{ outline: "none", border: "1px solid transparent" }}
            placeholder={questionId === -1 ? "Input Question" : (quizzes?.questions[questionId]?.questionName || "")}
            className="w-[550px] h-[80px] placeholder-white border border-none resize-none bg-[#461a42] hover:bg-[#2e112b]"
          />
        </label>
        <div className="grid grid-cols-4 gap-1 pt-3">
        {formData.answers.map((answer, index) => (
  <div key={index} className={`flex w-[240px] h-[250px] bg-${index % 2 === 0 ? "fuchsia" : "blue"}-300 flex-col items-center rounded-md`}>
    <div className="w-full h-4 flex justify-end mt-1 mr-1 relative">
      <FaRegCheckCircle
        onClick={() => handleInputClick(index)}
        className={`border ${correctAnswer === index + 1 ? "bg-green-400" : `bg-${index % 2 === 0 ? "fuchsia" : "blue"}-300`} rounded-full w-[20px] h-[20px]`}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave(index)}
      />
      {index % 2 === 0 && isHovered1 && (
        <p className="absolute bg-black text-white p-1 rounded-lg mr-6">
          Đánh dấu là câu trả lời đúng
        </p>
      )}
      {index % 2 !== 0 && isHovered2 && (
        <p className="absolute bg-black text-white p-1 rounded-lg mr-6">
          Đánh dấu là câu trả lời đúng
        </p>
      )}
    </div>
    <label className="w-[240px] h-[214px] mt-3 flex justify-center items-center">
      <textarea
        name="answer"
        onChange={(e) => handleInputChange(index, e)}
        style={{ outline: "none", border: "1px solid transparent" }}
        type="text"
        className={`w-full m-5 placeholder-white border-none h-full rounded-md resize-none border bg-${index % 2 === 0 ? "fuchsia" : "blue"}-300 hover:bg-[${index % 2 === 0 ? "#dd82ed" : "#78aae3"}]`}
        placeholder={questionId === -1 ? "Input Answers" : quizzes?.questions[questionId]?.answers[index] || ""}
        value={answer}
      />
    </label>
  </div>
))}

        </div>
        <div className="flex gap-5 mb-9">
          <button onClick={questionId === -1 ? () => addQuestion() : () => updateQuestion()} className="mt-10 bg-fuchsia-700 rounded-md w-[100px] h-[30px] hover:bg-[#6f0d78]">
            SAVE
          </button>
          <Link to={`/editQuiz/${quizzes._id}`}>
  <button className="mt-10 bg-fuchsia-700 rounded-md w-[100px] h-[30px] hover:bg-[#6f0d78]">
    CANCEL
  </button>
</Link>

        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
