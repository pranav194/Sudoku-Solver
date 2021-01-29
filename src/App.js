import React, { isValidElement, useState } from "react";
import Sudoku from "./Sudoku";

export default function App() {
  const [sudoku, setSudoku] = useState([
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
  ]);
  const onChangeCell = (row, col, val) => {
    const sud = [...sudoku];
    sud[row][col] = val;
    setSudoku(sud);
  };

  const isValid = () => {
    for (let i = 0; i < 9; i++) {
      let set = new Set();
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] !== "") {
          if (set.has(sudoku[i][j])) {
            return false;
          } else {
            set.add(sudoku[i][j]);
          }
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      let set = new Set();
      for (let j = 0; j < 9; j++) {
        if (sudoku[j][i] !== "") {
          if (set.has(sudoku[j][i])) {
            return false;
          } else {
            set.add(sudoku[j][i]);
          }
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let set = new Set();
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            let p = x + i * 3;
            let o = y + j * 3;
            if (sudoku[p][o] !== "") {
              if (set.has(sudoku[p][o])) {
                return false;
              } else {
                set.add(sudoku[p][o]);
              }
            }
          }
        }
      }
    }
    return true;
  };
  const validateSudoku = () => {
    if (isValid()) {
      alert("Sudoku Is Valid");
    } else {
      alert("Invalid Sudoku");
    }
  };
  const solveSudoku = () => {
    const sud = [...sudoku];
    if (dfs(sud)) {
      setSudoku(sud);
    }
  };
  const find = (sud) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sud[i][j] == "") {
          return [i, j];
        }
      }
    }
  };
  const dfs = (sud) => {
    let pos = find(sud);
    if (pos == null) {
      return true;
    }
    for (let i = 1; i <= 9; i++) {
      if (isPossible(sud, pos, i)) {
        sud[pos[0]][pos[1]] = i;
        if (dfs(sud)) {
          return true;
        }
        sud[pos[0]][pos[1]] = "";
      }
    }
    return false;
  };
  const isPossible = (sud, pos, val) => {
    const row = pos[0];
    const col = pos[1];
    for (let i = 0; i < 9; i++) {
      if (sud[row][i] == val || sud[i][col] == val) {
        return false;
      }
    }

    let x = Math.floor(row / 3) * 3,
      y = Math.floor(col / 3) * 3;
    console.log(sud, x, y);
    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        console.log(i, j);
        if (sud[i][j] == val) {
          return false;
        }
      }
    }
    return true;
  };
  return (
    <>
      <div className="bg-light">
        <nav className="navbar">
          <h1 className="navbar-brand text-primary h1">Sudoku Solver</h1>
        </nav>
        <div className="container text-center ">
          <h5 className="text-info mb-4">
            Fill in the values in the sudoku Form{" "}
          </h5>
          <Sudoku sudoku={sudoku} onChangeCell={onChangeCell} />
          <div className="d-flex flex-row mt-5 mb-5 w-50 mx-auto">
            <input
              type="button"
              className=" btn btn-success m-2 form-control"
              onClick={() => validateSudoku()}
              value="Validate Sudoku"
            />
            <input
              type="button"
              className=" btn btn-primary m-2 form-control"
              onClick={() => solveSudoku()}
              value="Solve Sudoku"
            />
          </div>
        </div>
      </div>
    </>
  );
}
