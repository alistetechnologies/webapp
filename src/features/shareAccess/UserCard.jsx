import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Correct imports for your custom popover
import { ConfirmationDialog } from "@/components/ui/common/ConfirmationDialog";
import AddUser from "./AddUser";
import { removeUserFromHouse } from "./api/shareAccessApi";
import { useAuth } from "../auth/api/authStore";
import moment from "moment";

export const UserCard = ({
  user,
  owner = false,
  refetch,
  houseUsers,
  timed = false,
  createdBy,
  masters,
}) => {
  const authUser = useAuth((state) => state.auth);

  if (!user) return;
  const { email } = user;

  const { houseId } = houseUsers;
  const userName = user.name
    ? user.name
    : `${user.first_name} ${user.last_name}`;

  let show =
    (!owner && createdBy.includes(authUser.number)) ||
    (!owner &&
      masters.includes(`+91${authUser.number.replace("+91", "")}`) &&
      !email.includes(authUser.number));

  return (
    <div className="px-4 flex items-center justify-between bg-white shadow-md rounded-lg hover:shadow-lg transition duration-200 ease-in-out">
      <div className="p-5">
        <p className="font-semibold text-lg">{userName}</p>
        <p className="text-sm text-gray-500">
          {email}{" "}
          {timed &&
            `- access till ${moment(user?.validtill).format("DD-MMM-YYYY")}`}
        </p>
      </div>

      <div className="flex items-center">
        {show && (
          <>
            <AddUser
              buttonText="Update User"
              buttonVariant="primary"
              edit={email}
              houseUsers={houseUsers}
              refetch={refetch}
            />
            <ConfirmationDialog
              message={
                "Are you sure you want to remove the user? This action can not be reversed."
              }
              buttonText={"Remove"}
              onConfirm={() => {
                removeUserFromHouse(houseId, user.email);
                refetch();
              }}
              buttonStyle="bg-red-600"
              buttonVariant="destructive"
            />
          </>
        )}
      </div>
    </div>
  );
};
