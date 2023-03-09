import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { Link } from "react-router-dom";
const QuestionCard = (props) => {
  return (
    <div className="hover:bg-gray-100 max-w-sm rounded-lg bg-white p-6 m-3 shadow-lg dark:bg-neutral-700 border-gray border-2">
      <img className="w-32 h-32 m-auto" src={props.question.authorAvatar}></img>
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {props.question.authorName}
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {props.question.timestamp}
      </p>
      <Link to={`/question/${props.question.id}`}>
        <button
          type="button"
          className="inline-block rounded bg-black px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Show
        </button>{" "}
      </Link>
    </div>
  );
};
const mapStateToProps = ({ users, authedUser }, { question }) => {
  return {
    question: formatQuestion(question, Object.values(users), authedUser),
  };
};
export default connect(mapStateToProps)(QuestionCard);
