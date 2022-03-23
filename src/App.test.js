import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";
import App from "./App";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      category: "Spooky",
      delivery: "So they can keep their ghoulish figures.",
      error: false,
      id: 295,
      lang: "en",
      safe: true,
      setup: "Why do ghosts go on diets?",
      type: "twopart",
    }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("if the app renders", async () => {
  const { getByText } = render(<App />);
  await waitFor(() =>
    expect(getByText(/Why do ghosts go on diets/i)).toBeInTheDocument()
  );
});

test("if user can click like", async () => {
  const { getByRole } = render(<App />);
  await waitFor(() => fireEvent.click(getByRole("button", { name: "Like" })));
  expect(fetch).toHaveBeenCalledTimes(2);
});
