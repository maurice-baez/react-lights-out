import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import _ from "lodash";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function chooseTorF(chanceLightStartsOn) {
  const randNum = _.random(0, 1);

  return randNum > chanceLightStartsOn ? false : true;
}

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row = [];

      for (let j = 0; j < ncols; j++) {
        row.push(chooseTorF(chanceLightStartsOn));
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    for (let row of board) {
      if (row.includes(true)) return false;
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number); // '1-2' -> ['1','2'] -> [1,2]

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

        //Make a (deep) copy of the oldBoard
        // console.log([...oldBoard])

      const boardCopy = oldBoard.map((row) => [...row]);

      //in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      // return the copy

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
  console.log("board", board);

  return (
    <table>
      <tbody>
        {board.map((row, x) => {
          return (
            <tr>
              {row.map((cell, y) => {
                return (
                  <Cell
                    flipCellsAroundMe={() => flipCellsAround(`${x}-${y}`)}
                    isLit={cell}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;
