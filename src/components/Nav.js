import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import profile from "../images/profile.png";
import { useNavigate } from "react-router-dom";
const Nav = (props) => {
  const navigate = useNavigate();
  const currentUser = props.users.filter((user) => {
    return user.id === props.authedUser;
  });

  function logOut() {
    props.dispatch(setAuthedUser(null));
    navigate("/");
  }
  return (
    <nav className="p-1 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-transparent container flex flex-wrap items-center justify-between ml-2">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col items-center p-3 mt-4 border rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="block">
              {props.authedUser !== null ? (
                <div className="flex flex-wrap items-center">
                  <p className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    {currentUser[0].name}
                  </p>
                  <img className="w-12" src={currentUser[0].avatarURL} />
                </div>
              ) : (
                <>
                  <img className="w-10" src={profile} />
                </>
              )}
            </li>

            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/add"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                New Question
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Leaderboard
              </Link>
            </li>

            <li className=" position: absolute right-16">
              {props.authedUser !== null ? (
                <button
                  data-testid="nav-sign-out"
                  onClick={logOut}
                  className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Log Out
                </button>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users: Object.values(users),
});
export default connect(mapStateToProps)(Nav);
