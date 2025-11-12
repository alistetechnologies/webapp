import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useUser } from "../auth/api/userStore";
import EditProperty from "./EditHouse";
import { isOctiot } from "@/utils/browser";
import { octiotFont } from "@/constants/config";

function HouseRow({ house, index, refreshUserHouses }) {
  const navigate = useNavigate();
  const user = useUser.getState().user;

  return (
    <TableRow className="text-lg">
      <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{index + 1}</TableCell>
      <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{house?.label}</TableCell>
      <TableCell>
        <div className="flex gap-4">
          <EditProperty house={house} refreshUserHouses={refreshUserHouses} />
          <Button
            onClick={() => {
              useUser
                .getState()
                .updateUser({ ...user, selectedHouse: house?.value });
              navigate(`/app/house`);
            }}
          >
            View Details
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default HouseRow;
