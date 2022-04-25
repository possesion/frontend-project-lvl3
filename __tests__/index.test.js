import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import fs from "fs";
import path from "path";
// import testingLibraryUserEvent from "@testing-library/user-event";
import run from "../src/index.js";

beforeEach(() => {
  const pathToFixture = path.join("__tests__", "__fixtures__", "index.html");
  const initHtml = fs.readFileSync(pathToFixture).toString();
  document.body.innerHTML = initHtml;
});

test("submit disabled", async () => {
  await run();
  // screen.debug();
  expect(
    screen.getByText("Пример: https://ru.hexlet.io/lessons.rss")
  ).toBeInTheDocument();
});
