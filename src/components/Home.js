import { connect } from "react-redux";
import QuestionCard from "./PollCard";
const Home = (props) => {
  const doneQuestions = props.questions.filter((question) => {
    return props.doneQuestions.includes(question.id);
  });
  const newQuestions = props.questions.filter((question) => {
    return props.newQuestions.includes(question.id);
  });
  const sortedNewQuestions = newQuestions.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1
  );
  const sortedDoneQuestions = doneQuestions.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1
  );
  return (
    <div>
      <div className="">
        <div className="w-4/6 ml-auto mr-auto mt-5  border-gray border-2 rounded-lg text-center">
          <p className="font-bold text-3xl pt-2 pb-2 ">New Questions</p>
          <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="grid grid-cols-3 max-[700px]:grid-cols-2 max-[500px]:grid-cols-1">
            {sortedNewQuestions.map((question) => {
              return <QuestionCard key={question.id} question={question} />;
            })}
          </div>
        </div>
        <div className="w-4/6 ml-auto mr-auto mt-5 mb-5 border-gray border-2 rounded-lg text-center">
          <p className="font-bold text-3xl pt-2 pb-2 ">Done</p>
          <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="grid grid-cols-3 max-[700px]:grid-cols-2 max-[500px]:grid-cols-1">
            {sortedDoneQuestions.map((question) => {
              return <QuestionCard key={question.id} question={question} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  const currentUser = Object.values(users).filter((user) => {
    return user.id === authedUser;
  })[0];

  const doneQuestions = Object.keys(questions).filter((question) => {
    return Object.keys(currentUser.answers).includes(question);
  });

  const newQuestions = Object.keys(questions).filter((question) => {
    return !Object.keys(currentUser.answers).includes(question);
  });

  return {
    authedUser,
    users: Object.values(users),
    questions: Object.values(questions),
    doneQuestions,
    newQuestions,
    currentUser,
  };
};

export default connect(mapStateToProps)(Home);
