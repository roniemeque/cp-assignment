import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import App from "../../App";

test("form submits two answers", () => {
  jest.mock("Location", () => {
    const Platform = require.requireActual("");
    Platform.OS = "android";
    return Platform;
  });

  const allQuestions = ["q1", "q2"];
  const mockFn = jest.fn();

  const { getByText, debug } = render(<App />);

  const hello = getByText(/open/gi);
  debug();
});
