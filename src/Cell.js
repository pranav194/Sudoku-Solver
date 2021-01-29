import React from "react";

export default function Cell({ row, col, val, onChange }) {
  return (
    <div
      style={{
        border: "1px solid black",
        borderLeft: `${col % 3 === 0 ? "3px" : "1px"} solid black`,
        borderTop: `${row % 3 === 0 ? "3px" : "1px"} solid black`,
      }}
    >
      <input
        type="number"
        className=" m-0 form-control"
        value={val}
        onChange={onChange}
      />
    </div>
  );
}
