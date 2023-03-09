import "../App.css";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Fragment, useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import Nav from "./Nav";
import Login from "./Login";
import QuestionDetailed from "./PollCardDetailed";
import Home from "./Home";
import LeaderBoard from "./Leaderboard";
import NotFound from "./404";
import NewPoll from "./NewPoll";
function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <Fragment>
      <Nav />
      {props.authedUser === null ? (
        <Login/>
      ) : (
        <Routes>
          <Route path="/leaderboard" exact element={<LeaderBoard />} />
          <Route path="/add" exact element={<NewPoll />} />
          <Route path="/question/:id" exact element={<QuestionDetailed />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/404" exact element={<NotFound />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});
export default connect(mapStateToProps)(App);
