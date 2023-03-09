export const RECEIVE_USERS = "RECEIVE_USERS";
export const SET_USER_ANSWER = "SET_USER_ANSWER";
export const ASSIGN_QUESTION = "ASSIGN_QUESTION";
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
export function setUserAnswer(qid, authedUser, answer) {
  return {
    type: SET_USER_ANSWER,
    qid,
    authedUser,
    answer,
  };
}
export function assignQuestion(author, questionId) {
  return {
    type: ASSIGN_QUESTION,
    author,
    questionId,
  };
}
