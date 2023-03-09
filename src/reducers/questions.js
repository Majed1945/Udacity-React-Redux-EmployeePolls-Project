import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
  CREATE_QUESTION,
} from "../actions/questions";


export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };
    case CREATE_QUESTION:
      const formattedQuestion = action.question;
      return {
        ...state,
        [formattedQuestion.id]: formattedQuestion,
      };
    default:
      return state;
  }
}
