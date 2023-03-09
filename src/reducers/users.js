import {
  ASSIGN_QUESTION,
  RECEIVE_USERS,
  SET_USER_ANSWER,
} from "../actions/users";
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SET_USER_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    case ASSIGN_QUESTION:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.questionId),
        },
      };
    default:
      return state;
  }
}
