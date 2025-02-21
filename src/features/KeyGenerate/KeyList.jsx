import React from "react";
import { Switch } from "@/components/ui/switch";
import dayjs from "dayjs";

const KeyList = ({ keys, handleStatusToggle, handleEdit }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Submitted Keys</h2>
      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">S.No.</th>
            <th className="p-2 border">Key Name</th>
            <th className="p-2 border">Purpose</th>
            <th className="p-2 border">Valid Till</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key, index) => (
            <tr key={index} className="text-center hover:bg-gray-100">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{key.name}</td>
              <td className="p-2 border">{key.purpose}</td>
              <td className="p-2 border">
                {dayjs(key.validTill).format("DD-MM-YYYY")}
              </td>
              <td className="p-2 border">
                <Switch checked={key.active} onCheckedChange={() => handleStatusToggle(index)} />
              </td>
              <td className="p-2 border">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeyList;