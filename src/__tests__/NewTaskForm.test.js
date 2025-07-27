import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NewTaskForm from "../components/NewTaskForm";
import App from "../components/App";
import { CATEGORIES } from "../data";

describe("NewTaskForm", () => {
  test("calls the onTaskFormSubmit callback prop when the form is submitted", () => {
    const onTaskFormSubmit = jest.fn();

    render(
      <NewTaskForm
        categories={CATEGORIES}
        onTaskFormSubmit={onTaskFormSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Details/i), {
      target: { value: "Pass the tests" },
    });

    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "Code" },
    });

    fireEvent.submit(screen.getByTestId("task-form"));

    expect(onTaskFormSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        text: "Pass the tests",
        category: "Code",
      })
    );
  });

  test("adds a new item to the list when the form is submitted", () => {
    render(<App />);

    const codeCountBefore = screen.queryAllByText(/Code/).length;

    fireEvent.change(screen.getByLabelText(/Details/i), {
      target: { value: "Pass the tests" },
    });

    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "Code" },
    });

    fireEvent.submit(screen.getByTestId("task-form"));

    const codeCountAfter = screen.queryAllByText(/Code/).length;

    expect(screen.queryByText(/Pass the tests/)).toBeInTheDocument();
    expect(codeCountAfter).toBeGreaterThan(codeCountBefore);
  });
});
