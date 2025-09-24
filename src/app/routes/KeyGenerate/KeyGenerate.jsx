import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/features/auth/api/userStore";
import Filter from "@/features/dashboard/filter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { serverUrl } from "@/constants/config";
import { KeyPasswordCopyMModel } from "@/features/KeyGenerate/component/KeyPasswordCopyMModel";
import KeyModal from "@/features/KeyGenerate/KeyModal";
import KeyList from "@/features/KeyGenerate/KeyList";
import KeyGenerateForm from "@/features/KeyGenerate/KeyGenerateForm";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  ordinal: (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = number % 100;
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  },
});

const allowedPermissions = [
  "House:List",
  "House:Detail",
  "Appliance:List",
  "Appliance:Control",
  "Appliance:Update",
];

export function KeyGenerate() {
  const user = useUser.getState().user;
  const [selectedKey, setSelectedKey] = useState({
    value: user?.selectedKey || "",
  });
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showKeyDetails, setShowKeyDetails] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editSelectAll, setEditSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    keyName: "",
    purpose: "",
    expiryDate: "",
    permissions: {
      House: { list: false, detail: false },
      Appliance: { list: false, control: false, update: false },
    },
    role: [],
  });
  const [editFormData, setEditFormData] = useState({
    keyName: "",
    purpose: "",
    expiryDate: "",
    permissions: {
      House: { list: false, detail: false },
      Appliance: { list: false, control: false, update: false },
    },
    role: [],
  });

  const getApiKeys = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl.sub}/v3/key/getKeys`, {
        userId: user?._id,
      });
      setKeys(
        Array.isArray(response.data.data.keys) ? response.data.data.keys : []
      );
    } catch (error) {
      console.error("Error fetching API Keys:", error);
      toast.error("An error occurred while fetching API Keys.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiKeys();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToggleChange = (category, permission) => {
    setFormData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions,
        [category]: {
          ...prevData.permissions[category],
          [permission]: !prevData.permissions[category][permission],
        },
      },
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditToggleChange = (category, permission) => {
    setEditFormData((prevData) => {
      const updatedPermissions = {
        ...prevData.permissions,
        [category]: {
          ...prevData.permissions[category],
          [permission]: !prevData.permissions[category][permission],
        },
      };

      const roles = [];
      Object.keys(updatedPermissions).forEach((cat) => {
        Object.keys(updatedPermissions[cat]).forEach((perm) => {
          if (updatedPermissions[cat][perm]) {
            roles.push(
              `${cat}:${perm.charAt(0).toUpperCase() + perm.slice(1)}`
            );
          }
        });
      });

      return { ...prevData, permissions: updatedPermissions, role: roles };
    });
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setFormData((prevData) => {
      const updatedPermissions = {};
      Object.keys(prevData.permissions).forEach((category) => {
        updatedPermissions[category] = {
          list: allowedPermissions.includes(`${category}:List`)
            ? !selectAll
            : prevData.permissions[category].list,
          detail: allowedPermissions.includes(`${category}:Detail`)
            ? !selectAll
            : prevData.permissions[category].detail,
          control: allowedPermissions.includes(`${category}:Control`)
            ? !selectAll
            : prevData.permissions[category].control,
          update: allowedPermissions.includes(`${category}:Update`)
            ? !selectAll
            : prevData.permissions[category].update,
        };
      });
      return { ...prevData, permissions: updatedPermissions };
    });
  };

  const handleEditSelectAll = () => {
    const newSelectAll = !editSelectAll;
    setEditSelectAll(newSelectAll);

    setEditFormData((prevData) => {
      const updatedPermissions = {};
      Object.keys(prevData.permissions).forEach((category) => {
        updatedPermissions[category] = {
          list: allowedPermissions.includes(`${category}:List`)
            ? newSelectAll
            : prevData.permissions[category].list,
          detail: allowedPermissions.includes(`${category}:Detail`)
            ? newSelectAll
            : prevData.permissions[category].detail,
          control: allowedPermissions.includes(`${category}:Control`)
            ? newSelectAll
            : prevData.permissions[category].control,
          update: allowedPermissions.includes(`${category}:Update`)
            ? newSelectAll
            : prevData.permissions[category].update,
        };
      });

      const roles = [];
      if (newSelectAll) {
        Object.keys(updatedPermissions).forEach((category) => {
          Object.keys(updatedPermissions[category]).forEach((permission) => {
            if (updatedPermissions[category][permission]) {
              roles.push(
                `${category}:${permission.charAt(0).toUpperCase() + permission.slice(1)
                }`
              );
            }
          });
        });
      }

      return { ...prevData, permissions: updatedPermissions, role: roles };
    });
  };

  const handleSubmit = async () => {
    try {
      const roles = [];
      Object.keys(formData.permissions).forEach((category) => {
        Object.keys(formData.permissions[category]).forEach((action) => {
          if (formData.permissions[category][action]) {
            roles.push(
              `${category}:${action.charAt(0).toUpperCase() + action.slice(1)}`
            );
          }
        });
      });

      const response = await axios.post(`${serverUrl.sub}/v3/key/create`, {
        name: formData.keyName,
        purpose: formData.purpose,
        userId: user._id,
        role: roles,
        validTill: formData.expiryDate,
      });

      const newKey = response.data.data;
      setKeys((prevKeys) => [...prevKeys, newKey]);
      setShowModal(false);
      setApiRes(newKey);
      setShowKeyDetails(true);
      setDisabled(false);
      getApiKeys();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while generating the key.");
    }
  };
  const [disabled, setDisabled] = useState(false);

  const handleStatusToggle = async (index) => {
    try {
      const key = keys[index];
      const updatedStatus = !key.active;

      const response = await axios.post(
        `${serverUrl.sub}/v3/key/updateKeyStatus`,
        {
          id: key._id,
          active: updatedStatus,
        }
      );

      setKeys((prevKeys) => {
        const newKeys = [...prevKeys];
        newKeys[index].active = updatedStatus;
        return newKeys;
      });
    } catch (error) {
      toast.error("An error occurred while toggling the key status.");
    }
  };

  const handleEdit = async (index) => {
    try {
      const key = keys[index];
      const roles = [];
      Object.keys(editFormData.permissions).forEach((category) => {
        Object.keys(editFormData.permissions[category]).forEach((action) => {
          if (editFormData.permissions[category][action]) {
            roles.push(
              `${category}:${action.charAt(0).toUpperCase() + action.slice(1)}`
            );
          }
        });
      });

      const updateData = {
        id: key._id,
        role: roles,
        name: key.name,
        purpose: key.purpose,
        validTill: key.validTill,
        permissions: editFormData.permissions,
      };

      const response = await axios.post(
        `${serverUrl.sub}/v3/key/update`,
        updateData
      );

      const updatedKey = response.data.data;
      setKeys((prevKeys) =>
        prevKeys.map((key) => (key._id === updatedKey._id ? updatedKey : key))
      );
    } catch (error) {
      console.error("Error editing key:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      toast.error("An error occurred while editing the key.");
    }
  };

  const [apiRes, setApiRes] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (index) => {
    const key = keys[index];

    const permissions = key.permissions || {
      House: { list: false, detail: false },
      Appliance: { list: false, control: false, update: false },
    };

    const roles = key.role || [];
    roles.forEach((role) => {
      const [category, action] = role.split(":");
      if (permissions[category]) {
        permissions[category][action.toLowerCase()] = true;
      }
    });

    setEditFormData({
      id: key._id,
      keyName: key.name,
      purpose: key.purpose,
      expiryDate: key.validTill.split("T")[0],
      permissions: permissions,
      role: roles,
    });

    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const roles = [];
      Object.keys(editFormData.permissions).forEach((category) => {
        Object.keys(editFormData.permissions[category]).forEach((action) => {
          if (editFormData.permissions[category][action]) {
            roles.push(
              `${category}:${action.charAt(0).toUpperCase() + action.slice(1)}`
            );
          }
        });
      });

      const updateData = {
        id: editFormData.id,
        name: editFormData.keyName,
        purpose: editFormData.purpose,
        validTill: editFormData.expiryDate,
        role: roles,
      };

      const response = await axios.post(
        `${serverUrl.sub}/v3/key/update`,
        updateData
      );

      const updatedKey = response.data.data;
      setKeys((prevKeys) =>
        prevKeys.map((key) => (key._id === updatedKey._id ? updatedKey : key))
      );
      setShowEditModal(false);
      getApiKeys();
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      toast.error("An error occurred while updating the key.");
    }
  };
  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll">
      {/* <Filter keyData={selectedKey} setSelectedKey={setSelectedKey} date={date} setDate={setDate} /> */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Generate New Key
      </button>
      {loading && (
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      )}
      <KeyModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleToggleChange={handleToggleChange}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
        handleSubmit={handleSubmit}
      />
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-xl font-semibold mb-4">Edit Key</h2>
            <KeyGenerateForm
              formData={editFormData}
              handleInputChange={handleEditInputChange}
              handleToggleChange={handleEditToggleChange}
              handleSelectAll={handleEditSelectAll}
              selectAll={editSelectAll}
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleEditSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <KeyList
        keys={keys}
        handleStatusToggle={handleStatusToggle}
        handleEdit={handleEditClick}
      />
      {showKeyDetails && (
        <KeyPasswordCopyMModel
          data={apiRes}
          onClose={() => {
            setShowKeyDetails(false);
            getApiKeys();
          }}
        />
      )}
    </div>
  );
}
