import Board from "./Board";
import { render, fireEvent } from "@testing-library/react";


test("makes board please", function () {

  const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />);
  
  expect()
})