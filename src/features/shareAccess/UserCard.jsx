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

export const UserCard = ({ user, owner, refetch, houseUsers }) => {
  const { name, email } = user;
  const { houseId } = houseUsers;
  const userName = user.name
    ? user.name
    : `${user.first_name} ${user.last_name}`;

  return (
    <div className="px-4 flex items-center justify-between bg-white shadow-md rounded-lg hover:shadow-lg transition duration-200 ease-in-out">
      <div>
        <p className="font-semibold text-lg">{userName}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <div className="flex items-center">
        <AddUser
          buttonText="Update User"
          buttonVariant="primary"
          edit={email}
          houseUsers={houseUsers}
          refetch={refetch}
        />

        {!owner && (
          <>
            <ConfirmationDialog
              message={
                "Are you sure you want to leave house? This action can not be reversed."
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
