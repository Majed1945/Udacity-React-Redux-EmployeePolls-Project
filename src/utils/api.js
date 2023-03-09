import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from "./_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestionAnswer(qid, authedUser, answer) {
  return _saveQuestionAnswer({ qid, authedUser, answer });
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}
