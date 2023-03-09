import { connect } from "react-redux";
const LeaderBoad = (props) => {
  function answeredQuestionsLength(userID, userAvatar, userName) {
    let length = 0;
    let createdLength = 0;
    let answeredLength = 0;

    props.questions.forEach((question) => {
      if (question.optionOne.votes.includes(userID)) {
        length++;
        answeredLength++;
      }
      if (question.optionTwo.votes.includes(userID)) {
        length++;
        answeredLength++;
      }
      if (question.author === userID) {
        length++;
        createdLength++;
      }
    });

    return {
      length,
      answeredLength,
      createdLength,
      userID,
      userAvatar,
      userName,
    };
  }

  function sortUsers() {
    const formatedUsers = [];
    props.users.map((user) => {
      formatedUsers.push(
        answeredQuestionsLength(user.id, user.avatarURL, user.name)
      );
    });
    const sortedUsers = formatedUsers.sort((a, b) =>
      a.length < b.length ? 1 : -1
    );
    let rank = 1;
    sortedUsers.forEach((obj, index) => {
      if (index > 0 && obj.length !== sortedUsers[index - 1].length) {
        rank++;
      }
      obj.rank = rank;
    });
    return sortedUsers;
  }
  
  const sortedUsers = sortUsers();
  return (
    <div className="relative mt-10 mr-auto ml-auto w-3/4 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Answered
            </th>
            <th scope="col" className="px-6 py-3">
              Created
            </th>
            <th scope="col" className="px-6 py-3">
              Rank
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => {
            return (
              <tr
                key={user.userName}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.userAvatar}
                    alt="Jese image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {user.userName}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {" "}
                  <div className="text-base font-semibold">
                    {user.answeredLength}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {" "}
                  <div className="text-base font-semibold">
                    {user.createdLength}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {" "}
                  <div className="text-base font-semibold">{user.rank}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = ({ users, questions }) => {
  return {
    users: Object.values(users),
    questions: Object.values(questions),
  };
};
export default connect(mapStateToProps)(LeaderBoad);
