import React from "react";
import { Switch } from "@/components/ui/switch";

const KeyGenerateForm = ({ formData, handleInputChange, handleToggleChange, handleSelectAll, selectAll }) => {
  const permissions = formData.permissions || {
    House: { list: false, detail: false },
    Appliance: { list: false, control: false, update: false },
  };

  const allowedPermissions = [
    "House:List",
    "House:Detail",
    "Appliance:List",
    "Appliance:Control",
    "Appliance:Update"
  ];

  const mapRoleToPermission = (role) => {
    const [category, action] = role.split(":");
    return { category, action };
  };

  const roles = formData.role || [];
  roles.forEach((role) => {
    const { category, action } = mapRoleToPermission(role);
    if (permissions[category]) {
      permissions[category][action.toLowerCase()] = true;
    }
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Key Name</label>
          <input
            type="text"
            name="keyName"
            className="border p-2 rounded-lg w-full"
            value={formData.keyName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Purpose</label>
          <input
            type="text"
            name="purpose"
            className="border p-2 rounded-lg w-full"
            value={formData.purpose}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          className="border p-2 rounded-lg w-48"
          value={formData.expiryDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Permissions</h3>
        <button onClick={handleSelectAll} className="text-blue-500">
          {selectAll ? "Unselect All" : "Select All"}
        </button>
      </div>
      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">S.No</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">List</th>
            <th className="p-2 border">Detail</th>
            <th className="p-2 border">Control</th>
            <th className="p-2 border">Update</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(permissions).map((category, index) => (
            <tr key={category} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{category}</td>
              <td className="p-2 border">
                {allowedPermissions.includes(`${category}:List`) && (
                  <Switch
                    checked={permissions[category].list}
                    onCheckedChange={() => handleToggleChange(category, "list")}
                  />
                )}
              </td>
              <td className="p-2 border">
                {allowedPermissions.includes(`${category}:Detail`) && (
                  <Switch
                    checked={permissions[category].detail}
                    onCheckedChange={() => handleToggleChange(category, "detail")}
                  />
                )}
              </td>
              <td className="p-2 border">
                {allowedPermissions.includes(`${category}:Control`) && (
                  <Switch
                    checked={permissions[category].control}
                    onCheckedChange={() => handleToggleChange(category, "control")}
                  />
                )}
              </td>
              <td className="p-2 border">
                {allowedPermissions.includes(`${category}:Update`) && (
                  <Switch
                    checked={permissions[category].update}
                    onCheckedChange={() => handleToggleChange(category, "update")}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default KeyGenerateForm;