import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/features/auth/api/userStore";

import { fetchHouse } from "@/features/dashboard/api/house";
import Filter from "@/features/dashboard/filter";
import useHouseStore from "@/features/dashboard/houseStore";
import { fetchAllSchedulesForHouse } from "@/features/schedules/api/schedules";
import Schedule from "@/features/schedules/schedule";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Schedules() {
  const user = useUser.getState().user;
  const [selectedHouse, setSelectedHouse] = useState({
    value: user?.selectedHouse || "",
  });
  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getUserHouse = async () => {
      setLoading(true);
      const houseDetails = await fetchHouse(selectedHouse?.value);

      if (!houseDetails.success) {
        toast.error("Failed to fetch House!!");
        setLoading(false);
        return;
      }

      setHouse(houseDetails?.data);
      setLoading(false);
      useHouseStore.getState().updateHouse(houseDetails?.data);
    };

    getUserHouse();
  }, [selectedHouse?.value]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllSchedulesForHouse(selectedHouse?.value);
      if (!response.success) {
        toast.error(response.message);
      }
    }

    fetchData();
  }, [selectedHouse?.value]);

  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll">
      <Filter
        house={selectedHouse}
        setSelectedHouse={setSelectedHouse}
        date={date}
        setDate={setDate}
      />

      {loading && (
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      )}

      {!loading && <Schedule />}
    </div>
  );
}
