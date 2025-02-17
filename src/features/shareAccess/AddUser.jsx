import React, { useEffect, useState } from "react";
import { FaPlus, FaUserEdit } from "react-icons/fa";
import Select from "react-select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { accessRoles } from "@/config";
import useHouseStore from "../dashboard/houseStore";
import toast from "react-hot-toast";
import {
  changeRoomAccess,
  checkUserExists,
  updateUserHouseAccess,
} from "./api/shareAccessApi";
import { useAuth } from "../auth/api/authStore";
import moment from "moment";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/ui/spinner";

const AddUser = ({
  edit,
  refetch,
  houseUsers,
  buttonVariant = "primary",
  buttonText = "Add User",
}) => {
  const { createdBy, users, masters, rest, roomAccess, timed, houseId } =
    houseUsers;
  const house = useHouseStore((state) => state.house);
  const authUser = useAuth((state) => state.auth);

  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(house).length > 0) {
      const rooms = house.rooms.map((room) => ({
        label: room.roomName,
        value: room._id,
      }));
      setRooms(rooms);
    }
  }, [house]);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedRole, setSelectedRole] = useState({
    label: "Guest",
    value: 3,
  });

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [validTill, setValidTill] = useState(
    moment(new Date().getTime() + 24 * 60 * 60 * 1000).format("YYYY-MM-DD")
  );
  const [loading, setLoading] = useState(false);

  const isOwner = createdBy === authUser.number;

  useEffect(() => {
    if (edit) {
      let userRole = 0;
      if (edit === createdBy) {
        userRole = 0;
      } else if (masters.includes(edit)) {
        userRole = 1;
      } else if (rest.includes(edit)) {
        userRole = 2;
      } else {
        userRole = 3;
      }
      console.log(edit, "edit");
      setPhoneNumber(edit);
      const userRoomAccess = roomAccess[edit];
      console.log("userRoomAccess", userRoomAccess, rooms);

      setSelectedRooms(
        rooms.filter((room) => !userRoomAccess?.some((r) => r === room.value))
      );

      console.log(
        rooms.filter((room) => userRoomAccess?.some((r) => r === room.value)),
        "room123"
      );

      setSelectedRole(accessRoles.find((role) => role.value === userRole));
      if (userRole === 3) {
        const timedUser = timed.find((user) => user.email === edit);
        setValidTill(
          moment(new Date(timedUser.validtill)).format("YYYY-MM-DD")
        );
      }
    }
  }, [rooms, edit]);

  useEffect(() => {
    if (edit) {
      return;
      const userId = user.email;
      let userRole = 3;
      let validTill = new Date();
      if (createdBy === userId) {
        role = 0;
      } else if (masters.includes(userId)) {
        role = 1;
      } else if (rest.includes(userId)) {
        role = 2;
      } else {
        let userIndex = timed.findIndex((tuser) => tuser.email === userId);
        if (userIndex !== -1) {
          validTill = new Date(timed[userIndex].validTill);
        }
      }
    }
  }, [edit]);

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSelectRoles = (selectedOption) => {
    setSelectedRole(selectedOption);
  };

  const handleSelectRooms = (selected) => {
    if (selected && selected.some((option) => option.value === "select_all")) {
      // Select All functionality
      setSelectedRooms(
        house.rooms.map((room) => ({ label: room.roomName, value: room._id }))
      );
    } else {
      setSelectedRooms(selected);
    }
  };

  const handleDateChange = (e) => {
    setValidTill(e.target.value);
  };

  console.log("EMAIL- ", edit);
  const handleAdd = async () => {
    if (phoneNumber.length === 0) {
      toast.error("Invalid user details!");
      return;
    }
    let isMaster = false;
    let owner = false;
    let timed = false;

    switch (selectedRole.value) {
      case 0:
        isMaster = true;
        owner = true;
        break;
      case 1:
        isMaster = true;
        break;
      case 2:
        break;
      case 3:
        timed = true;
    }
    if (owner === true && isOwner === false) {
      toast.error("Only owner can change owner");
      return;
    }
    if (selectedRooms.length === 0) {
      toast.error("Please select room!!");
      return;
    }
    const validtill = new Date(validTill).toISOString();

    const roomIds = rooms
      .filter(
        (room) =>
          !selectedRooms.some(
            (selectedRoom) => selectedRoom.value === room.value
          )
      )
      .map((room) => room.value);

    const payload = {
      houseId,
      email: `+91${phoneNumber}`,
      isMaster,
      timed,
      validtill,
      owner,
      roomIds,
    };
    setLoading(true);

    const userExists = await checkUserExists(phoneNumber, authUser.number);

    if (userExists.success && userExists.exists) {
      //
    } else {
      toast.error("User does not exists!!");
      setLoading(false);
      return;
    }

    const response = await updateUserHouseAccess(
      `+91${authUser.number}`,
      payload
    );

    setLoading(false);
    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    refetch();
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (phoneNumber.length === 0) {
      toast.error("Invalid user details!");
      return;
    }
    let isMaster = false;
    let owner = false;
    let timed = false;

    switch (selectedRole.value) {
      case 0:
        isMaster = true;
        owner = true;
        break;
      case 1:
        isMaster = true;
        break;
      case 2:
        break;
      case 3:
        timed = true;
    }
    if (owner === true && isOwner === false) {
      toast.error("Only owner can change owner");
      return;
    }
    if (selectedRooms.length === 0) {
      toast.error("Please select room!!");
      return;
    }
    const validtill = new Date(validTill).toISOString();

    const roomIds = rooms
      .filter(
        (room) =>
          !selectedRooms.some(
            (selectedRoom) => selectedRoom.value === room.value
          )
      )
      .map((room) => room.value);

    // const payload = {
    //   houseId,
    //   email: `+91${phoneNumber}`,
    //   isMaster,
    //   timed,
    //   validtill,
    //   owner,
    //   roomIds,
    // };
    setLoading(true);

    const userExists = await checkUserExists(phoneNumber, authUser.number);

    if (userExists.success && userExists.exists) {
      //
    } else {
      toast.error("User does not exists!!");
      setLoading(false);
      return;
    }

    const response = await changeRoomAccess(
      houseId,
      phoneNumber,
      `+91${authUser.number.replace("+91")}`,
      roomIds,
      selectedRole.value,
      validTill
    );

    setLoading(false);
    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    refetch();
    setOpen(false);
  };
  return (
    <div className="p-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={buttonVariant}>
            {edit ? (
              <>
                <FaUserEdit className="mr-2" /> {buttonText}
              </>
            ) : (
              <>
                <FaPlus className="mr-2" /> {buttonText}
              </>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="p-6 bg-white rounded-lg shadow-lg space-y-4 max-w-lg w-full py-10">
          <DialogHeader>
            <DialogTitle>
              <p className="text-2xl">
                {edit ? "Edit User Access" : "Add User"}
              </p>
            </DialogTitle>
          </DialogHeader>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number / Email
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <Select
              options={accessRoles}
              value={selectedRole}
              onChange={handleSelectRoles}
              className="mt-1"
            />
          </div>

          {selectedRole.value !== 0 && (
            <>
              {selectedRole.value === 3 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={validTill}
                    onChange={handleDateChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Rooms
                </label>
                <Select
                  options={[
                    { label: "Select All", value: "select_all" },
                    ...rooms,
                  ]}
                  isMulti
                  value={selectedRooms}
                  onChange={handleSelectRooms}
                  className="mt-1"
                />
              </div>
            </>
          )}

          {/* Modal Actions */}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => (edit ? handleUpdate() : handleAdd())}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? <Spinner /> : edit ? "Update" : "Add"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUser;
