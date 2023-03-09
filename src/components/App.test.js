import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
const store = createStore(reducer, middleware);

describe("App", () => {
  it("should render the app component correctly", () => {
    const renderedApp = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(renderedApp).toMatchSnapshot();
  });
  it("should show the Login page when user is not logged in", () => {
    const app = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const loginPage = app.getByTestId("login");
    expect(loginPage).toBeInTheDocument();
  });
});
