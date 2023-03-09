import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { setAuthedUser } from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, middleware);

describe("Nav", () => {
  it("should render the nav bar correctly", () => {
    const renderedNav = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(renderedNav).toMatchSnapshot();
  });
  it("should not display the Log Out button when the user is logged out", async () => {
    const nav = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(nav.queryByTestId("nav-sign-out")).not.toBeInTheDocument();
  });
  it("should display the Log Out button when the user is logged in", async () => {
    await store.dispatch(handleInitialData());
    store.dispatch(setAuthedUser("sarahedo"));
    const nav = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(nav.getByTestId("nav-sign-out")).toBeInTheDocument();
  });
  it("when the user is logged in and presses the log out botton, the log out button should disappear.", async () => {
    await store.dispatch(handleInitialData());
    store.dispatch(setAuthedUser("sarahedo"));
    const nav = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    const signOutButton = nav.getByTestId("nav-sign-out");
    fireEvent.click(signOutButton);
    expect(nav.queryByTestId("nav-sign-out")).not.toBeInTheDocument();
  });
});
