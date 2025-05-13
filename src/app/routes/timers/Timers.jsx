import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useUser } from "@/features/auth/api/userStore";

import { fetchHouse } from "@/features/dashboard/api/house";
import Filter from "@/features/dashboard/filter";
import useHouseStore from "@/features/dashboard/houseStore";

import { AutoTimers } from "@/features/timers/AutoTimers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Timers() {
  const user = useUser.getState().user;
  const [selectedHouse, setSelectedHouse] = useState({
    value: user?.selectedHouse || "",
  });
  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

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

  useEffect(() => {
    getUserHouse();
  }, [selectedHouse?.value]);

  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 pt-0 overflow-y-scroll">
      <Filter
        house={selectedHouse}
        setSelectedHouse={setSelectedHouse}
        date={date}
        setDate={setDate}
        dateShow={false}
        onClick={() => getUserHouse()}
      />

      {loading && (
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      )}

      {!loading && <AutoTimers />}
    </div>
  );
}
