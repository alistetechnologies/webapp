import React from "react";

function TableHeader({ header }) {
  return (
    <thead>
      <tr>
        {header.map((title, index) => (
          <th key={index}>{title}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
