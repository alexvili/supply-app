import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the correct content", () => {
  const { getByText } = render(<App />);

  expect(getByText("Water Supply")).toBeInTheDocument();
});
