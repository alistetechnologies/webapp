import React from "react";

function TableRow({ keyData }) {
  return (
    <tr>
      <td>{keyData.name}</td>
      <td>{keyData.createdAt}</td>
      <td>{keyData.expires}</td>
      <td>{keyData.status}</td>
    </tr>
  );
}

export default TableRow;
