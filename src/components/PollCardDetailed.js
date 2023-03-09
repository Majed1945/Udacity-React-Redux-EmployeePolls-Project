import { React, useState } from "react";
import {
  useLocation,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { AiOutlineCheck } from "react-icons/ai";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionDetailed = (props) => {
  const { id } = props.id;

  const [selectedOption, setSelectedOption] = useState("");
  if (Object.keys(props.questions).includes(id) === false) {
    return <Navigate to="/404" />;
  }
  const question = formatQuestion(
    Object.values(props.questions).filter((question) => {
      return question.id === id;
    })[0],
    Object.values(props.users),
    props.authedUser
  );

  const numberOfAnswers =
    question.optionTwo.votes.length + question.optionOne.votes.length;
  const optionOnePercentage =
    Math.round(
      ((question.optionOne.votes.length / numberOfAnswers) * 100 +
        Number.EPSILON) *
        100
    ) / 100;
  const optionTwoPercentage =
    Math.round(
      ((question.optionTwo.votes.length / numberOfAnswers) * 100 +
        Number.EPSILON) *
        100
    ) / 100;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  function submit() {
    props.dispatch(
      handleAnswerQuestion(question.id, props.authedUser, selectedOption)
    );
  }
  return (
    <div>
      {question.hasAnswered ? (
        <div className=" mr-auto ml-auto mt-5 max-w-lg rounded-lg bg-white p-6 m-3 shadow-lg dark:bg-neutral-700 border-gray border-2">
          <Link to="/">Back</Link>
          <img className="w-32 h-32 m-auto" src={question.authorAvatar}></img>
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center">
            {question.authorName}
          </h5>

          <p>
            {question.optionOne.text} ({question.optionOne.votes.length}/
            {numberOfAnswers}){" "}
            {question.optionOne.votes.includes(props.authedUser) ? (
              <AiOutlineCheck className="display: inline" />
            ) : (
              <></>
            )}
          </p>
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${optionOnePercentage}%` }}
            >
              {" "}
              {optionOnePercentage}%
            </div>
          </div>
          <p>
            {question.optionTwo.text} ({question.optionTwo.votes.length}/
            {numberOfAnswers}){" "}
            {question.optionTwo.votes.includes(props.authedUser) ? (
              <AiOutlineCheck className="display: inline" />
            ) : (
              <></>
            )}
          </p>
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${optionTwoPercentage}%` }}
            >
              {" "}
              {optionTwoPercentage}%
            </div>
          </div>
        </div>
      ) : (
        <div className=" mr-auto ml-auto mt-5 max-w-lg rounded-lg bg-white p-6 m-3 shadow-lg dark:bg-neutral-700 border-gray border-2">
          <Link to="/">Back</Link>
          <img className="w-32 h-32 m-auto" src={question.authorAvatar}></img>
          <h5 className="text-center mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {question.authorName}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Would you rather:
          </p>
          <div className="flex items-center mb-4">
            <input
              value="optionOne"
              onChange={handleOptionChange}
              id="default-radio-1"
              type="radio"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {question.optionOne.text}
            </label>
          </div>
          <div className="flex items-center">
            <input
              value="optionTwo"
              onChange={handleOptionChange}
              id="default-radio-2"
              type="radio"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {question.optionTwo.text}
            </label>
          </div>
          <button
            type="button"
            className="inline-block rounded mt-5 bg-black px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  return {
    id: props.router.params,
    authedUser,
    questions,
    users,
  };
};
export default withRouter(connect(mapStateToProps)(QuestionDetailed));
