import React from "react";
import Cell from "./Cell";

export default function Sudoku({ sudoku, onChangeCell }) {
  console.log(sudoku);
  return (
    <div
      className=" m-auto d-flex flex-column"
      style={{
        height: "100%",
        width: "50%",
        minWidth: "100px",
        borderRight: "3px solid black",
        borderBottom: "3px solid black",
      }}
    >
      {sudoku.map((row, rowNum) => (
        <div className="d-flex flex-row p-0" key={rowNum}>
          {row.map((cell, colNum) => (
            <Cell
              key={colNum}
              row={rowNum}
              col={colNum}
              val={cell}
              onChange={({ target }) =>
                onChangeCell(rowNum, colNum, target.value)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
