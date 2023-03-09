export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatQuestion(question, users, authedUser) {
  const { id, timestamp, optionOne, optionTwo, author } = question;
  const authorName = users.filter((user) => {
    return user.id === author;
  })[0].name;
  const authorAvatar = users.filter((user) => {
    return user.id === author;
  })[0].avatarURL;
  const hasAnswered = optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser);
  return {
    authorName,
    id,
    timestamp: formatDate(timestamp),
    optionOne,
    optionTwo,
    authorAvatar,
    hasAnswered,
  };
}
