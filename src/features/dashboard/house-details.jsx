import React, { useEffect, useState } from "react";
import { useUser } from "../auth/api/userStore";
import { fetchConnectedDevices, fetchHouse } from "./api/house";
import Filter from "./filter";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { MainHeader } from "./MainHeader";
import Rooms from "./Rooms";
import NoRooms from "./no-rooms";
import useHouseStore from "./houseStore";
import moment from "moment";

export function HouseDetails() {
  const user = useUser((state) => state.user);
  const [selectedHouse, setSelectedHouse] = useState({
    value: user?.selectedHouse || "",
  });

  const house = useHouseStore((state) => state.house);
  // const updateHouse = useHouseStore(state => state.updateHouse);
  // const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [connectedDevices, setConnectedDevices] = useState([]);

  const getUserHouse = async () => {
    setLoading(true);
    const houseDetails = await fetchHouse(selectedHouse?.value);

    if (!houseDetails.success) {
      toast.error("Failed to fetch House!!");
      setLoading(false);
      return;
    }

    // setHouse(houseDetails?.data);
    setLoading(false);
    useHouseStore.getState().updateHouse(houseDetails?.data);
  };
  useEffect(() => {
    getUserHouse();
  }, [selectedHouse?.value, user]);

  // Connected Devices
  useEffect(() => {
    const getConnectedDevices = async () => {
      if (!selectedHouse?.value) {
        toast.error("No Selected House!!");
      }

      const connectedDevicesResponse = await fetchConnectedDevices({
        houseId: selectedHouse?.value,
      });

      if (!connectedDevicesResponse.success) {
        toast.error("Failed to fetch Connected devices!!");
        return;
      }

      setConnectedDevices(connectedDevicesResponse?.data?.devices);
    };

    getConnectedDevices();
  }, [selectedHouse?.value, house]);
  console.debug(house, "house");
  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 pt-0 overflow-y-scroll">
      <Filter
        house={selectedHouse}
        setSelectedHouse={setSelectedHouse}
        date={date}
        setDate={setDate}
        onClick={() => getUserHouse()}
        backBtn
        backLink="/app"
      />

      {/* <h2>{rerender}</h2> */}

      {loading && (
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      )}
      {!loading && (
        <div className="h-[81%] overflow-x-scroll">
          <Table className="w-full bg-white ">
            <TableHeader className="sticky top-0 bg-white">
              <MainHeader />
            </TableHeader>
            <TableBody>
              {house?.rooms ? (
                <Rooms
                  roomsData={house?.rooms}
                  reload={house?.update || false}
                  connectedDevices={connectedDevices}
                  date={date}
                  setDate={setDate}
                  houseId={house._id}
                />
              ) : (
                <NoRooms />
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
