import { useState } from "react";
import { handleCreateQuestion } from "../actions/questions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
const NewPoll = (props) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  function updateOption(e) {
    if (e.target.id === "option1") {
      setOptionOne(e.target.value);
    } else if (e.target.id === "option2") {
      setOptionTwo(e.target.value);
    }
  }
  function submit() {
    props.dispatch(
      handleCreateQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: props.authedUser,
      })
    );
    navigate("/");
  }
  return (
    <div className="mx-auto max-w-lg p-6 bg-white rounded-lg shadow-lg mt-5 hover:bg-gray-50 border-gray-200 border-2 ">
      <h1 className="text-2xl font-bold mb-6">Would You Rather?</h1>
      <form onSubmit={submit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="option1"
          >
            Option 1
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="option1"
            type="text"
            placeholder="Enter option 1 here"
            onChange={updateOption}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="option2"
          >
            Option 2
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="option2"
            type="text"
            placeholder="Enter option 2 here"
            onChange={updateOption}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};
export default connect(mapStateToProps)(NewPoll);
