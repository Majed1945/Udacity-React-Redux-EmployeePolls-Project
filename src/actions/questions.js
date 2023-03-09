import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { setUserAnswer,assignQuestion } from "./users";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const CREATE_QUESTION = "CREATE_QUESTION";
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion(qid, authedUser, answer) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  };
}

export function handleAnswerQuestion(qid, authedUser, answer) {
  return (dispatch) => {
    return saveQuestionAnswer(qid, authedUser, answer)
      .catch((e) => {
        console.warn("Error in handleAnswerQuestion ", e);
        alert("The was an error saving the question answer. Try again.");
      })
      .then(() => {
        dispatch(answerQuestion(qid, authedUser, answer));
        dispatch(setUserAnswer(qid, authedUser, answer));
      });
  };
}
function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question,
  };
}

export function handleCreateQuestion(question) {
  return (dispatch) => {
    return saveQuestion(question)
      .catch((e) => {
        console.warn("Error in saving new question ", e);
        alert("The was an error saving the question . Try again.");
      })
      .then((question) => {
        dispatch(createQuestion(question));
        dispatch(assignQuestion(question.author,question.id));
      });
  };
}
